import React, { useState } from "react";
import { motion } from "framer-motion";

function Footer() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    matricula: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setMensaje("Formulario enviado correctamente ✅");
        setForm({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          matricula: ""
        });
      } else {
        setMensaje("Hubo un error al enviar 😕");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error de conexión con el servidor ❌");
    }
  };

  return (
    <footer id="contact" className="bg-dark text-white text-center py-5">
      <div className="container" style={{ maxWidth: 720 }}>
        <p className="mb-4">&copy; {new Date().getFullYear()} Green Pass. Todos los derechos reservados.</p>

        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalContacto">
            Solicitar información
          </button>
        </div>

        {/* Modal Contacto funcional */}
        <div className="modal fade" id="modalContacto" tabIndex="-1" aria-labelledby="modalContactoLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-light text-dark">
              <div className="modal-header">
                <h5 className="modal-title" id="modalContactoLabel">Solicitar información</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <motion.form
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                >
                  <div className="row g-3 text-start">
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input type="text" className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="apellido" className="form-label">Apellido</label>
                      <input type="text" className="form-control" id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Correo electrónico</label>
                      <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="telefono" className="form-label">Teléfono</label>
                      <input type="tel" className="form-control" id="telefono" name="telefono" value={form.telefono} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="matricula" className="form-label">Matrícula de golf</label>
                      <input type="text" className="form-control" id="matricula" name="matricula" value={form.matricula} onChange={handleChange} required />
                    </div>
                  </div>

                  {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

                  <div className="d-grid d-md-flex justify-content-md-end mt-3">
                    <button type="submit" className="btn btn-success">Enviar</button>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
