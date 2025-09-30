const request = require('supertest');
const { Pool } = require('pg');
const app = require('../server.js').default || require('../server.js');

function getPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
}

async function login(email, password) {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password })
    .set('Content-Type', 'application/json');
  return res;
}

async function loginAsSuperadmin() {
  // Usa superadmin ya existente (carlos@greenpass.com / 123456)
  const res = await login('carlos@greenpass.com', '123456');
  if (res.status !== 200) throw new Error('No se pudo loguear como superadmin');
  return res.body;
}

async function loginAsCliente() {
  const res = await login('cliente@greenpass.com', 'cliente123');
  if (res.status !== 200) throw new Error('No se pudo loguear como cliente');
  return res.body;
}

async function createTempPackage(pool) {
  const { rows } = await pool.query(
    `INSERT INTO paquetes (nombre, destino, precio, descripcion, puntos)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [`Test Pack ${Date.now()}`, 'Destino X', 1000, 'Desc', 100]
  );
  return rows[0];
}

async function createTempUser(pool) {
  const email = `test_${Date.now()}@greenpass.com`;
  const { rows } = await pool.query(
    `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    ['Tmp','User','10000000','TMP01',0,email,'demo','cliente']
  );
  return rows[0];
}

module.exports = {
  app,
  getPool,
  login,
  loginAsSuperadmin,
  loginAsCliente,
  createTempPackage,
  createTempUser,
};


