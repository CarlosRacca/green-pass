import React, { useState, useEffect } from "react";

const AdminCrearUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
    handicap: "",
    email: "",
    password: "",
    cliente_id: "",
    paquete_id: "",
    role: "cliente",
  });

  const [paquetes, setPaquetes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (form.role === "cliente") {
      fetch(`${API_URL}/api/paquetes`)
        .then((res) => res.json())
        .then((data) => setPaquetes(data))
        .catch((err) => console.error("Error al cargar paquetes:", err));
    }
  }, [form.role]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...form,
      handicap: parseInt(form.handicap) || 0,
      cliente_id: form.cliente_id || null,
      paquete_id:
        form.role === "cliente" && form.paquete_id
          ? parseInt(form.paquete_id)
          : null,
    };

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Usuario creado correctamente");
        setForm({
          nombre: "",
          apellido: "",
          dni: "",
          matricula: "",
          handicap: "",
          email: "",
          password: "",
          cliente_id: "",
          paquete_id: "",
          role: "cliente",
        });
      } else {
        setMensaje("❌ " + (data.error || "Error al crear usuario"));
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="container mt-5 mb-5 text-center">
      <h2 className="mb-4">
        <span role="img" aria-label="icon">👤</span> Crear Usuario
      </h2>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="form-control"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              className="form-control"
              value={form.dni}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="matricula"
              placeholder="Matrícula"
              className="form-control"
              value={form.matricula}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="handicap"
              placeholder="Handicap"
              className="form-control"
              value={form.handicap}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="cliente_id"
              placeholder="ID de cliente (opcional)"
              className="form-control"
              value={form.cliente_id}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3 d-flex justify-content-center gap-4">
          <div className="form-check">
            <input
              type="radio"
              name="role"
              value="cliente"
              checked={form.role === "cliente"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Cliente</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="role"
              value="superadmin"
              checked={form.role === "superadmin"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Superadmin</label>
          </div>
        </div>

        {form.role === "cliente" && (
          <div className="mb-3">
            <select
              name="paquete_id"
              value={form.paquete_id}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Seleccionar paquete (opcional)</option>
              {paquetes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - {p.puntos} pts
                </option>
              ))}
            </select>
          </div>
        )}

        {mensaje && <p className="text-success mb-3 fw-bold">{mensaje}</p>}

        <button type="submit" className="btn btn-success w-100 py-2">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default AdminCrearUsuario;
