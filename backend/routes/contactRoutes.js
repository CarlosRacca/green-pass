import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: obtener todos los contactos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error al consultar contactos:', err);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// POST: ya lo tenías, pero lo incluyo por si querés todo en uno
router.post('/', async (req, res) => {
    const { nombre, apellido, email, telefono, matricula } = req.body;
  
    if (!nombre || !apellido || !email || !telefono || !matricula) {
      return res.status(400).json({ success: false, error: 'Faltan datos' });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO contacts (nombre, apellido, email, telefono, matricula)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [nombre, apellido, email, telefono, matricula]
      );
  
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error('Error al insertar contacto:', err);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  });

  router.get('/admin', async (req, res) => {
    const { password } = req.query;
  
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
  
    try {
      const result = await pool.query('SELECT * FROM contacts ORDER BY fecha DESC');
      res.json({ success: true, data: result.rows });
    } catch (err) {
      console.error('Error al obtener contactos:', err);
      res.status(500).json({ success: false, error: 'Error del servidor' });
    }
  });
  

export default router;
