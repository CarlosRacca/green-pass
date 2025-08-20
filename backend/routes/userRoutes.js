import express from "express";
import pool from "../database.js";

const router = express.Router();

// GET todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET usuario por ID
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
        password,
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

// PUT actualizar usuario
router.put("/:id", async (req, res) => {
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
    const result = await pool.query(
      `UPDATE users SET
        nombre = $1,
        apellido = $2,
        dni = $3,
        matricula = $4,
        handicap = $5,
        email = $6,
        password = $7,
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
        password,
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
router.delete("/:id", async (req, res) => {
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
