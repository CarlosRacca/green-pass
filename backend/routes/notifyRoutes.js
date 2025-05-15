import express from 'express';
import pool from '../database.js';

const router = express.Router();

// Registrar consulta del paquete
router.post('/notify-package-view', async (req, res) => {
  const { paquete } = req.body;
  if (!paquete) return res.status(400).json({ success: false, error: 'Falta el nombre del paquete' });

  try {
    const consulta = await pool.query('SELECT * FROM consultas WHERE paquete = $1', [paquete]);
    let cantidad = 1;

    if (consulta.rows.length > 0) {
      cantidad = consulta.rows[0].cantidad + 1;
      await pool.query(
        'UPDATE consultas SET cantidad = $1, ultima_consulta = NOW() WHERE paquete = $2',
        [cantidad, paquete]
      );
    } else {
      await pool.query(
        'INSERT INTO consultas (paquete, cantidad, ultima_consulta) VALUES ($1, $2, NOW())',
        [paquete, cantidad]
      );
    }

    res.json({ success: true, cantidad });
  } catch (err) {
    console.error('🔥 Error al registrar consulta:', err);
    res.status(500).json({ success: false });
  }
});

// Obtener todas las consultas para el panel de admin
router.get('/consultas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM consultas ORDER BY ultima_consulta DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('🔥 Error al obtener consultas:', err);
    res.status(500).json({ success: false });
  }
});

export default router;
