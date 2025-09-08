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
  password: Joi.string().min(6).allow(null, ""),
  cliente_id: Joi.number().integer().allow(null),
  role: Joi.string().valid("cliente", "superadmin").required(),
  paquete_id: Joi.number().integer().allow(null),
});

router.post("/", verifyToken, requireSuperAdmin, async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const {
    nombre,
    apellido,
    dni,
    matricula,
    handicap,
    email,
    password,
    cliente_id,
    role,
    paquete_id
  } = req.body;

  try {
    const passwordToStore = password ? await bcrypt.hash(password, 10) : null;
    const result = await pool.query(
      `INSERT INTO users
        (nombre, apellido, dni, matricula, handicap, email, password, cliente_id, role, paquete_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        nombre,
        apellido,
        dni,
        matricula,
        handicap,
        email,
        passwordToStore,
        cliente_id,
        role,
        paquete_id
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Endpoint temporal para bootstrap de superadmin cuando no existe ninguno.
// Se auto-desactiva si ya hay al menos un superadmin.
router.post("/bootstrap-superadmin", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email y password requeridos" });
    const existing = await pool.query("SELECT 1 FROM users WHERE role='superadmin' LIMIT 1");
    if (existing.rows.length > 0) return res.status(403).json({ error: "Ya existe un superadmin" });
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role)
       VALUES ('Admin','GP','99999995','BOOT01',0,$1,$2,'superadmin') RETURNING *`,
      [email, hashed]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    console.error("bootstrap-superadmin error:", e);
    res.status(500).json({ error: e?.message || "Error al crear superadmin" });
  }
});

// PUT actualizar usuario
router.put("/:id", verifyToken, requireSelfOrSuperAdmin("id"), async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const { id } = req.params;
  const {
    nombre,
    apellido,
    dni,
    matricula,
    handicap,
    email,
    password,
    cliente_id,
    role,
    paquete_id
  } = req.body;

  try {
    const passwordToStore = password ? await bcrypt.hash(password, 10) : null;
    const result = await pool.query(
      `UPDATE users SET
        nombre = $1,
        apellido = $2,
        dni = $3,
        matricula = $4,
        handicap = $5,
        email = $6,
        password = COALESCE($7, password),
        cliente_id = $8,
        role = $9,
        paquete_id = $10
       WHERE id = $11
       RETURNING *`,
      [
        nombre,
        apellido,
        dni,
        matricula,
        handicap,
        email,
        passwordToStore,
        cliente_id,
        role,
        paquete_id,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// DELETE eliminar usuario
router.delete("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
