// routes/paquetesRoutes.js
import express from "express";
import pool from "../database.js";

const router = express.Router();

// Crear nuevo paquete
router.post("/", async (req, res) => {
  const { nombre, destino, precio, descripcion, fecha_inicio, fecha_fin } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO paquetes (nombre, destino, precio, descripcion, fecha_inicio, fecha_fin)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, destino, precio, descripcion, fecha_inicio, fecha_fin]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear paquete:", err);
    res.status(500).json({ error: "Error al crear paquete" });
  }
});

// Cache simple en memoria (TTL 60s)
let cacheAll = { data: null, ts: 0 };
const TTL = 60 * 1000;

// Obtener todos los paquetes
router.get("/", async (req, res) => {
  try {
    const now = Date.now();
    if (cacheAll.data && now - cacheAll.ts < TTL) {
      return res.json(cacheAll.data);
    }
    const result = await pool.query("SELECT * FROM paquetes");
    cacheAll = { data: result.rows, ts: now };
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener paquetes:", err);
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
});

// Obtener un paquete por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM paquetes WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Paquete no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener paquete:", err);
    res.status(500).json({ error: "Error al obtener paquete" });
  }
});

// Editar paquete
router.put("/:id", async (req, res) => {
  const { nombre, destino, precio, descripcion, fecha_inicio, fecha_fin } = req.body;
  try {
    const result = await pool.query(
      `UPDATE paquetes SET nombre = $1, destino = $2, precio = $3, descripcion = $4,
       fecha_inicio = $5, fecha_fin = $6 WHERE id = $7 RETURNING *`,
      [nombre, destino, precio, descripcion, fecha_inicio, fecha_fin, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar paquete:", err);
    res.status(500).json({ error: "Error al actualizar paquete" });
  }
});

// Eliminar paquete
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM paquetes WHERE id = $1", [req.params.id]);
    res.json({ message: "Paquete eliminado" });
  } catch (err) {
    console.error("Error al eliminar paquete:", err);
    res.status(500).json({ error: "Error al eliminar paquete" });
  }
});

export default router;
