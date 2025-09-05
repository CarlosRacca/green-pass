/* Seed de datos demo */
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

async function main() {
  console.log('Seeding...');
  try {
    await pool.query('BEGIN');

    // Usuarios
    await pool.query(`
      INSERT INTO users (nombre, apellido, email, password, role)
      VALUES 
        ('Admin', 'GP', 'admin@greenpass.com', '$2b$10$2n0ZzQ0B0Pz4g0f3kq8rN.1b3f1vY0jv8kZpZ9p1s3n6Jk9nR9x1K', 'superadmin')
      ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO users (nombre, apellido, email, password, role)
      VALUES 
        ('Juana', 'Lopez', 'juana@greenpass.com', 'demo', 'cliente'),
        ('Pedro', 'Gomez', 'pedro@greenpass.com', 'demo', 'cliente')
      ON CONFLICT DO NOTHING;
    `);

    // Paquetes (si existe tabla paquetes)
    await pool.query(`
      INSERT INTO paquetes (nombre, destino, precio, descripcion)
      VALUES
        ('Llao Llao Experience', 'Bariloche', 1500, 'Golf, lujo y naturaleza'),
        ('Chapelco Adventure', 'San Martín de los Andes', 1500, 'Golf y aventura en la Patagonia')
      ON CONFLICT DO NOTHING;
    `);

    // Viaje demo para Juana
    const juana = await pool.query(`SELECT id FROM users WHERE email='juana@greenpass.com' LIMIT 1`);
    const paquete = await pool.query(`SELECT id FROM paquetes LIMIT 1`);
    if (juana.rows[0] && paquete.rows[0]) {
      await pool.query(
        `INSERT INTO viajes (cliente_id, paquete_id, fecha_reserva, estado, puntos_otorgados)
         VALUES ($1, $2, NOW(), 'confirmado', 100) ON CONFLICT DO NOTHING`,
        [juana.rows[0].id, paquete.rows[0].id]
      );
    }

    await pool.query('COMMIT');
    console.log('Seed completado ✓');
  } catch (e) {
    await pool.query('ROLLBACK');
    console.error('Error en seed:', e);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();


