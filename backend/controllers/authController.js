import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "../database.js";

dotenv.config();

export async function login(req, res) {
  const { email, password } = req.body;

  // Evitar loguear credenciales sensibles en consola
  if (process.env.NODE_ENV === 'development') {
    try { console.log("INTENTANDO LOGIN:", email); } catch {}
  }
  try {
    // Buscar primero en 'usuarios' y si no existe, buscar en 'users'
    let userResult = await pool.query("SELECT id, email, password, role, nombre FROM usuarios WHERE email = $1", [email]);
    let user = userResult.rows[0];
    if (!user) {
      userResult = await pool.query("SELECT id, email, password, role, nombre FROM users WHERE email = $1", [email]);
      user = userResult.rows[0];
    }

    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    // Comparación segura con fallback si la contraseña en DB no está hasheada
    const passwordFromDb = user.password || "";
    const isBcryptHash = passwordFromDb.startsWith("$2");
    const validPassword = isBcryptHash
      ? await bcrypt.compare(password, passwordFromDb)
      : password === passwordFromDb;
    if (!validPassword) return res.status(401).json({ error: "Credenciales inválidas" });

    // Garantizar que el ID usado por el frontend sea el de la tabla 'users'
    // Si el usuario proviene de 'usuarios', intentamos mapearlo por email a 'users'
    let appUser = null;
    const byEmailInUsers = await pool.query(
      "SELECT id, nombre, apellido, dni, matricula, handicap, email, role FROM users WHERE email = $1",
      [user.email]
    );
    if (byEmailInUsers.rows.length > 0) {
      appUser = byEmailInUsers.rows[0];
    } else {
      // Crear registro mínimo en 'users' para mantener consistencia
      const insertUsers = await pool.query(
        `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING id, nombre, apellido, dni, matricula, handicap, email, role`,
        [user.nombre || "", null, null, null, null, user.email, user.password || "", user.role || "cliente"]
      );
      appUser = insertUsers.rows[0];
    }

    // También asegurar espejo en 'usuarios' (por si el login vino desde 'users')
    await pool.query(
      `INSERT INTO usuarios (email, password, role, nombre)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET
         password = COALESCE(EXCLUDED.password, usuarios.password),
         role = COALESCE(EXCLUDED.role, usuarios.role),
         nombre = COALESCE(EXCLUDED.nombre, usuarios.nombre)`,
      [appUser.email, user.password || null, appUser.role, appUser.nombre || ""]
    );

    const token = jwt.sign(
      { id: appUser.id, role: appUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: appUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
}
