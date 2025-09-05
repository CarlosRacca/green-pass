import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import pinoHttp from 'pino-http';
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
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin: (origin, cb) => {
  if (!origin || ALLOWED_ORIGINS.length === 0) return cb(null, true);
  return cb(null, ALLOWED_ORIGINS.includes(origin));
}}));
app.use(express.json());
app.use(compression());
app.use(pinoHttp({
  autoLogging: true,
  redact: ['req.headers.authorization']
}));

// Rate limiting básico
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Rate limit específico para login
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
app.use('/api/auth/login', authLimiter);

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
