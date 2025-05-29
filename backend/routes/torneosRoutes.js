import express from 'express';
import pool from '../database.js';

const router = express.Router();

// Obtener todos los torneos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM torneos ORDER BY fecha_inicio DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener torneos:", err);
    res.status(500).json({ error: "Error al obtener torneos" });
  }
});

// Obtener detalles completos de un torneo
router.get("/:id/completo", async (req, res) => {
  const { id } = req.params;

  try {
    const torneoRes = await pool.query("SELECT * FROM torneos WHERE id = $1", [id]);
    if (torneoRes.rows.length === 0) return res.status(404).json({ error: "Torneo no encontrado" });
    const torneo = torneoRes.rows[0];

    const diasRes = await pool.query(
      "SELECT * FROM torneo_dias WHERE torneo_id = $1 ORDER BY fecha",
      [id]
    );
    const dias = diasRes.rows;

    const parejasDetalle = [];

    for (const dia of dias) {
      const parejasRes = await pool.query(
        `SELECT tp.id as pareja_id, tp.dia_id,
                j1.id as jugador_1_id, j1.nombre as jugador_1_nombre, j1.apellido as jugador_1_apellido,
                j2.id as jugador_2_id, j2.nombre as jugador_2_nombre, j2.apellido as jugador_2_apellido
         FROM torneo_parejas tp
         JOIN users j1 ON tp.jugador_1_id = j1.id
         JOIN users j2 ON tp.jugador_2_id = j2.id
         WHERE tp.dia_id = $1`,
        [dia.id]
      );

      for (const pareja of parejasRes.rows) {
        const scoresRes = await pool.query(
          `SELECT * FROM torneo_scores WHERE dia_id = $1 AND (jugador_id = $2 OR jugador_id = $3)`,
          [dia.id, pareja.jugador_1_id, pareja.jugador_2_id]
        );

        const scores = scoresRes.rows;

        const longDrive = scores.some(s => s.long_drive);
        const mejorApproach = scores.some(s => s.mejor_approach);
        const birdies = scores.filter(s => s.score <= 3).length;
        const bogeys = scores.filter(s => s.score >= 5).length;

        parejasDetalle.push({
          dia_id: dia.id,
          dia_fecha: dia.fecha,
          modalidad: dia.modalidad,
          pareja_id: pareja.pareja_id,
          jugador_1: {
            id: pareja.jugador_1_id,
            nombre: pareja.jugador_1_nombre,
            apellido: pareja.jugador_1_apellido,
            scores: scores.filter(s => s.jugador_id === pareja.jugador_1_id).sort((a, b) => a.hoyo - b.hoyo)
          },
          jugador_2: {
            id: pareja.jugador_2_id,
            nombre: pareja.jugador_2_nombre,
            apellido: pareja.jugador_2_apellido,
            scores: scores.filter(s => s.jugador_id === pareja.jugador_2_id).sort((a, b) => a.hoyo - b.hoyo)
          },
          longDrive,
          mejorApproach,
          birdies,
          bogeys
        });
      }
    }

    res.json({ torneo, dias, parejasDetalle });
  } catch (err) {
    console.error("Error al obtener torneo completo:", err);
    res.status(500).json({ error: "Error al obtener torneo completo" });
  }
});

// Obtener ranking final de un torneo
router.get("/:id/ranking-final", async (req, res) => {
  const { id } = req.params;

  try {
    const resultados = await pool.query(
      `SELECT 
          LEAST(tp.jugador_1_id, tp.jugador_2_id) AS jugador_a_id,
          GREATEST(tp.jugador_1_id, tp.jugador_2_id) AS jugador_b_id,
          u1.nombre AS jugador_a_nombre, u1.apellido AS jugador_a_apellido,
          u2.nombre AS jugador_b_nombre, u2.apellido AS jugador_b_apellido,
          SUM(tr.puntos) AS puntos_totales
       FROM torneo_resultados tr
       JOIN torneo_parejas tp ON tr.pareja_id = tp.id
       JOIN torneo_dias td ON tr.dia_id = td.id
       JOIN users u1 ON u1.id = LEAST(tp.jugador_1_id, tp.jugador_2_id)
       JOIN users u2 ON u2.id = GREATEST(tp.jugador_1_id, tp.jugador_2_id)
       WHERE td.torneo_id = $1
       GROUP BY jugador_a_id, jugador_b_id, u1.nombre, u1.apellido, u2.nombre, u2.apellido
       ORDER BY puntos_totales DESC`,
      [id]
    );

    res.json(resultados.rows);
  } catch (err) {
    console.error("Error al obtener ranking final:", err);
    res.status(500).json({ error: "Error al obtener ranking final del torneo" });
  }
});

