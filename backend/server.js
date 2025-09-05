import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import client from 'prom-client';
import dotenv from 'dotenv';
import pool from './database.js';
import contactRoutes from './routes/contactRoutes.js';
import notifyRoutes from './routes/notifyRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import torneosRoutes from "./routes/torneosRoutes.js";
import paquetesRoutes from "./routes/paquetesRoute.js";
import itinerariosRoutes from "./routes/itinerariosRoutes.js";
import { EventEmitter } from "events";
import usuariosPaquetesRoutes from "./routes/usuariosPaquetesRoutes.js";
import viajesRoutes from "./routes/viajesRoutes.js";
import consultasRoutes from './routes/consultasRoutes.js';


EventEmitter.defaultMaxListeners = 20;


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

// Rate limiting básico
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Métricas Prometheus
client.collectDefaultMetrics();
const register = client.register;
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Healthchecks
app.get('/healthz', (req, res) => res.status(200).send('ok'));
app.get('/readyz', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send('ready');
  } catch {
    res.status(500).send('not-ready');
  }
});

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
app.use("/api/itinerarios", itinerariosRoutes);
app.use("/api/usuarios-paquetes", usuariosPaquetesRoutes);
app.use('/api/consultas', consultasRoutes);

app.use("/api/viajes", viajesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
