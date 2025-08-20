// routes/contactsRoutes.js
import express from 'express';
import pool from '../database.js';

const router = express.Router();

// Obtener todos los contactos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
});

// Obtener un contacto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el contacto' });
  }
});

// Crear un nuevo contacto
router.post('/', async (req, res) => {
  const { nombre, apellido, email, telefono, mensaje } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (nombre, apellido, email, telefono, mensaje) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, email, telefono, mensaje]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el contacto' });
  }
});

// Actualizar un contacto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, mensaje } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contacts SET nombre=$1, apellido=$2, email=$3, telefono=$4, mensaje=$5 WHERE id=$6 RETURNING *',
      [nombre, apellido, email, telefono, mensaje, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el contacto' });
  }
});

// Eliminar un contacto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.json({ message: 'Contacto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el contacto' });
  }
});

export default router;
