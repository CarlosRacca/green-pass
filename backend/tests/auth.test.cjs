const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server.js').default || require('../server.js');

test('POST /api/auth/login should fail with wrong creds', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'nouser@example.com', password: 'bad' })
    .set('Content-Type', 'application/json');
  assert.ok([400,401].includes(res.status));
});


