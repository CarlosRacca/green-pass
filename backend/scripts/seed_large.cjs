/* Seed de dataset grande para pruebas de rendimiento */
/* Ejecuta: npm run seed:large */

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

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

async function ensureUser(user) {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [user.email]);
  if (existing.rows.length > 0) return existing.rows[0].id;
  const hashed = await bcrypt.hash(user.password || '123456', 10);
  const insert = await pool.query(
    `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, role)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [user.nombre, user.apellido, user.dni || null, user.matricula || null, user.handicap || 0, user.email, hashed, user.role || 'cliente']
  );
  return insert.rows[0].id;
}

async function insertPaquete(p) {
  const colsRes = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='paquetes'`);
  const cols = colsRes.rows.map(r => r.column_name);
  const existing = await pool.query('SELECT id FROM paquetes WHERE nombre = $1 LIMIT 1', [p.nombre]);
  if (existing.rows.length > 0) return existing.rows[0].id;
  const data = {
    nombre: p.nombre,
    descripcion: p.descripcion || '',
    destino: p.destino || '',
    precio: p.precio || 0,
    puntos: p.puntos || 0,
    duracion: p.duracion || null,
    imagen_url: p.imagen_url || null,
    activo: p.activo ?? true,
  };
  const available = [];
  const values = [];
  for (const k of Object.keys(data)) {
    if (cols.includes(k)) { available.push(k); values.push(data[k]); }
  }
  const params = values.map((_, i) => `$${i + 1}`).join(',');
  const insert = await pool.query(`INSERT INTO paquetes (${available.join(',')}) VALUES (${params}) RETURNING id`, values);
  return insert.rows[0].id;
}

async function main() {
  console.log('🌱 Seed LARGE iniciando...');
  try {
    await pool.query('BEGIN');

    // superadmin base si no existe
    const superId = await ensureUser({ nombre: 'Admin', apellido: 'GP', email: 'admin@greenpass.com', password: 'admin123', role: 'superadmin', dni: '99999999', matricula: 'SUPER01', handicap: 0 });

    // 50 usuarios clientes
    const userIds = [];
    for (let i = 1; i <= 50; i++) {
      const id = await ensureUser({
        nombre: `Cliente${i}`,
        apellido: `Demo${i}`,
        email: `cliente${i}@greenpass.com`,
        password: '123456',
        role: 'cliente',
        dni: String(40000000 + i),
        matricula: `C${String(i).padStart(4,'0')}`,
        handicap: Math.floor(Math.random() * 20),
      });
      userIds.push(id);
    }

    // 12 paquetes
    const destinos = ['Bariloche','San Martín de los Andes','Córdoba','Tandil','Mendoza','Salta','Iguazú','Neuquén','Mar del Plata','Rosario','Chascomús','Pinamar'];
    const paqueteIds = [];
    for (let i = 0; i < 12; i++) {
      const pid = await insertPaquete({
        nombre: `Paquete ${i+1} - ${destinos[i]}`,
        destino: destinos[i],
        precio: 900 + i * 120,
        puntos: 100 + i * 10,
        duracion: `${3 + (i%4)} días / ${2 + (i%3)} noches`,
        descripcion: `Experiencia de golf en ${destinos[i]}`,
      });
      paqueteIds.push(pid);
    }

    // Relaciones usuarios_paquetes (3 paquetes por usuario)
    if (await tableExists('usuarios_paquetes')) {
      for (const uId of userIds) {
        for (let k = 0; k < 3; k++) {
          const pId = paqueteIds[(uId + k) % paqueteIds.length];
          await pool.query(`INSERT INTO usuarios_paquetes (user_id, paquete_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`, [uId, pId]);
        }
      }
    }

    // Viajes (si existe tabla)
    if (await tableExists('viajes')) {
      for (const uId of userIds) {
        const pId = paqueteIds[uId % paqueteIds.length];
        const daysAgo = Math.floor(Math.random() * 60) + 1; // 1-60 días atrás
        await pool.query(
          `INSERT INTO viajes (user_id, paquete_id, fecha_reserva, estado, puntos_otorgados)
           VALUES ($1,$2, NOW() - ($5::int) * INTERVAL '1 day', $3, $4)`,
          [uId, pId, Math.random() < 0.7 ? 'confirmado' : 'pendiente', Math.floor(Math.random() * 300), daysAgo]
        );
      }
    }

    // Consultas (100)
    for (let i = 0; i < 100; i++) {
      const packName = `Paquete ${((i % paqueteIds.length) + 1)} - ${destinos[i % destinos.length]}`;
      const hoursAgo = Math.floor(Math.random() * 240);
      await pool.query(
        `INSERT INTO consultas (paquete, cantidad, ultima_consulta) VALUES ($1,$2, NOW() - ($3::int) * INTERVAL '1 hour')`,
        [packName, (i % 4) + 1, hoursAgo]
      );
    }

    // Contacts (50, adaptativo)
    if (await tableExists('contacts')) {
      const colsRes = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='contacts'`);
      const ccols = colsRes.rows.map(r => r.column_name);
      for (let i = 1; i <= 50; i++) {
        const data = {
          nombre: `Contacto${i}`,
          apellido: `Demo${i}`,
          email: `contacto${i}@example.com`,
          telefono: `11${String(10000000 + i)}`,
          matricula: `M${String(i).padStart(4,'0')}`,
          fecha: new Date().toISOString(),
        };
        const available = [];
        const values = [];
        for (const k of Object.keys(data)) { if (ccols.includes(k)) { available.push(k); values.push(data[k]); } }
        if (available.length === 0) continue;
        const params = values.map((_, j) => `$${j + 1}`).join(',');
        await pool.query(`INSERT INTO contacts (${available.join(',')}) VALUES (${params})`, values);
      }
    }

    await pool.query('COMMIT');
    console.log('✅ Seed LARGE finalizado');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('❌ Error en seed LARGE:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();


