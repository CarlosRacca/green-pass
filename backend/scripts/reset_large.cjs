/* Reset + seed LARGE */
/* Ejecuta: npm run reset:large */

const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

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

async function main() {
  console.log('♻️  Reset LARGE iniciando...');
  try {
    await pool.query('BEGIN');
    await pool.query('SET session_replication_role = replica;');

    const candidates = [
      'itinerario_actividades','itinerario_dias','torneo_scores','torneo_resultados','torneo_puntajes','torneo_parejas','torneo_jugadores','torneo_dias','torneos','usuarios_paquetes','viajes','paquetes','consultas','contacts','users'
    ];
    for (const t of candidates) {
      if (await tableExists(t)) {
        if (t === 'users') {
          await pool.query(`DELETE FROM users`);
        } else {
          await pool.query(`TRUNCATE TABLE ${t} RESTART IDENTITY CASCADE`);
        }
      }
    }

    await pool.query('SET session_replication_role = DEFAULT;');
    await pool.query('COMMIT');
    console.log('✅ Tablas truncadas. Ejecutando seed LARGE...');

    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.resolve(__dirname, 'seed_full.cjs')], { stdio: 'inherit' });
      child.on('exit', code => (code === 0 ? resolve() : reject(new Error('seed_full fallo'))));
    });
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.resolve(__dirname, 'seed_large.cjs')], { stdio: 'inherit' });
      child.on('exit', code => (code === 0 ? resolve() : reject(new Error('seed_large fallo'))));
    });

    console.log('🎉 Reset + seed LARGE OK');
    process.exit(0);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('❌ Error en reset LARGE:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();


