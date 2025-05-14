import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Rutas
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong!' });
});

// Usar las rutas del formulario de contacto
app.use('/api/contact', contactRoutes);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('Datos recibidos:', { name, email, message });

    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    console.log('Resultado DB:', result.rows[0]);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('❌ ERROR INTERNO:', error);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
