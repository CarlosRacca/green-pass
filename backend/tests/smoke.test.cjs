const request = require('supertest');
const http = require('http');

// Cargar app arrancando server.js en un servidor temporal
let server;

before(async () => {
  const createServer = () => new Promise((resolve) => {
    const srv = http.createServer(async (req, res) => {
      // Delegamos al servidor real
    });
    resolve(srv);
  });
  // En estos tests de smoke, golpeamos al servidor real en PORT (debe estar corriendo en dev/CI)
  // Alternativamente, se podría exportar app desde server.js; mantenerlo simple por ahora
});

describe('Smoke', () => {
  it('GET /api/ping should return 200', async () => {
    const res = await request(`http://localhost:${process.env.PORT || 5001}`).get('/api/ping');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  it('GET /healthz should return 200', async () => {
    const res = await request(`http://localhost:${process.env.PORT || 5001}`).get('/healthz');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });
});


