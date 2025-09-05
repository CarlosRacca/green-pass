import express from "express";
import pool from "../database.js";
import { verifyToken, requireSuperAdmin, requireSelfOrSuperAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Crear un nuevo viaje
router.post("/", verifyToken, requireSuperAdmin, async (req, res) => {
  const { cliente_id, paquete_id, fecha_reserva, estado, puntos_otorgados } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO viajes (cliente_id, paquete_id, fecha_reserva, estado, puntos_otorgados)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cliente_id, paquete_id, fecha_reserva, estado, puntos_otorgados]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear el viaje:", err);
    res.status(500).json({ error: "Error al crear el viaje" });
  }
});

// ✅ Obtener todos los viajes
router.get("/", verifyToken, requireSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, u.nombre AS cliente_nombre, u.apellido AS cliente_apellido, p.nombre AS paquete_nombre
      FROM viajes v
      JOIN users u ON v.cliente_id = u.id
      JOIN paquetes p ON v.paquete_id = p.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener los viajes:", err);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
});

// ✅ Obtener viajes por cliente
router.get("/cliente/:clienteId", verifyToken, requireSelfOrSuperAdmin("clienteId"), async (req, res) => {
  const { clienteId } = req.params;
  try {
    const result = await pool.query(
      `SELECT v.*, p.nombre AS paquete_nombre
       FROM viajes v
       JOIN paquetes p ON v.paquete_id = p.id
       WHERE v.cliente_id = $1
       ORDER BY v.fecha_reserva DESC`,
      [clienteId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener viajes del cliente:", err);
    res.status(500).json({ error: "Error al obtener viajes del cliente" });
  }
});

// ✅ Obtener un viaje por ID
router.get("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT v.*, u.nombre AS cliente_nombre, u.apellido AS cliente_apellido, p.nombre AS paquete_nombre
      FROM viajes v
      JOIN users u ON v.cliente_id = u.id
      JOIN paquetes p ON v.paquete_id = p.id
      WHERE v.id = $1
    `, [id]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener el viaje:", err);
    res.status(500).json({ error: "Error al obtener el viaje" });
  }
});

// ✅ Actualizar un viaje
router.put("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { cliente_id, paquete_id, fecha_reserva, estado, puntos_otorgados } = req.body;
  try {
    const result = await pool.query(
      `UPDATE viajes SET cliente_id = $1, paquete_id = $2, fecha_reserva = $3, estado = $4, puntos_otorgados = $5
       WHERE id = $6 RETURNING *`,
      [cliente_id, paquete_id, fecha_reserva, estado, puntos_otorgados, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar el viaje:", err);
    res.status(500).json({ error: "Error al actualizar el viaje" });
  }
});

// ✅ Eliminar un viaje
router.delete("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM viajes WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json({ message: "Viaje eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar el viaje:", err);
    res.status(500).json({ error: "Error al eliminar el viaje" });
  }
});

export default router;
