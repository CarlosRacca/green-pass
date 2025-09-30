/* Seed completo de datos relacionados para entorno local */
/* Ejecuta: npm run seed:full */

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Cargar .env y luego .env.local si existe (override)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const localEnvPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath, override: true });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function tableExists(tableName) {
  const { rows } = await pool.query(
    `SELECT EXISTS (
       SELECT 1 FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name = $1
     ) AS exists`,
    [tableName]
  );
  return rows[0]?.exists === true;
}

async function getUserIdByEmail(email) {
  const res = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
  return res.rows[0]?.id || null;
}

async function ensureUser(user) {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [user.email]);
  if (existing.rows.length > 0) return existing.rows[0].id;
  const hashed = user.password?.startsWith('$2') ? user.password : await bcrypt.hash(user.password || '123456', 10);
  const insert = await pool.query(
    `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING id`,
    [user.nombre, user.apellido, user.dni || null, user.matricula || null, user.handicap || 0, user.email, hashed, user.role || 'cliente']
  );
  return insert.rows[0].id;
}

async function ensurePaquete(p) {
  // Buscar por nombre para evitar duplicados en seeds repetibles
  const existing = await pool.query('SELECT id FROM paquetes WHERE nombre = $1 LIMIT 1', [p.nombre]);
  if (existing.rows.length > 0) return existing.rows[0].id;

  // Detectar columnas disponibles
  const colsRes = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='paquetes'`
  );
  const cols = colsRes.rows.map(r => r.column_name);

  const available = [];
  const values = [];

  function push(col, val) {
    if (cols.includes(col)) {
      available.push(col);
      values.push(val);
    }
  }

  push('nombre', p.nombre);
  push('descripcion', p.descripcion || '');
  push('destino', p.destino || '');
  push('precio', p.precio || 0);
  push('puntos', p.puntos || 0);
  push('duracion', p.duracion || null);
  push('imagen_url', p.imagen_url || null);
  push('activo', p.activo ?? true);

  const params = values.map((_, i) => `$${i + 1}`).join(',');
  const insert = await pool.query(
    `INSERT INTO paquetes (${available.join(',')}) VALUES (${params}) RETURNING id`,
    values
  );
  return insert.rows[0].id;
}

async function ensureUsuarioPaquete(userId, paqueteId) {
  const existing = await pool.query(
    'SELECT id FROM usuarios_paquetes WHERE user_id = $1 AND paquete_id = $2 LIMIT 1',
    [userId, paqueteId]
  );
  if (existing.rows.length > 0) return existing.rows[0].id;
  const insert = await pool.query(
    `INSERT INTO usuarios_paquetes (user_id, paquete_id)
     VALUES ($1,$2) RETURNING id`,
    [userId, paqueteId]
  );
  return insert.rows[0].id;
}

async function ensureTorneo({ nombre, cliente_id, fecha_inicio, fecha_fin }) {
  const existing = await pool.query('SELECT id FROM torneos WHERE nombre = $1 LIMIT 1', [nombre]);
  if (existing.rows.length > 0) return existing.rows[0].id;
  const insert = await pool.query(
    `INSERT INTO torneos (nombre, cliente_id, fecha_inicio, fecha_fin, finalizado)
     VALUES ($1,$2,$3,$4,false) RETURNING id`,
    [nombre, cliente_id, fecha_inicio, fecha_fin]
  );
  return insert.rows[0].id;
}

async function ensureTorneoDia(torneoId, fecha, modalidad = 'fourball') {
  const existing = await pool.query(
    'SELECT id FROM torneo_dias WHERE torneo_id = $1 AND fecha = $2 LIMIT 1',
    [torneoId, fecha]
  );
  if (existing.rows.length > 0) return existing.rows[0].id;
  const insert = await pool.query(
    `INSERT INTO torneo_dias (torneo_id, fecha, modalidad) VALUES ($1,$2,$3) RETURNING id`,
    [torneoId, fecha, modalidad]
  );
  return insert.rows[0].id;
}

async function ensureTorneoJugador(torneoId, userId) {
  const existing = await pool.query(
    'SELECT id FROM torneo_jugadores WHERE torneo_id = $1 AND user_id = $2 LIMIT 1',
    [torneoId, userId]
  );
  if (existing.rows.length > 0) return existing.rows[0].id;
  const insert = await pool.query(
    `INSERT INTO torneo_jugadores (torneo_id, user_id) VALUES ($1,$2) RETURNING id`,
    [torneoId, userId]
  );
  return insert.rows[0].id;
}

async function ensurePareja(diaId, j1, j2) {
  const existing = await pool.query(
    `SELECT id FROM torneo_parejas WHERE dia_id = $1 AND ((jugador_1_id = $2 AND jugador_2_id = $3) OR (jugador_1_id = $3 AND jugador_2_id = $2)) LIMIT 1`,
    [diaId, j1, j2]
  );
  if (existing.rows.length > 0) return existing.rows[0].id;
  const insert = await pool.query(
    `INSERT INTO torneo_parejas (dia_id, jugador_1_id, jugador_2_id) VALUES ($1,$2,$3) RETURNING id`,
    [diaId, j1, j2]
  );
  return insert.rows[0].id;
}

async function insertScoresForDay(diaId, torneoId, jugadorId) {
  const countRes = await pool.query(
    'SELECT COUNT(*)::int AS c FROM torneo_scores WHERE dia_id = $1 AND jugador_id = $2',
    [diaId, jugadorId]
  );
  if (countRes.rows[0].c >= 18) return; // ya tiene 18 hoyos
  for (let hoyo = 1; hoyo <= 18; hoyo++) {
    // scores realistas 3-6
    const score = Math.floor(Math.random() * 4) + 3;
    await pool.query(
      `INSERT INTO torneo_scores (torneo_id, dia_id, jugador_id, hoyo, score, long_drive, mejor_approach)
       VALUES ($1,$2,$3,$4,$5,false,false)`,
      [torneoId, diaId, jugadorId, hoyo, score]
    );
  }
}

async function insertResultadosForDay(diaId) {
  // Tomar parejas del día y asignar puntos aleatorios 1-5
  const parejas = await pool.query('SELECT id FROM torneo_parejas WHERE dia_id = $1', [diaId]);
  for (const p of parejas.rows) {
    const puntos = Math.floor(Math.random() * 5) + 1;
    const exists = await pool.query('SELECT 1 FROM torneo_resultados WHERE dia_id = $1 AND pareja_id = $2', [diaId, p.id]);
    if (exists.rows.length === 0) {
      await pool.query(
        `INSERT INTO torneo_resultados (dia_id, pareja_id, puntos) VALUES ($1,$2,$3)`,
        [diaId, p.id, puntos]
      );
    }
  }
}

async function insertPuntajesForDay(diaId, torneoId) {
  if (!(await tableExists('torneo_puntajes'))) return;
  const colRes = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='torneo_puntajes'`);
  const cols = colRes.rows.map(r => r.column_name);

  const parejas = await pool.query('SELECT id FROM torneo_parejas WHERE dia_id = $1', [diaId]);
  for (const p of parejas.rows) {
    const exists = await pool.query(
      'SELECT 1 FROM torneo_puntajes WHERE ' + (cols.includes('torneo_id') ? 'torneo_id = $1 AND ' : '') + 'dia_id = $2 AND pareja_id = $3 LIMIT 1',
      cols.includes('torneo_id') ? [torneoId, diaId, p.id] : [diaId, p.id]
    );
    if (exists.rows.length > 0) continue;

    const record = {
      torneo_id: torneoId,
      dia_id: diaId,
      pareja_id: p.id,
      puntos_match: Math.floor(Math.random() * 6),
      puntos_long_drive: Math.random() < 0.3 ? 2 : 0,
      puntos_mejor_approach: Math.random() < 0.3 ? 2 : 0,
      puntos_birdies_neto: Math.floor(Math.random() * 5),
      puntos_birdies_gross: Math.floor(Math.random() * 5),
      puntos_bogeys_neto: Math.floor(Math.random() * 5),
    };

    const available = [];
    const values = [];
    for (const key of Object.keys(record)) {
      if (cols.includes(key)) {
        available.push(key);
        values.push(record[key]);
      }
    }
    if (available.length === 0) continue;
    const params = values.map((_, i) => `$${i + 1}`).join(',');
    await pool.query(
      `INSERT INTO torneo_puntajes (${available.join(',')}) VALUES (${params})`,
      values
    );
  }
}

