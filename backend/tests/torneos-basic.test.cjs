const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app } = require('./helpers.cjs');

test('GET /api/torneos lista correctamente', async () => {
  const res = await request(app).get('/api/torneos');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
});


