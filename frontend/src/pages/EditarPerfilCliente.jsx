import React, { useState, useEffect } from "react";
import api from "../api/client";

const EditarPerfilCliente = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
    handicap: "",
    email: "",
    password: "",
    paquete_id: "",
  });
  const [paquetes, setPaquetes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${storedUser.id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario", error);
      }
    };

    const fetchPaquetes = async () => {
      try {
        const res = await api.get("/paquetes");
        setPaquetes(res.data);
      } catch (error) {
        console.error("Error al obtener paquetes", error);
      }
    };

    fetchUser();
    fetchPaquetes();
  }, [storedUser.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOkMsg("");
    setSaving(true);
    try {
      await api.put(`/users/${storedUser.id}`, formData);
      setOkMsg("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
      setErrorMsg("Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="p-4 shadow rounded bg-white" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4">Editar mi perfil</h2>

        <form onSubmit={handleSubmit}>
          {[
            ["nombre", "Nombre"],
            ["apellido", "Apellido"],
            ["dni", "DNI"],
            ["matricula", "Matrícula"],
            ["handicap", "Handicap"],
            ["email", "Email"],
            ["password", "Contraseña"],
          ].map(([field, label]) => (
            <div className="mb-3" key={field}>
              <label className="form-label fw-semibold">{label}</label>
              <input
                type={field === "password" ? "password" : "text"}
                className="form-control rounded-pill px-4 py-2"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                required={field !== "password"}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="form-label fw-semibold">Paquete contratado (opcional)</label>
            <select
              className="form-select rounded-pill px-4 py-2"
              name="paquete_id"
              value={formData.paquete_id || ""}
              onChange={handleChange}
            >
              <option value="">Seleccionar paquete</option>
              {paquetes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {okMsg && <div className="alert alert-success">{okMsg}</div>}

          <div className="text-center mt-3 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => window.history.back()}
            >
              ← Volver
            </button>

            <button
              type="submit"
              className="btn btn-success rounded-pill px-5 py-2 fs-5"
              disabled={saving}
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfilCliente;
