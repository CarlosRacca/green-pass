const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server.js').default || require('../server.js');

test('GET /api/ping should return 200', async () => {
  const res = await request(app).get('/api/ping');
  assert.equal(res.status, 200);
});

test('GET /healthz should return 200', async () => {
  const res = await request(app).get('/healthz');
  assert.equal(res.status, 200);
});


