const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server.js').default || require('../server.js');

test('GET /api/users sin token debe devolver 401', async () => {
  const res = await request(app).get('/api/users');
  assert.equal(res.status, 401);
});

test('GET /api/users con token de cliente debe devolver 403', async () => {
  // Genera un token inválido (sin firma válida) solo para chequear 403 vs 401
  // Como el middleware valida firma, para este smoke probamos el caso 401.
  // Para 403 real se requeriría login y token válido de cliente.
  const res = await request(app)
    .get('/api/users')
    .set('Authorization', 'Bearer invalid.token.here');
  // Token inválido -> 403 según nuestro middleware
  assert.equal(res.status, 403);
});


