const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app } = require('./helpers.cjs');

test('CRUD /api/contact', async () => {
  // Create
  const createRes = await request(app)
    .post('/api/contact')
    .send({ nombre: 'C', apellido: 'R', email: `c_${Date.now()}@gp.com`, telefono: '123', mensaje: 'Hola' });
  assert.equal(createRes.status, 201);
  const id = createRes.body.id;

  // List
  const listRes = await request(app).get('/api/contact');
  assert.equal(listRes.status, 200);

  // Get by id
  const getRes = await request(app).get(`/api/contact/${id}`);
  assert.equal(getRes.status, 200);

  // Update
  const updRes = await request(app)
    .put(`/api/contact/${id}`)
    .send({ nombre: 'Edit', apellido: 'R', email: `c_${Date.now()}@gp.com`, telefono: '1234', mensaje: 'Hola 2' });
  assert.equal(updRes.status, 200);

  // Delete
  const delRes = await request(app).delete(`/api/contact/${id}`);
  assert.equal(delRes.status, 200);
});


