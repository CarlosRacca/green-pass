// routes/paquetesRoutes.js
import express from "express";
import pool from "../database.js";

const router = express.Router();

// Crear nuevo paquete
router.post("/", async (req, res) => {
  const { nombre, destino, precio, descripcion, puntos, duracion, imagen_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO paquetes (nombre, destino, precio, descripcion, puntos, duracion, imagen_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, destino, precio, descripcion || null, puntos || 0, duracion || null, imagen_url || null]
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
      res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return res.json(cacheAll.data);
    }
    const result = await pool.query("SELECT * FROM paquetes");
    cacheAll = { data: result.rows, ts: now };
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener paquetes:", err);
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
});

// Paquetes asignados a un cliente
router.get("/cliente/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT p.* FROM usuarios_paquetes up
       JOIN paquetes p ON up.paquete_id = p.id
       WHERE up.user_id = $1
       ORDER BY p.id ASC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener paquetes del cliente:", err);
    res.status(500).json({ error: "Error al obtener paquetes del cliente" });
  }
});

// Obtener un paquete por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM paquetes WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Paquete no encontrado" });
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener paquete:", err);
    res.status(500).json({ error: "Error al obtener paquete" });
  }
});

// Editar paquete
router.put("/:id", async (req, res) => {
  const { nombre, destino, precio, descripcion, puntos, duracion, imagen_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE paquetes SET nombre = $1, destino = $2, precio = $3, descripcion = $4,
       puntos = $5, duracion = $6, imagen_url = $7 WHERE id = $8 RETURNING *`,
      [nombre, destino, precio, descripcion || null, puntos || 0, duracion || null, imagen_url || null, req.params.id]
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
