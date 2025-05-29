// calcularPuntos.js
import pool from './database.js';

export const calcularPuntosParaPareja = async (dia_id, pareja_id) => {
  try {
    const parejaRes = await pool.query(
      `SELECT * FROM torneo_parejas WHERE id = $1`,
      [pareja_id]
    );
    const pareja = parejaRes.rows[0];
    if (!pareja) return;

    const jugadorIds = [pareja.jugador_1_id, pareja.jugador_2_id];

    const scoresRes = await pool.query(
      `SELECT * FROM torneo_scores WHERE dia_id = $1 AND jugador_id = ANY($2)`,
      [dia_id, jugadorIds]
    );
    const scores = scoresRes.rows;

    const scoresPorJugador = jugadorIds.map(id => scores.filter(s => s.jugador_id === id));
    if (scoresPorJugador.some(s => s.length < 18)) return;

    let puntos = 0;

    const tieneLongDrive = scores.some(s => s.long_drive);
    const tieneApproach = scores.some(s => s.mejor_approach);
    if (tieneLongDrive) puntos += 1;
    if (tieneApproach) puntos += 1;

    const birdiesGross = scores.filter(s => s.score === 3).length;
    const bogeysGross = scores.filter(s => s.score === 5).length;

    puntos += 1; // Birdies
    puntos += 1; // Bogeys

    const existeRes = await pool.query(
      `SELECT * FROM torneo_resultados WHERE dia_id = $1 AND pareja_id = $2`,
      [dia_id, pareja_id]
    );

    if (existeRes.rows.length > 0) {
      await pool.query(
        `UPDATE torneo_resultados SET puntos = $1 WHERE dia_id = $2 AND pareja_id = $3`,
        [puntos, dia_id, pareja_id]
      );
    } else {
      await pool.query(
        `INSERT INTO torneo_resultados (dia_id, pareja_id, puntos) VALUES ($1, $2, $3)`,
        [dia_id, pareja_id, puntos]
      );
    }

    console.log(`✔️ Puntos actualizados para pareja ${pareja_id}: ${puntos}`);
  } catch (err) {
    console.error("❌ Error en calcularPuntosParaPareja:", err);
  }
};
