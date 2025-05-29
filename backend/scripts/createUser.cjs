// scripts/createUser.js
const bcrypt = require("bcrypt");
const pool = require("../database.js").default;

async function createUser() {
  const email = "admin@greenpass.com";
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "superadmin";

  await pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
    [email, hashedPassword, role]
  );

  console.log("Usuario creado");
}

createUser().catch(console.error);
