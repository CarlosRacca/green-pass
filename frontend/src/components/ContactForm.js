import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    matricula: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setMensaje('Formulario enviado correctamente ✅');
        setForm({ nombre: '', apellido: '', email: '', telefono: '', matricula: '' });
      } else {
        setMensaje('Hubo un error al enviar 😕');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error de conexión con el servidor ❌');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Dejanos tus datos</h3>
      {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input type="text" name="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input type="text" name="apellido" className="form-control" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input type="email" name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input type="tel" name="telefono" className="form-control" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input type="text" name="matricula" className="form-control" placeholder="Matrícula" value={form.matricula} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
