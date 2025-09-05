import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminVerTorneos = () => {
  const [torneos, setTorneos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/torneos`)
      .then((res) => res.json())
      .then((data) => setTorneos(data))
      .catch((err) => console.error("Error al cargar torneos:", err));
  }, [API_URL]);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">🏆 Torneos creados</h2>
      {torneos.length === 0 ? (
        <p className="text-center">No hay torneos aún.</p>
      ) : (
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-success">
            <tr>
              <th>Nombre</th>
              <th>Cliente</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {torneos.map((t) => (
              <tr key={t.id}>
                <td>{t.nombre}</td>
                <td>{t.cliente_id}</td>
                <td>{new Date(t.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(t.fecha_fin).toLocaleDateString()}</td>
                <td>
                  {t.finalizado ? (
                    <span className="badge bg-secondary">Finalizado</span>
                  ) : (
                    <span className="badge bg-success">Activo</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/admin/torneos/${t.id}`)}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminVerTorneos;
