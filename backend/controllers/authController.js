import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import pool from "../database.js";

dotenv.config();

export async function login(req, res) {
  const { email, password } = req.body;

  console.log("INTENTANDO LOGIN:", email, password);
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    // Comparación segura con fallback si la contraseña en DB no está hasheada
    const passwordFromDb = user.password || "";
    const isBcryptHash = passwordFromDb.startsWith("$2");
    const validPassword = isBcryptHash
      ? await bcrypt.compare(password, passwordFromDb)
      : password === passwordFromDb;
    if (!validPassword) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
}
