/* Ensure required users exist with correct roles and passwords */
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const localEnv = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(localEnv)) dotenv.config({ path: localEnv, override: true });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function upsertUser(email, nombre, apellido, role, passwordPlain) {
  const hash = await bcrypt.hash(passwordPlain, 10);
  // Tabla principal 'users'
  await pool.query(
    `INSERT INTO users (nombre, apellido, email, password, role)
     VALUES ($1,$2,$3,$4,$5)
     ON CONFLICT (email) DO UPDATE SET
       nombre = EXCLUDED.nombre,
       apellido = EXCLUDED.apellido,
       password = EXCLUDED.password,
       role = EXCLUDED.role`,
    [nombre, apellido, email, hash, role]
  );
  // Espejo 'usuarios' usado por login legacy
  await pool.query(
    `INSERT INTO usuarios (email, password, role, nombre)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (email) DO UPDATE SET
       password = EXCLUDED.password,
       role = EXCLUDED.role,
       nombre = EXCLUDED.nombre`,
    [email, hash, role, nombre]
  );
}

async function main() {
  console.log('🔐 Asegurando usuarios requeridos...');
  try {
    await upsertUser('carlos@greenpass.com', 'Carlos', 'Admin', 'superadmin', '123456');
    await upsertUser('juan@greenpass.com', 'Juan', 'Pérez', 'cliente', '123456');
    console.log('✅ Usuarios asegurados con roles correctos.');
  } catch (e) {
    console.error('❌ Error asegurando usuarios:', e);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();


