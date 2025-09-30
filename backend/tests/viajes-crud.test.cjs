const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { getPool, app, loginAsSuperadmin } = require('./helpers.cjs');

test('CRUD /api/viajes', async () => {
  const { token } = await loginAsSuperadmin();
  const pool = getPool();
  const { rows: userRows } = await pool.query(
    `INSERT INTO users (nombre, apellido, email, password, role)
     VALUES ('VIA','User','via_${Date.now()}@gp.com','demo','cliente') RETURNING id`);
  const userId = userRows[0].id;
  const { rows: packRows } = await pool.query(
    `INSERT INTO paquetes (nombre, destino, precio, descripcion)
     VALUES ('VIA Pack','D',500,'D') RETURNING id`);
  const paqueteId = packRows[0].id;

  // Create
  const createRes = await request(app)
    .post('/api/viajes')
    .set('Authorization', `Bearer ${token}`)
    .send({ user_id: userId, paquete_id: paqueteId, fecha_reserva: '2025-10-01', estado: 'pendiente', puntos_otorgados: 0 });
  assert.equal(createRes.status, 201, JSON.stringify(createRes.body));
  const id = createRes.body.id;

  // List
  const listRes = await request(app)
    .get('/api/viajes')
    .set('Authorization', `Bearer ${token}`);
  assert.equal(listRes.status, 200);

  // Get by id
  const getRes = await request(app)
    .get(`/api/viajes/${id}`)
    .set('Authorization', `Bearer ${token}`);
  assert.equal(getRes.status, 200);

  // Update
  const updRes = await request(app)
    .put(`/api/viajes/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ user_id: userId, paquete_id: paqueteId, fecha_reserva: '2025-10-02', estado: 'confirmado', puntos_otorgados: 20 });
  assert.equal(updRes.status, 200);

  // Delete
  const delRes = await request(app)
    .delete(`/api/viajes/${id}`)
    .set('Authorization', `Bearer ${token}`);
  assert.equal(delRes.status, 200);

  await pool.query('DELETE FROM paquetes WHERE id=$1', [paqueteId]);
  await pool.query('DELETE FROM users WHERE id=$1', [userId]);
  await pool.end();
});


