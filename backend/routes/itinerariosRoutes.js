import express from "express";
import pool from "../database.js";

const router = express.Router();

/**
 * Crear día de itinerario
 */
router.post("/dias", async (req, res) => {
  const { cliente_id, paquete_id, fecha } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO itinerario_dias (cliente_id, paquete_id, fecha)
       VALUES ($1, $2, $3) RETURNING *`,
      [cliente_id, paquete_id, fecha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear día de itinerario:", err);
    res.status(500).json({ error: "Error al crear día de itinerario" });
  }
});

/**
 * Crear actividad dentro de un día
 */
router.post("/actividades", async (req, res) => {
  const { itinerario_dia_id, hora, actividad, lugar, notas } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO itinerario_actividades (itinerario_dia_id, hora, actividad, lugar, notas)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [itinerario_dia_id, hora, actividad, lugar, notas]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear actividad:", err);
    res.status(500).json({ error: "Error al crear actividad" });
  }
});

/**
 * Obtener itinerario completo por cliente y paquete
 */
router.get("/cliente/:cliente_id/paquete/:paquete_id", async (req, res) => {
  const { cliente_id, paquete_id } = req.params;
  try {
    const dias = await pool.query(
      `SELECT * FROM itinerario_dias
       WHERE cliente_id = $1 AND paquete_id = $2
       ORDER BY fecha ASC`,
      [cliente_id, paquete_id]
    );

    const resultado = [];

    for (const dia of dias.rows) {
      const actividades = await pool.query(
        `SELECT * FROM itinerario_actividades
         WHERE itinerario_dia_id = $1
         ORDER BY hora ASC`,
        [dia.id]
      );

      resultado.push({
        id: dia.id,
        fecha: dia.fecha,
        actividades: actividades.rows,
      });
    }

    res.json(resultado);
  } catch (err) {
    console.error("Error al obtener itinerario completo:", err);
    res.status(500).json({ error: "Error al obtener itinerario" });
  }
});

/**
 * Editar actividad
 */
router.put("/actividades/:id", async (req, res) => {
  const { id } = req.params;
  const { hora, actividad, lugar, notas } = req.body;

  try {
    const result = await pool.query(
      `UPDATE itinerario_actividades SET
         hora = $1,
         actividad = $2,
         lugar = $3,
         notas = $4
       WHERE id = $5 RETURNING *`,
      [hora, actividad, lugar, notas, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al editar actividad:", err);
    res.status(500).json({ error: "Error al editar actividad" });
  }
});

/**
 * Borrar actividad
 */
router.delete("/actividades/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM itinerario_actividades WHERE id = $1", [id]);
    res.json({ mensaje: "Actividad eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar actividad:", err);
    res.status(500).json({ error: "Error al eliminar actividad" });
  }
});

/**
 * Borrar día completo (y sus actividades en cascada)
 */
router.delete("/dias/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM itinerario_dias WHERE id = $1", [id]);
    res.json({ mensaje: "Día eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar día:", err);
    res.status(500).json({ error: "Error al eliminar día" });
  }
});

export default router;
