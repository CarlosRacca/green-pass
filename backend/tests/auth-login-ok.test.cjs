const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { Pool } = require('pg');
const app = require('../server.js').default || require('../server.js');

test('POST /api/auth/login with temporary user should succeed', async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  const email = `test_${Date.now()}@greenpass.com`;

  try {
    await pool.query(
      `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      ['Test','User','12345678','A123',10,email,'demo','cliente']
    );

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'demo' })
      .set('Content-Type', 'application/json');

    assert.equal(res.status, 200);
    assert.ok(res.body?.token);
    assert.ok(res.body?.user?.id);
  } finally {
    await pool.query('DELETE FROM users WHERE email = $1', [email]);
    await pool.end();
  }
});


