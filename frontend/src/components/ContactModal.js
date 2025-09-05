import React, { useState } from 'react';
import api from '../api/client';

const ContactModal = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    matricula: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEnviando(true);
    try {
      const { data } = await api.post('/contact', form);
      if (data?.success) {
        setMensaje('Formulario enviado correctamente ✅');
        setForm({ nombre: '', apellido: '', email: '', telefono: '', matricula: '' });
      } else {
        setMensaje('Hubo un error al enviar 😕');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error de conexión con el servidor ❌');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#contactModal"
      >
        Solicitar información
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="contactModalLabel">Formulario de Contacto</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">

                {mensaje && (
                  <div className="alert alert-info">{mensaje}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="form-control"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Matrícula de golf</label>
                  <input
                    type="text"
                    name="matricula"
                    className="form-control"
                    value={form.matricula}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success" disabled={enviando}>
                  {enviando ? 'Enviando…' : 'Enviar'}
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
