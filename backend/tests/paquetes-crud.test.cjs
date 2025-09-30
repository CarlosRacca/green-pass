const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { getPool, app } = require('./helpers.cjs');

test('CRUD /api/paquetes', async () => {
  const pool = getPool();

  // Create
  const createRes = await request(app)
    .post('/api/paquetes')
    .send({ nombre: 'Pack CRUD', destino: 'Destino', precio: 500, descripcion: 'Desc', puntos: 100, duracion: '5 días' });
  assert.equal(createRes.status, 201, JSON.stringify(createRes.body));
  const id = createRes.body.id;

  // List
  const listRes = await request(app).get('/api/paquetes');
  assert.equal(listRes.status, 200);

  // Get by id
  const getRes = await request(app).get(`/api/paquetes/${id}`);
  assert.equal(getRes.status, 200);

  // Update
  const updRes = await request(app)
    .put(`/api/paquetes/${id}`)
    .send({ nombre: 'Pack Edit', destino: 'D2', precio: 600, descripcion: 'D', puntos: 200, duracion: '6 días' });
  assert.equal(updRes.status, 200);

  // Delete
  const delRes = await request(app).delete(`/api/paquetes/${id}`);
  assert.equal(delRes.status, 200);

  await pool.end();
});


