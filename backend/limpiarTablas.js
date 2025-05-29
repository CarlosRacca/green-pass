// limpiarTablas.js
import pool from './database.js';

const limpiarTablas = async () => {
  try {
    console.log("Limpiando tablas...");

    await pool.query('DELETE FROM torneo_scores');
    await pool.query('DELETE FROM torneo_parejas');
    await pool.query('DELETE FROM torneo_jugadores');
    await pool.query('DELETE FROM torneo_dias');
    await pool.query('DELETE FROM torneos');
    await pool.query('DELETE FROM usuarios_paquetes');
    await pool.query("DELETE FROM users WHERE email != 'admin@greenpass.com'");

    console.log("Tablas limpiadas correctamente.");
    process.exit();
  } catch (err) {
    console.error("Error al limpiar tablas:", err);
    process.exit(1);
  }
};

limpiarTablas();

