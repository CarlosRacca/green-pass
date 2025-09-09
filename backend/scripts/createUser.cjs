// scripts/createUser.js
const bcrypt = require("bcrypt");
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function createUser() {
  const email = "admin@greenpass.com";
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "superadmin";

  // Insertar cumpliendo NOT NULL de la tabla (al menos nombre)
  const dni = "99999997"; // único para evitar conflicto
  const matricula = "SUPER01";
  const handicap = 0;

  await pool.query(
    "INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (email) DO NOTHING",
    ["Admin", "GP", dni, matricula, handicap, email, hashedPassword, role]
  );

  console.log("Usuario creado");
  await pool.end();
}

createUser().catch(console.error);
