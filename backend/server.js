import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database.js';
import contactRoutes from './routes/contactRoutes.js';
import notifyRoutes from './routes/notifyRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import torneosRoutes from "./routes/torneosRoutes.js";
import paquetesRoutes from "./routes/paquetesRoutes.js";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Rutas
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong!' });
});

// Usar las rutas del formulario de contacto
app.use('/api/contact', contactRoutes);
app.use('/api/notify', notifyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/torneos", torneosRoutes);
app.use("/api/paquetes", paquetesRoutes);




app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
