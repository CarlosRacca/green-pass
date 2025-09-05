import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const MiViaje = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored?.id) {
      setLoading(false);
      return;
    }
    const fetchViajes = async () => {
      try {
        const { data } = await api.get(`/viajes/cliente/${stored.id}`);
        setViajes(data || []);
      } catch (e) {
        console.error("Error cargando viajes", e);
      } finally {
        setLoading(false);
      }
    };
    fetchViajes();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </div>
        <div className="placeholder-glow mt-3">
          <span className="placeholder col-12"></span>
          <span className="placeholder col-10"></span>
        </div>
      </div>
    );
  }

  if (viajes.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="mb-3">Aún no tenés un viaje asignado.</h4>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/cliente/panel")}>
          Volver al panel
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-success">🧳 Mis viajes</h2>
      <div className="row g-3">
        {viajes.map((v) => (
          <div key={v.id} className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-1">{v.paquete_nombre || `Viaje #${v.id}`}</h5>
                <p className="text-muted mb-2">
                  Reserva: {new Date(v.fecha_reserva).toLocaleDateString()} · Estado: {v.estado}
                </p>
                <button className="btn btn-success" onClick={() => navigate(`/cliente/itinerario/${v.paquete_id}`)}>
                  Ver itinerario
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiViaje;