// Obtener scores por día de un torneo
router.get("/:id/scores-por-dia", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT td.id as dia_id, td.fecha, td.modalidad, 
              ts.jugador_id, u.nombre, u.apellido, ts.hoyo, ts.score
       FROM torneo_scores ts
       JOIN torneo_dias td ON ts.dia_id = td.id
       JOIN users u ON ts.jugador_id = u.id
       WHERE td.torneo_id = $1
       ORDER BY td.fecha, ts.jugador_id, ts.hoyo`,
      [id]
    );

    const agrupado = {};
    result.rows.forEach(row => {
      const diaKey = `${row.dia_id}_${row.fecha}`;
      if (!agrupado[diaKey]) {
        agrupado[diaKey] = {
          dia_id: row.dia_id,
          fecha: row.fecha,
          modalidad: row.modalidad,
          jugadores: {}
        };
      }

      if (!agrupado[diaKey].jugadores[row.jugador_id]) {
        agrupado[diaKey].jugadores[row.jugador_id] = {
          jugador_id: row.jugador_id,
          nombre: row.nombre,
          apellido: row.apellido,
          scores: []
        };
      }

      agrupado[diaKey].jugadores[row.jugador_id].scores.push({
        hoyo: row.hoyo,
        score: row.score
      });
    });

    const resultadoFinal = Object.values(agrupado).map(dia => ({
      dia_id: dia.dia_id,
      fecha: dia.fecha,
      modalidad: dia.modalidad,
      jugadores: Object.values(dia.jugadores)
    }));

    res.json(resultadoFinal);
  } catch (err) {
    console.error("Error al obtener scores por día:", err);
    res.status(500).json({ error: "Error al obtener scores por día" });
  }
});

// Cargar score y calcular puntos
router.post("/scores", async (req, res) => {
  const { torneo_id, dia_id, jugador_id, hoyo, score, long_drive, mejor_approach } = req.body;

  try {
    const torneoCheck = await pool.query(`SELECT finalizado FROM torneos WHERE id = $1`, [torneo_id]);
    if (torneoCheck.rows.length === 0) return res.status(404).json({ error: "Torneo no encontrado" });
    if (torneoCheck.rows[0].finalizado) return res.status(400).json({ error: "El torneo ya está finalizado" });

    const scoreCountRes = await pool.query(
      `SELECT COUNT(*) FROM torneo_scores WHERE dia_id = $1 AND jugador_id = $2`,
      [dia_id, jugador_id]
    );
    const cantidadActual = parseInt(scoreCountRes.rows[0].count);
    if (cantidadActual >= 18) {
      return res.status(400).json({ error: "Este jugador ya tiene 18 hoyos cargados para este día." });
    }

    const result = await pool.query(
      `INSERT INTO torneo_scores (torneo_id, dia_id, jugador_id, hoyo, score, long_drive, mejor_approach)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [torneo_id, dia_id, jugador_id, hoyo, score, long_drive || false, mejor_approach || false]
    );

    const parejaRes = await pool.query(
      `SELECT id FROM torneo_parejas
       WHERE dia_id = $1 AND (jugador_1_id = $2 OR jugador_2_id = $2)`,
      [dia_id, jugador_id]
    );

    if (parejaRes.rows.length > 0) {
      const pareja_id = parejaRes.rows[0].id;

      const parejaInfo = await pool.query(
        `SELECT jugador_1_id, jugador_2_id FROM torneo_parejas WHERE id = $1`,
        [pareja_id]
      );
      const { jugador_1_id, jugador_2_id } = parejaInfo.rows[0];

      const scoresJ1 = await pool.query(
        `SELECT COUNT(*) FROM torneo_scores WHERE dia_id = $1 AND jugador_id = $2`,
        [dia_id, jugador_1_id]
      );
      const scoresJ2 = await pool.query(
        `SELECT COUNT(*) FROM torneo_scores WHERE dia_id = $1 AND jugador_id = $2`,
        [dia_id, jugador_2_id]
      );

      if (parseInt(scoresJ1.rows[0].count) >= 9 && parseInt(scoresJ2.rows[0].count) >= 9) {
        await calcularPuntosParaPareja(dia_id, pareja_id);
      }
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al cargar score:", err);
    res.status(500).json({ error: "Error al cargar score" });
  }
});

export default router;