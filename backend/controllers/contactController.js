const pool = require('../models/db');

const submitContact = async (req, res) => {
  const { nombre, apellido, email, telefono, matricula } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contactos (nombre, apellido, email, telefono, matricula) VALUES ($1, $2, $3, $4, $5)',
      [nombre, apellido, email, telefono, matricula]
    );

    res.status(200).json({ message: 'Contacto guardado correctamente.' });
  } catch (error) {
    console.error('Error al guardar contacto:', error);
    res.status(500).json({ error: 'Error al guardar los datos.' });
  }
};

module.exports = { submitContact };
