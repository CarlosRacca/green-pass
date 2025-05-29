import express from 'express';
import pool from '../database.js';

const router = express.Router();

// Obtener todos los paquetes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM paquetes WHERE activo = true');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener paquetes:', err);
    res.status(500).json({ error: 'Error al obtener paquetes' });
  }
});

// Crear nuevo paquete
router.post('/', async (req, res) => {
  const { nombre, descripcion, destino, precio, puntos, duracion, imagen_url } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO paquetes (nombre, descripcion, destino, precio, puntos, duracion, imagen_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, descripcion, destino, precio, puntos, duracion, imagen_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear paquete:', err);
    res.status(500).json({ error: 'Error al crear paquete' });
  }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, destino, precio, puntos, duracion, imagen_url, activo } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE paquetes SET 
          nombre = $1,
          descripcion = $2,
          destino = $3,
          precio = $4,
          puntos = $5,
          duracion = $6,
          imagen_url = $7,
          activo = $8
        WHERE id = $9 RETURNING *`,
        [nombre, descripcion, destino, precio, puntos, duracion, imagen_url, activo, id]
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error al editar paquete:", err);
      res.status(500).json({ error: "Error al editar paquete" });
    }
  });
  

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query("DELETE FROM paquetes WHERE id = $1", [id]);
      res.json({ mensaje: "Paquete eliminado correctamente" });
    } catch (err) {
      console.error("Error al eliminar paquete:", err);
      res.status(500).json({ error: "Error al eliminar paquete" });
    }
  });
  

export default router;
