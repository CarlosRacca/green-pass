import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout.jsx";

const AdminCrearTorneo = () => {
  const [form, setForm] = useState({
    nombre: "",
    cliente_id: "",
    fecha_inicio: "",
    fecha_fin: ""
  });

  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, [API_URL]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/torneos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Torneo creado con éxito");
        setForm({ nombre: "", cliente_id: "", fecha_inicio: "", fecha_fin: "" });
      } else {
        setMensaje("❌ " + (data.error || "Error al crear torneo"));
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error de conexión");
    }
  };

  return (
    <AdminLayout title="📅 Crear Torneo" breadcrumbs={[{ label: "Torneos", to: "/admin/ver-torneos" }, { label: "Crear", active: true }]}>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del torneo"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="cliente_id"
            className="form-select"
            value={form.cliente_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar cliente</option>
            {usuarios
              .filter(u => u.role === "cliente")
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} {u.apellido} ({u.email})
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            className="form-control"
            value={form.fecha_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha fin</label>
          <input
            type="date"
            name="fecha_fin"
            className="form-control"
            value={form.fecha_fin}
            onChange={handleChange}
            required
          />
        </div>

        {mensaje && <p className="text-success fw-bold">{mensaje}</p>}

        <button type="submit" className="btn btn-success w-100">
          Crear Torneo
        </button>
      </form>
    </AdminLayout>
  );
};

export default AdminCrearTorneo;
