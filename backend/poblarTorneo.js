// poblarTorneo.js
import pool from './database.js';
import { calcularPuntosParaPareja } from './calcularPuntos.js';


const usuarios = [
  { nombre: "Carlos", apellido: "Racca", dni: "11111111", matricula: "A001", handicap: 10, email: "carlos@greenpass.com", password: "123456" },
  { nombre: "Juan", apellido: "Pérez", dni: "22222222", matricula: "A002", handicap: 12, email: "juan@greenpass.com", password: "123456" },
  { nombre: "Ana", apellido: "López", dni: "33333333", matricula: "A003", handicap: 15, email: "ana@greenpass.com", password: "123456" },
  { nombre: "Pedro", apellido: "Martínez", dni: "44444444", matricula: "A004", handicap: 8, email: "pedro@greenpass.com", password: "123456" },
  { nombre: "Lucía", apellido: "González", dni: "55555555", matricula: "A005", handicap: 11, email: "lucia@greenpass.com", password: "123456" },
  { nombre: "Diego", apellido: "Ramírez", dni: "66666666", matricula: "A006", handicap: 9, email: "diego@greenpass.com", password: "123456" },
  { nombre: "Valentina", apellido: "Suárez", dni: "77777777", matricula: "A007", handicap: 13, email: "valentina@greenpass.com", password: "123456" },
  { nombre: "Martín", apellido: "Gutiérrez", dni: "88888888", matricula: "A008", handicap: 14, email: "martin@greenpass.com", password: "123456" },
];

const insertarDatos = async () => {
  try {
    // Crear o reutilizar admin
    let cliente_id;
    const adminCheck = await pool.query(`SELECT id FROM users WHERE email = 'admin@greenpass.com'`);
    if (adminCheck.rows.length > 0) {
      cliente_id = adminCheck.rows[0].id;
      console.log("Admin ya existe con ID:", cliente_id);
    } else {
      const cliente = await pool.query(
        `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, cliente_id)
         VALUES ('Green', 'Admin', '99999998', 'CLI001', 0, 'admin@greenpass.com', 'adminpass', NULL)
         RETURNING id`
      );
      cliente_id = cliente.rows[0].id;
      console.log("Admin creado con ID:", cliente_id);
    }

    // Crear usuarios o reutilizar existentes
    const userIds = [];
    for (let user of usuarios) {
      const existing = await pool.query(
        `SELECT id FROM users WHERE email = $1 OR dni = $2`,
        [user.email, user.dni]
      );

      if (existing.rows.length > 0) {
        console.log(`Usuario ya existente: ${user.email} - id: ${existing.rows[0].id}`);
        userIds.push(existing.rows[0].id);
      } else {
        const res = await pool.query(
          `INSERT INTO users (nombre, apellido, dni, matricula, handicap, email, password, cliente_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
          [user.nombre, user.apellido, user.dni, user.matricula, user.handicap, user.email, user.password, cliente_id]
        );
        userIds.push(res.rows[0].id);
      }
    }

    // Crear torneo
    const torneoRes = await pool.query(
      `INSERT INTO torneos (nombre, cliente_id, fecha_inicio, fecha_fin)
       VALUES ('Torneo Simulado Green Pass', $1, '2025-06-01', '2025-06-03') RETURNING id`,
      [cliente_id]
    );
    const torneoId = torneoRes.rows[0].id;

    // Crear días
    const dias = [];
    for (let i = 0; i < 3; i++) {
      const dia = await pool.query(
        `INSERT INTO torneo_dias (torneo_id, fecha, modalidad) VALUES ($1, $2, 'fourball') RETURNING id`,
        [torneoId, `2025-06-0${i + 1}`]
      );
      dias.push(dia.rows[0].id);
    }

    // Asignar jugadores
    for (let userId of userIds) {
      await pool.query(`INSERT INTO torneo_jugadores (torneo_id, user_id) VALUES ($1, $2)`, [torneoId, userId]);
    }

    // Crear parejas
    const parejas = [
      [userIds[0], userIds[1]],
      [userIds[2], userIds[3]],
      [userIds[4], userIds[5]],
      [userIds[6], userIds[7]]
    ];

    for (let diaId of dias) {
      for (let pareja of parejas) {
        await pool.query(
          `INSERT INTO torneo_parejas (dia_id, jugador_1_id, jugador_2_id) VALUES ($1, $2, $3)`,
          [diaId, pareja[0], pareja[1]]
        );
      }
    }

    // Scores simulados
    const hoyos = Array.from({ length: 18 }, (_, i) => i + 1);
    for (let diaId of dias) {
      for (let pareja of parejas) {
        for (let jugadorId of pareja) {
          for (let hoyo of hoyos) {
            const score = Math.floor(Math.random() * 3) + 3;
            const long_drive = hoyo === 9 ? Math.random() < 0.5 : false;
            const mejor_approach = hoyo === 17 ? Math.random() < 0.5 : false;
            await pool.query(
              `INSERT INTO torneo_scores (torneo_id, dia_id, jugador_id, hoyo, score, long_drive, mejor_approach)
               VALUES ($1, $2, $3, $4, $5, $6, $7)`,
              [torneoId, diaId, jugadorId, hoyo, score, long_drive, mejor_approach]
            );
          }
        }
      }
    }

    for (let diaId of dias) {
        const parejasDia = await pool.query(
          `SELECT id FROM torneo_parejas WHERE dia_id = $1`,
          [diaId]
        );
      
        for (let pareja of parejasDia.rows) {
          await calcularPuntosParaPareja(diaId, pareja.id);
        }
      }
      

    console.log("✅ Torneo simulado cargado correctamente.");
    process.exit();
  } catch (err) {
    console.error("❌ Error al poblar torneo:", err);
    process.exit(1);
  }
};

insertarDatos();
