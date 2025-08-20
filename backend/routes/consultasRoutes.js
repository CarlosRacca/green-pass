// backend/routes/consultasRoutes.js
import express from "express";
import pool from "../database.js";

const router = express.Router();

// Obtener todas las consultas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM consultas ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener consultas:", err);
    res.status(500).json({ error: "Error al obtener consultas" });
  }
});

// Obtener una consulta por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM consultas WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Consulta no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener consulta:", err);
    res.status(500).json({ error: "Error al obtener consulta" });
  }
});

// Crear una nueva consulta
router.post("/", async (req, res) => {
  const { paquete, cantidad, ultima_consulta } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO consultas (paquete, cantidad, ultima_consulta) VALUES ($1, $2, $3) RETURNING *",
      [paquete, cantidad, ultima_consulta]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear consulta:", err);
    res.status(500).json({ error: "Error al crear consulta" });
  }
});

// Actualizar una consulta
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { paquete, cantidad, ultima_consulta } = req.body;
  try {
    const result = await pool.query(
      "UPDATE consultas SET paquete = $1, cantidad = $2, ultima_consulta = $3 WHERE id = $4 RETURNING *",
      [paquete, cantidad, ultima_consulta, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Consulta no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar consulta:", err);
    res.status(500).json({ error: "Error al actualizar consulta" });
  }
});

// Eliminar una consulta
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM consultas WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Consulta no encontrada" });
    }
    res.json({ message: "Consulta eliminada" });
  } catch (err) {
    console.error("Error al eliminar consulta:", err);
    res.status(500).json({ error: "Error al eliminar consulta" });
  }
});

export default router;
