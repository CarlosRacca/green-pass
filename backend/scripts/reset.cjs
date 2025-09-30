/* Reset seguro de base de datos (local) + reseed completo */
/* Ejecuta: npm run reset:full */

const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const localEnvPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath, override: true });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function tableExists(tableName) {
  const { rows } = await pool.query(
    `SELECT EXISTS (
       SELECT 1 FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name = $1
     ) AS exists`,
    [tableName]
  );
  return rows[0]?.exists === true;
}

async function reset() {
  console.log('♻️  Reset de base de datos iniciando...');
  try {
    await pool.query('BEGIN');

    // Desactivar FK
    await pool.query('SET session_replication_role = replica;');

    const candidates = [
      'itinerario_actividades',
      'itinerario_dias',
      'torneo_scores',
      'torneo_resultados',
      'torneo_puntajes',
      'torneo_parejas',
      'torneo_jugadores',
      'torneo_dias',
      'torneos',
      'usuarios_paquetes',
      'viajes',
      'paquetes',
      'consultas',
      'contacts',
      'users',
    ];

    for (const t of candidates) {
      if (await tableExists(t)) {
        if (t === 'users') {
          // conservar admin base si existe
          await pool.query(`DELETE FROM users WHERE email <> 'admin@greenpass.com'`);
        } else {
          await pool.query(`TRUNCATE TABLE ${t} RESTART IDENTITY CASCADE`);
        }
      }
    }

    // Reactivar FK
    await pool.query('SET session_replication_role = DEFAULT;');
    await pool.query('COMMIT');
    console.log('✅ Tablas truncadas. Ejecutando reseed...');

    // Ejecutar seed completo
    const { spawn } = require('child_process');
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.resolve(__dirname, 'seed_full.cjs')], {
        stdio: 'inherit',
      });
      child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('seed_full fallo'))));
    });

    console.log('🎉 Reset + seed completo OK');
    process.exit(0);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('❌ Error en reset:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

reset();


