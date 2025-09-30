import express from "express";
import pool from "../database.js";

const router = express.Router();

// ✅ GET - Todos los registros
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios_paquetes");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios_paquetes:", error);
    res.status(500).json({ error: "Error al obtener registros" });
  }
});

// ✅ GET - Un registro por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios_paquetes WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Registro no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario_paquete:", error);
    res.status(500).json({ error: "Error al obtener registro" });
  }
});

// ✅ POST - Crear nuevo registro
router.post("/", async (req, res) => {
  const { user_id, paquete_id, fecha_compra } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO usuarios_paquetes (user_id, paquete_id, fecha_compra)
       VALUES ($1, $2, COALESCE($3::timestamp, NOW())) RETURNING *`,
      [user_id, paquete_id, fecha_compra || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error && error.code === '23505') {
      try {
        await pool.query(
          `SELECT setval('usuarios_paquetes_id_seq', COALESCE((SELECT MAX(id)+1 FROM usuarios_paquetes), 1), false)`
        );
        const retry = await pool.query(
          `INSERT INTO usuarios_paquetes (user_id, paquete_id, fecha_compra)
           VALUES ($1, $2, COALESCE($3::timestamp, NOW())) RETURNING *`,
          [user_id, paquete_id, fecha_compra || null]
        );
        return res.status(201).json(retry.rows[0]);
      } catch (e2) {
        console.error('Retry usuarios_paquetes failed:', e2);
      }
    }
    console.error("Error al crear usuario_paquete:", error);
    res.status(500).json({ error: "Error al crear registro" });
  }
});

// ✅ PUT - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, paquete_id, fecha_compra } = req.body;
  try {
    const result = await pool.query(
      `UPDATE usuarios_paquetes SET user_id = $1, paquete_id = $2, fecha_compra = $3
       WHERE id = $4 RETURNING *`,
      [user_id, paquete_id, fecha_compra || new Date(), id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Registro no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar usuario_paquete:", error);
    res.status(500).json({ error: "Error al actualizar registro" });
  }
});

// ✅ DELETE - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM usuarios_paquetes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Registro no encontrado" });
    res.json({ mensaje: "Registro eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario_paquete:", error);
    res.status(500).json({ error: "Error al eliminar registro" });
  }
});

export default router;
