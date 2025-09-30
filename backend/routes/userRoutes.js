import express from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";
import pool from "../database.js";
import { verifyToken, requireSuperAdmin, requireSelfOrSuperAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET todos los usuarios
router.get("/", verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET usuario por ID
router.get("/:id", verifyToken, requireSelfOrSuperAdmin("id"), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// POST crear nuevo usuario
const userSchema = Joi.object({
  nombre: Joi.string().allow(null, ""),
  apellido: Joi.string().allow(null, ""),
  dni: Joi.string().allow(null, ""),
  matricula: Joi.string().allow(null, ""),
  handicap: Joi.number().integer().allow(null),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  role: Joi.string().valid("cliente", "admin", "superadmin").default("cliente"),
});

router.post("/", verifyToken, requireSuperAdmin, async (req, res) => {
  const { value, error } = userSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
  });
  if (error) {
    return res.status(422).json({
      error: "Validación fallida",
      details: error.details.map((d) => d.message),
    });
  }

  const {
    nombre,
    apellido,
    dni,
    matricula,
    handicap,
    email,
    password,
    role,
  } = value;

  try {
    // Verificar si el email ya existe
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const passwordToStore = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users
        (nombre, apellido, dni, matricula, handicap, email, password, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, nombre, apellido, email, role, handicap`,
      [
        nombre,
        apellido,
        dni,
        matricula,
        handicap,
        email,
        passwordToStore,
        role || "cliente"
      ]
    );
    // Espejo en tabla 'usuarios' para login consistente
    await pool.query(
      `INSERT INTO usuarios (email, password, role, nombre)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET
         password = COALESCE(EXCLUDED.password, usuarios.password),
         role = COALESCE(EXCLUDED.role, usuarios.role),
         nombre = COALESCE(EXCLUDED.nombre, usuarios.nombre)`,
      [email, passwordToStore, role || "cliente", nombre || ""]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// PUT actualizar usuario
const updateUserSchema = Joi.object({
  nombre: Joi.string().allow(null, ""),
  apellido: Joi.string().allow(null, ""),
  dni: Joi.string().allow(null, ""),
  matricula: Joi.string().allow(null, ""),
  handicap: Joi.number().integer().allow(null),
  email: Joi.string().email(),
  password: Joi.string().min(5).allow(null, ""),
  role: Joi.string().valid("cliente", "admin", "superadmin"),
});

router.put("/:id", verifyToken, requireSelfOrSuperAdmin("id"), async (req, res) => {
  const { id } = req.params;
  const { value, error } = updateUserSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
  });
  if (error) {
    return res.status(422).json({
      error: "Validación fallida",
      details: error.details.map((d) => d.message),
    });
  }

  const {
    nombre,
    apellido,
    dni,
    matricula,
    handicap,
    email,
    password,
    role,
  } = value;

  try {
    // Verificar que el usuario existe
    const existingUser = await pool.query("SELECT id, email FROM users WHERE id = $1", [id]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const oldEmail = existingUser.rows[0].email;

    // Si se proporciona password, hashearlo
    const passwordToStore = password ? await bcrypt.hash(password, 10) : undefined;

    // Construir query dinámicamente
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (nombre !== undefined) {
      fields.push(`nombre = $${paramCount++}`);
      values.push(nombre);
    }
    if (apellido !== undefined) {
      fields.push(`apellido = $${paramCount++}`);
      values.push(apellido);
    }
    if (dni !== undefined) {
      fields.push(`dni = $${paramCount++}`);
      values.push(dni);
    }
    if (matricula !== undefined) {
      fields.push(`matricula = $${paramCount++}`);
      values.push(matricula);
    }
    if (handicap !== undefined) {
      fields.push(`handicap = $${paramCount++}`);
      values.push(handicap);
    }
    if (email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(email);
    }
    if (passwordToStore !== undefined) {
      fields.push(`password = $${paramCount++}`);
      values.push(passwordToStore);
    }
    if (role !== undefined) {
      fields.push(`role = $${paramCount++}`);
      values.push(role);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }

    values.push(id);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING id, nombre, apellido, email, role, handicap`;
    
    const result = await pool.query(query, values);
    const updated = result.rows[0];

    // Espejo en 'usuarios'
    await pool.query(
      `INSERT INTO usuarios (email, password, role, nombre)
       VALUES ($1::varchar, COALESCE($2, (SELECT password FROM usuarios WHERE email=$1::varchar) ), $3, $4)
       ON CONFLICT (email) DO UPDATE SET
         password = COALESCE($2, usuarios.password),
         role = COALESCE(EXCLUDED.role, usuarios.role),
         nombre = COALESCE(EXCLUDED.nombre, usuarios.nombre)`,
      [updated.email || oldEmail, passwordToStore || null, updated.role, updated.nombre]
    );
    if (updated.email && updated.email !== oldEmail) {
      await pool.query("DELETE FROM usuarios WHERE email = $1", [oldEmail]);
    }

    res.json(updated);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// DELETE usuario
router.delete("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;