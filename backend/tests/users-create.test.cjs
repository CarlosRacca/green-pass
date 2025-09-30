const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { Pool } = require('pg');
const app = require('../server.js').default || require('../server.js');

async function getSuperToken() {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'carlos@greenpass.com', password: '123456' })
    .set('Content-Type', 'application/json');
  assert.equal(res.status, 200);
  return res.body.token;
}

test('POST /api/users should accept extra fields and allow login', async () => {
  const token = await getSuperToken();
  const email = `autotest_${Date.now()}@greenpass.com`;

  const createRes = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      nombre: 'Auto',
      apellido: 'Test',
      email,
      password: '12345',
      role: 'cliente',
      cliente_id: 999,
      paquete_id: 1,
    });

  assert.equal(createRes.status, 201, JSON.stringify(createRes.body));

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email, password: '12345' })
    .set('Content-Type', 'application/json');

  assert.equal(loginRes.status, 200, JSON.stringify(loginRes.body));
  assert.ok(loginRes.body.token);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });
  await pool.query('DELETE FROM users WHERE email = $1', [email]);
  await pool.query('DELETE FROM usuarios WHERE email = $1', [email]);
  await pool.end();
});


