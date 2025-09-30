const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app } = require('./helpers.cjs');

test('CRUD /api/consultas', async () => {
  // Create
  const createRes = await request(app)
    .post('/api/consultas')
    .send({ paquete: 'Test', cantidad: 2, ultima_consulta: new Date().toISOString() });
  assert.equal(createRes.status, 201);
  const id = createRes.body.id;

  // List
  const listRes = await request(app).get('/api/consultas');
  assert.equal(listRes.status, 200);

  // Get by id
  const getRes = await request(app).get(`/api/consultas/${id}`);
  assert.equal(getRes.status, 200);

  // Update
  const updRes = await request(app)
    .put(`/api/consultas/${id}`)
    .send({ paquete: 'Edit', cantidad: 3, ultima_consulta: new Date().toISOString() });
  assert.equal(updRes.status, 200);

  // Delete
  const delRes = await request(app).delete(`/api/consultas/${id}`);
  assert.equal(delRes.status, 200);
});