async function ensureConsulta({ paquete, cantidad }) {
  // Insert simple sin duplicar exacto por paquete+cantidad en la última hora
  const existing = await pool.query(
    `SELECT id FROM consultas WHERE paquete = $1 AND cantidad = $2 AND now() - ultima_consulta < interval '1 hour' LIMIT 1`,
    [paquete, cantidad]
  );
  if (existing.rows.length > 0) return existing.rows[0].id;
  const insert = await pool.query(
    `INSERT INTO consultas (paquete, cantidad, ultima_consulta) VALUES ($1,$2, now()) RETURNING id`,
    [paquete, cantidad]
  );
  return insert.rows[0].id;
}

async function ensureItinerario(clienteId, paqueteId) {
  const hasDias = await tableExists('itinerario_dias');
  const hasAct = await tableExists('itinerario_actividades');
  if (!hasDias || !hasAct) return;

  // Detectar columnas reales
  const diasColsRes = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='itinerario_dias'`
  );
  const diasCols = diasColsRes.rows.map(r => r.column_name);
  const personCol = diasCols.includes('cliente_id') ? 'cliente_id' : (diasCols.includes('user_id') ? 'user_id' : null);
  const paqueteCol = diasCols.includes('paquete_id') ? 'paquete_id' : null;
  const fechaCol = diasCols.includes('fecha') ? 'fecha' : null;
  if (!personCol || !paqueteCol || !fechaCol) return; // columnas incompatibles, omitir itinerario

  // Crear 3 días con 3 actividades cada uno si no existen
  const diasRes = await pool.query(
    `SELECT id FROM itinerario_dias WHERE ${personCol} = $1 AND ${paqueteCol} = $2 ORDER BY ${fechaCol}`,
    [clienteId, paqueteId]
  );
  const baseDate = new Date();
  const diasIds = [];
  if (diasRes.rows.length === 0) {
    for (let i = 0; i < 3; i++) {
      const fecha = new Date(baseDate);
      fecha.setDate(baseDate.getDate() + i + 1);
      const insertDia = await pool.query(
        `INSERT INTO itinerario_dias (${personCol}, ${paqueteCol}, ${fechaCol}) VALUES ($1,$2,$3) RETURNING id`,
        [clienteId, paqueteId, fecha.toISOString().slice(0, 10)]
      );
      diasIds.push(insertDia.rows[0].id);
    }
  } else {
    diasIds.push(...diasRes.rows.map(r => r.id));
  }

  // Actividades
  const actColsRes = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='itinerario_actividades'`
  );
  const actCols = actColsRes.rows.map(r => r.column_name);
  const colDia = actCols.includes('itinerario_dia_id') ? 'itinerario_dia_id' : null;
  const colHora = actCols.includes('hora') ? 'hora' : null;
  const colActividad = actCols.includes('actividad') ? 'actividad' : null;
  const colLugar = actCols.includes('lugar') ? 'lugar' : null;
  const colNotas = actCols.includes('notas') ? 'notas' : null;
  if (!colDia || !colHora || !colActividad) return; // columnas mínimas faltan

  for (const diaId of diasIds) {
    const countRes = await pool.query(`SELECT COUNT(*)::int AS c FROM itinerario_actividades WHERE ${colDia} = $1`, [diaId]);
    if (countRes.rows[0].c >= 3) continue;
    const actividades = [
      { hora: '09:00', actividad: 'Salida de golf', lugar: 'Hoyo 1', notas: 'Fourball' },
      { hora: '14:00', actividad: 'Almuerzo', lugar: 'Club House', notas: 'Menú del día' },
      { hora: '18:00', actividad: 'Spa & Relax', lugar: 'Hotel', notas: 'Recuperación' },
    ];
    for (const a of actividades) {
      const cols = [colDia, colHora, colActividad].concat(colLugar ? [colLugar] : []).concat(colNotas ? [colNotas] : []);
      const vals = [diaId, a.hora, a.actividad].concat(colLugar ? [a.lugar] : []).concat(colNotas ? [a.notas] : []);
      const params = vals.map((_, i) => `$${i + 1}`).join(',');
      await pool.query(
        `INSERT INTO itinerario_actividades (${cols.join(',')}) VALUES (${params})`,
        vals
      );
    }
  }
}

