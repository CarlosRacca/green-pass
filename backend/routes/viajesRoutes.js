import express from "express";
import Joi from "joi";
import pool from "../database.js";
import { verifyToken, requireSuperAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET todos los viajes
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, u.nombre as usuario_nombre, p.nombre as paquete_nombre 
      FROM viajes v
      LEFT JOIN users u ON v.user_id = u.id
      LEFT JOIN paquetes p ON v.paquete_id = p.id
      ORDER BY v.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener viajes:", err);
    res.status(500).json({ error: "Error al obtener viajes" });
  }
});

// GET viajes por cliente
router.get("/cliente/:user_id", verifyToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT v.*, u.nombre as usuario_nombre, p.nombre as paquete_nombre 
       FROM viajes v
       LEFT JOIN users u ON v.user_id = u.id
       LEFT JOIN paquetes p ON v.paquete_id = p.id
       WHERE v.user_id = $1
       ORDER BY v.fecha_reserva DESC, v.created_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener viajes del cliente:", err);
    res.status(500).json({ error: "Error al obtener viajes del cliente" });
  }
});

// GET viaje por ID
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT v.*, u.nombre as usuario_nombre, p.nombre as paquete_nombre 
      FROM viajes v
      LEFT JOIN users u ON v.user_id = u.id
      LEFT JOIN paquetes p ON v.paquete_id = p.id
      WHERE v.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener viaje:", err);
    res.status(500).json({ error: "Error al obtener viaje" });
  }
});

// POST crear nuevo viaje
const viajeSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  paquete_id: Joi.number().integer().required(),
  fecha_reserva: Joi.date().required(),
  estado: Joi.string().valid('pendiente','confirmado','cancelado').default('pendiente'),
  puntos_otorgados: Joi.number().integer().default(0),
});

router.post("/", verifyToken, requireSuperAdmin, async (req, res) => {
  const { error } = viajeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  
  const { user_id, paquete_id, fecha_reserva, estado, puntos_otorgados } = req.body;
  
  try {
    // Verificar que el usuario y paquete existen
    const userExists = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
    if (userExists.rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const paqueteExists = await pool.query("SELECT id FROM paquetes WHERE id = $1", [paquete_id]);
    if (paqueteExists.rows.length === 0) {
      return res.status(400).json({ error: "Paquete no encontrado" });
    }

    const result = await pool.query(
      `INSERT INTO viajes (user_id, paquete_id, fecha_reserva, estado, puntos_otorgados)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, paquete_id, fecha_reserva, estado || 'pendiente', puntos_otorgados || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear el viaje:", err);
    res.status(500).json({ error: "Error al crear el viaje" });
  }
});

// PUT actualizar viaje
router.put("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { error } = viajeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const { user_id, paquete_id, fecha_reserva, estado, puntos_otorgados } = req.body;

  try {
    const result = await pool.query(
      `UPDATE viajes 
       SET user_id = $1, paquete_id = $2, fecha_reserva = $3, estado = $4, puntos_otorgados = $5
       WHERE id = $6 RETURNING *`,
      [user_id, paquete_id, fecha_reserva, estado, puntos_otorgados, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar viaje:", err);
    res.status(500).json({ error: "Error al actualizar viaje" });
  }
});

// DELETE viaje
router.delete("/:id", verifyToken, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM viajes WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.json({ message: "Viaje eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar viaje:", err);
    res.status(500).json({ error: "Error al eliminar viaje" });
  }
});

export default router;