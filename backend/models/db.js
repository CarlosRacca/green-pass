// Legacy CJS DB client replaced by ESM database.js
// Keeping minimal shim to avoid runtime breaks if imported somewhere unexpected
const { createRequire } = require('module');
const requireCjs = createRequire(import.meta.url);
const pkg = requireCjs('pg');
const { Pool } = pkg;
requireCjs('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