async function main() {
  console.log('🌱 Seed completo iniciando...');
  try {
    await pool.query('BEGIN');

    // Usuarios base
    const superadminId = await ensureUser({
      nombre: 'Admin', apellido: 'GP', email: 'admin@greenpass.com', password: 'admin123', role: 'superadmin',
      dni: '99999999', matricula: 'SUPER01', handicap: 0,
    });

    const userEmails = [
      { nombre: 'Carlos', apellido: 'Racca', email: 'carlos@greenpass.com', dni: '11111111', matricula: 'A001', handicap: 10 },
      { nombre: 'Juan', apellido: 'Pérez', email: 'juan@greenpass.com', dni: '22222222', matricula: 'A002', handicap: 12 },
      { nombre: 'Ana', apellido: 'López', email: 'ana@greenpass.com', dni: '33333333', matricula: 'A003', handicap: 15 },
      { nombre: 'Pedro', apellido: 'Martínez', email: 'pedro@greenpass.com', dni: '44444444', matricula: 'A004', handicap: 8 },
      { nombre: 'Lucía', apellido: 'González', email: 'lucia@greenpass.com', dni: '55555555', matricula: 'A005', handicap: 11 },
      { nombre: 'Diego', apellido: 'Ramírez', email: 'diego@greenpass.com', dni: '66666666', matricula: 'A006', handicap: 9 },
      { nombre: 'Valentina', apellido: 'Suárez', email: 'valentina@greenpass.com', dni: '77777777', matricula: 'A007', handicap: 13 },
      { nombre: 'Martín', apellido: 'Gutiérrez', email: 'martin@greenpass.com', dni: '88888888', matricula: 'A008', handicap: 14 },
    ];
    const userIds = [];
    for (const u of userEmails) {
      const id = await ensureUser({ ...u, password: '123456', role: 'cliente' });
      userIds.push(id);
    }

    // Paquetes
    const paquetes = [
      { nombre: 'Llao Llao Experience', destino: 'Bariloche', precio: 1500, puntos: 200, duracion: '4 días / 3 noches', descripcion: 'Golf, lujo y naturaleza' },
      { nombre: 'Chapelco Adventure', destino: 'San Martín de los Andes', precio: 1800, puntos: 220, duracion: '5 días / 4 noches', descripcion: 'Golf y aventura en la Patagonia' },
      { nombre: 'El Terrón Classic', destino: 'Córdoba', precio: 1200, puntos: 150, duracion: '3 días / 2 noches', descripcion: 'Clásico cordobés con golf' },
      { nombre: 'Tandil Golf Tour', destino: 'Tandil, Buenos Aires', precio: 980, puntos: 150, duracion: '3 días / 2 noches', descripcion: 'Torneo + alojamiento' },
    ];
    const paqueteIds = [];
    for (const p of paquetes) {
      paqueteIds.push(await ensurePaquete(p));
    }

    // Relación usuarios_paquetes
    for (let i = 0; i < userIds.length; i++) {
      const uId = userIds[i];
      // asignar dos paquetes por usuario, alternando
      const p1 = paqueteIds[i % paqueteIds.length];
      const p2 = paqueteIds[(i + 1) % paqueteIds.length];
      await ensureUsuarioPaquete(uId, p1);
      await ensureUsuarioPaquete(uId, p2);
    }

    // Consultas demo
    await ensureConsulta({ paquete: 'Chapelco Adventure', cantidad: 2 });
    await ensureConsulta({ paquete: 'Llao Llao Experience', cantidad: 3 });

    // Torneo completo
    const torneoId = await ensureTorneo({
      nombre: 'Torneo Apertura Green Pass',
      cliente_id: superadminId,
      fecha_inicio: '2025-06-01',
      fecha_fin: '2025-06-03',
    });
    // Días
    const dia1 = await ensureTorneoDia(torneoId, '2025-06-01');
    const dia2 = await ensureTorneoDia(torneoId, '2025-06-02');
    const dia3 = await ensureTorneoDia(torneoId, '2025-06-03');

    // Jugadores al torneo (usar 8 primeros)
    const jugadores = userIds.slice(0, 8);
    for (const j of jugadores) {
      await ensureTorneoJugador(torneoId, j);
    }

    // Parejas por día: [0-1], [2-3], [4-5], [6-7]
    const parejasIndex = [[0,1],[2,3],[4,5],[6,7]];
    const dias = [dia1, dia2, dia3];
    for (const d of dias) {
      const parejaIds = [];
      for (const [a,b] of parejasIndex) {
        const pid = await ensurePareja(d, jugadores[a], jugadores[b]);
        parejaIds.push(pid);
      }
      // Scores por jugador
      for (const j of jugadores) {
        await insertScoresForDay(d, torneoId, j);
      }
      // Resultados por pareja
      await insertResultadosForDay(d);
      // Puntajes por pareja/día
      await insertPuntajesForDay(d, torneoId);
    }

    // Itinerarios demo para primer usuario y primer paquete (si tablas existen)
    await ensureItinerario(userIds[0], paqueteIds[0]);

    // Viajes demo (si existe tabla viajes)
    if (await tableExists('viajes')) {
      // Insertar un viaje por usuario al primer paquete si no existe
      for (const uId of userIds) {
        const exists = await pool.query(
          `SELECT id FROM viajes WHERE user_id = $1 AND paquete_id = $2 LIMIT 1`,
          [uId, paqueteIds[0]]
        );
        if (exists.rows.length === 0) {
          await pool.query(
            `INSERT INTO viajes (user_id, paquete_id, fecha_reserva, estado, puntos_otorgados)
             VALUES ($1,$2, NOW(), 'confirmado', 100)`,
            [uId, paqueteIds[0]]
          );
        }
      }
    }

    // Contacts demo (inserción adaptativa a columnas)
    if (await tableExists('contacts')) {
      const colsRes = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='contacts'`);
      const ccols = colsRes.rows.map(r => r.column_name);
      const contacts = [
        { nombre: 'María', apellido: 'Sosa', email: 'maria.sosa@example.com', telefono: '1111-2222', matricula: 'MAT100' },
        { nombre: 'Ricardo', apellido: 'Paz', email: 'ricardo.paz@example.com', telefono: '3333-4444', matricula: 'MAT200' },
        { nombre: 'Elena', apellido: 'Mendez', email: 'elena.mendez@example.com', telefono: '5555-6666', matricula: 'MAT300' },
      ];
      for (const c of contacts) {
        const ex = await pool.query('SELECT id FROM contacts WHERE email = $1 LIMIT 1', [c.email]);
        if (ex.rows.length === 0) {
          const data = {
            nombre: c.nombre,
            apellido: c.apellido,
            email: c.email,
            telefono: c.telefono,
            matricula: c.matricula,
            fecha: new Date().toISOString(),
          };
          const available = [];
          const values = [];
          for (const k of Object.keys(data)) {
            if (ccols.includes(k)) {
              available.push(k);
              values.push(data[k]);
            }
          }
          const params = values.map((_, i) => `$${i + 1}`).join(',');
          await pool.query(
            `INSERT INTO contacts (${available.join(',')}) VALUES (${params})`,
            values
          );
        }
      }
    }

    await pool.query('COMMIT');
    console.log('✅ Seed completo finalizado');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('❌ Error en seed completo:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();


