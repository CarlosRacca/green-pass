import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../database.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    matricula,
    handicap,
    email,
    password,
    cliente_id,
    paquete_id,
    role // 👈 añadimos esto para permitir rol
  } = req.body;

  try {
    let puntos = 0;

    // Solo si se envía paquete_id, buscamos el paquete
    if (paquete_id) {
      const paqueteRes = await pool.query(
        "SELECT puntos FROM paquetes WHERE id = $1",
        [paquete_id]
      );

      if (paqueteRes.rows.length === 0) {
        return res.status(400).json({ error: "Paquete no encontrado" });
      }

      puntos = paqueteRes.rows[0].puntos;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const userRes = await pool.query(
      `INSERT INTO users 
        (nombre, apellido, dni, matricula, handicap, email, password, cliente_id, puntos, viajes_comprados, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        nombre,
        apellido,
        dni,
        matricula,
        handicap,
        email,
        hashedPassword,
        cliente_id || null,
        puntos,
        paquete_id ? 1 : 0,
        role || 'cliente'
      ]
    );

    const user = userRes.rows[0];

    // Si hay paquete, registrar relación usuario-paquete
    if (paquete_id) {
      await pool.query(
        `INSERT INTO usuarios_paquetes (user_id, paquete_id)
         VALUES ($1, $2)`,
        [user.id, paquete_id]
      );
    }

    res.status(201).json({ mensaje: "Usuario creado", user });

  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});


// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    dni,
    matricula,
    handicap,
    email,
    cliente_id,
    puntos,
    viajes_comprados
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET 
        nombre = $1,
        apellido = $2,
        dni = $3,
        matricula = $4,
        handicap = $5,
        email = $6,
        cliente_id = $7,
        puntos = $8,
        viajes_comprados = $9
      WHERE id = $10 RETURNING *`,
      [nombre, apellido, dni, matricula, handicap, email, cliente_id, puntos, viajes_comprados, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al editar usuario:", err);
    res.status(500).json({ error: "Error al editar usuario" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});


export default router;
