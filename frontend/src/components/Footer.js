import React, { useState } from "react";

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
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Green Pass. Todos los derechos reservados.</p>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modalQuienesSomos">
            ¿Quiénes somos?
          </button>

          <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalContacto">
            Solicitar información
          </button>
        </div>
      </div>

      {/* Modal ¿Quiénes somos? */}
      <div className="modal fade" id="modalQuienesSomos" tabIndex="-1" aria-labelledby="modalQuienesSomosLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-light text-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="modalQuienesSomosLabel">¿Quiénes somos?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p>
                Green Pass es una empresa argentina especializada en experiencias de golf. Combinamos golf, turismo y gastronomía
                en destinos exclusivos como Llao Llao, Chapelco y El Terrón. Nuestra misión es brindarte una experiencia inolvidable.
              </p>
            </div>
          </div>
        </div>
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="matricula" className="form-label">Matrícula de golf</label>
                  <input
                    type="text"
                    className="form-control"
                    id="matricula"
                    name="matricula"
                    value={form.matricula}
                    onChange={handleChange}
                    required
                  />
                </div>

                {mensaje && <div className="alert alert-info">{mensaje}</div>}

                <button type="submit" className="btn btn-success">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
