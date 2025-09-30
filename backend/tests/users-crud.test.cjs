const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { getPool, app, loginAsSuperadmin } = require('./helpers.cjs');

test('CRUD /api/users', async () => {
  const { token } = await loginAsSuperadmin();
  const email = `crud_${Date.now()}@greenpass.com`;

  // Create
  const createRes = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({ nombre: 'Crud', apellido: 'User', email, password: '12345', role: 'cliente', cliente_id: 999 });
  assert.equal(createRes.status, 201, JSON.stringify(createRes.body));
  const id = createRes.body.id;

  // Get by id (self requires token of that user, but superadmin can fetch by id)
  const getRes = await request(app)
    .get(`/api/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
  assert.equal(getRes.status, 200);

  // Update
  const updateRes = await request(app)
    .put(`/api/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ nombre: 'Editado', handicap: 12 });
  assert.equal(updateRes.status, 200);
  assert.equal(updateRes.body.nombre, 'Editado');

  // Delete
  const delRes = await request(app)
    .delete(`/api/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
  assert.equal(delRes.status, 200);
});


