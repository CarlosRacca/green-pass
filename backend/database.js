import pkg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Cargar .env del directorio del backend, independientemente del CWD
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

// Forzar SSL en entornos gestionados (Render, etc.)
const shouldForceSSL = (() => {
  if (process.env.NODE_ENV === 'production') return true;
  if (!connectionString) return false;
  return /render\.com|sslmode=require/i.test(connectionString);
})();

const pool = new Pool({
  connectionString,
  ssl: shouldForceSSL ? { rejectUnauthorized: false } : false,
});

export default pool;