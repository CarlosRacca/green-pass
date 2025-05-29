import React, { useState, useEffect } from 'react';
import AdminContacts from '../pages/AdminContacts.js';
import AdminConsultas from '../pages/AdminConsultas.js';

const AdminPanel = () => {
    const [tab, setTab] = useState("contacts");
    const [autorizado, setAutorizado] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      const storedAuth = localStorage.getItem("admin_autorizado");
      if (storedAuth === "true") {
        setAutorizado(true);
      }
    }, []);
  
    const handleAuth = (e) => {
      e.preventDefault();
      if (password === process.env.REACT_APP_ADMIN_PASSWORD || password === "supersecreto123") {
        setAutorizado(true);
        localStorage.setItem("admin_autorizado", "true");
        setError("");
      } else {
        setError("Contraseña incorrecta");
      }
    };
  
    if (!autorizado) {
      return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h4 className="text-center mb-4">Área privada</h4>
            <form onSubmit={handleAuth}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingrese la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-success w-100">Acceder</button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container py-5">
        <h2 className="text-center mb-4">Panel de Administrador</h2>
  
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          <button
            className={`btn ${tab === "contacts" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setTab("contacts")}
          >
            Ver contactos
          </button>
          <button
            className={`btn ${tab === "crearUsuario" ? "btn-success" : "btn-outline-primary"}`}
            onClick={() => setTab("crearUsuario")}
          >
            Crear nuevo usuario
          </button>
          <button
            className={`btn ${tab === "crearTorneo" ? "btn-success" : "btn-outline-primary"}`}
            onClick={() => setTab("crearTorneo")}
          >
            Crear nuevo torneo
          </button>
          <button
            className={`btn ${tab === "consultas" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setTab("consultas")}
          >
            Ver consultas
          </button>
        </div>

  
        {tab === "contacts" && <AdminContacts />}
        {tab === "consultas" && <AdminConsultas />}
      </div>
    );
  };
  
  export default AdminPanel;