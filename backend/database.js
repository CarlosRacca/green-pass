import pkg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Cargar variables de entorno: primero .env (común), luego .env.local (override para desarrollo)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

// Forzar SSL solo cuando se requiere (producción o cadenas que lo indiquen)
const isLocalHost = /@(localhost|127\.0\.0\.1)(:|\/)/i.test(connectionString || '');
const sslDisabledByParam = /sslmode=disable/i.test(connectionString || '');
const shouldForceSSL = (() => {
  if (!connectionString) return false;
  if (isLocalHost || sslDisabledByParam) return false;
  if (process.env.NODE_ENV === 'production') return true;
  return /render\.com|sslmode=require/i.test(connectionString);
})();

const pool = new Pool({
  connectionString,
  ssl: shouldForceSSL ? { rejectUnauthorized: false } : false,
});

// Auto-check on startup to help diagnose local connectivity
if (process.env.NODE_ENV !== 'test') {
  pool.query('SELECT 1').then(() => {
    console.log('[DB] Conexión OK');
  }).catch((e) => {
    console.error('[DB] Error de conexión:', e?.message);
  });
}

export default pool;