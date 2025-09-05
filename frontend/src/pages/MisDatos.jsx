import React, { useEffect, useState } from "react";
import api from "../api/client";

const MisDatos = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const stored = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${stored?.id}`);
        setData(data);
      } catch (e) {
        console.error("Error cargando datos del usuario", e);
      } finally {
        setLoading(false);
      }
    };
    if (stored?.id) fetchUser();
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

  if (!data) {
    return (
      <div className="container mt-5 text-center">
        <h4>Ocurrió un error al cargar tus datos.</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: 700 }}>
      <h2 className="mb-4 text-success">👤 Mis datos</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-muted">Nombre</label>
              <div className="form-control bg-light">{data.nombre || "-"}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Apellido</label>
              <div className="form-control bg-light">{data.apellido || "-"}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">DNI</label>
              <div className="form-control bg-light">{data.dni || "-"}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Matrícula</label>
              <div className="form-control bg-light">{data.matricula || "-"}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Handicap</label>
              <div className="form-control bg-light">{data.handicap ?? "-"}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Email</label>
              <div className="form-control bg-light">{data.email || "-"}</div>
            </div>
          </div>
          <div className="text-end mt-4">
            <a href="/cliente/perfil" className="btn btn-success">Editar perfil</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisDatos;
