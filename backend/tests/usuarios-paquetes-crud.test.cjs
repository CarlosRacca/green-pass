const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { getPool, app } = require('./helpers.cjs');

test('CRUD /api/usuarios-paquetes', async () => {
  const pool = getPool();
  // Crear user y paquete temporales
  const { rows: userRows } = await pool.query(
    `INSERT INTO users (nombre, apellido, email, password, role)
     VALUES ('UP','User','up_${Date.now()}@gp.com','demo','cliente') RETURNING id`);
  const userId = userRows[0].id;
  const { rows: packRows } = await pool.query(
    `INSERT INTO paquetes (nombre, destino, precio, descripcion)
     VALUES ('UP Pack','D',500,'D') RETURNING id`);
  const paqueteId = packRows[0].id;

  // Create
  const createRes = await request(app)
    .post('/api/usuarios-paquetes')
    .send({ user_id: userId, paquete_id: paqueteId, fecha_compra: '2025-10-01T00:00:00Z' });
  assert.equal(createRes.status, 201);
  const id = createRes.body.id;

  // List
  const listRes = await request(app).get('/api/usuarios-paquetes');
  assert.equal(listRes.status, 200);

  // Get by id
  const getRes = await request(app).get(`/api/usuarios-paquetes/${id}`);
  assert.equal(getRes.status, 200);

  // Update
  const updRes = await request(app)
    .put(`/api/usuarios-paquetes/${id}`)
    .send({ user_id: userId, paquete_id: paqueteId, fecha_compra: '2025-10-02T00:00:00Z' });
  assert.equal(updRes.status, 200);

  // Delete
  const delRes = await request(app).delete(`/api/usuarios-paquetes/${id}`);
  assert.equal(delRes.status, 200);

  await pool.query('DELETE FROM paquetes WHERE id=$1', [paqueteId]);
  await pool.query('DELETE FROM users WHERE id=$1', [userId]);
  await pool.end();
});


