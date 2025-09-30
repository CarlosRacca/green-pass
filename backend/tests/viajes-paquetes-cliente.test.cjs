const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { Pool } = require('pg');
const app = require('../server.js').default || require('../server.js');

async function loginCliente() {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'cliente@greenpass.com', password: 'cliente123' })
    .set('Content-Type', 'application/json');
  assert.equal(res.status, 200);
  return { token: res.body.token, user: res.body.user };
}

test('GET /api/viajes/cliente/:id devuelve viajes del cliente', async () => {
  const { token, user } = await loginCliente();
  const res = await request(app)
    .get(`/api/viajes/cliente/${user.id}`)
    .set('Authorization', `Bearer ${token}`);
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
});

test('GET /api/paquetes/cliente/:id devuelve paquetes asignados', async () => {
  const { token, user } = await loginCliente();
  const res = await request(app)
    .get(`/api/paquetes/cliente/${user.id}`)
    .set('Authorization', `Bearer ${token}`);
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
});


