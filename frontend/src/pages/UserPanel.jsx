import React from "react";
import { useNavigate } from "react-router-dom";

const UserPanel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-5 text-center">
      {user.role === "cliente" ? (
        <>
          <h2>Hola, {user.email} 👋</h2>
          <p>¡Bienvenido a tu espacio personal!</p>
          <button className="btn btn-primary m-2" onClick={() => navigate("/mi-viaje")}>
            Ver tu viaje
          </button>
          <button className="btn btn-outline-secondary m-2" onClick={() => navigate("/mis-datos")}>
            Editar / completar tus datos
          </button>
        </>
      ) : (
        <>
          <h2>Hola, {user.email} 👑</h2>
          <p>Estas son las acciones disponibles como administrador:</p>
          <div className="d-flex flex-column align-items-center gap-3 mt-4">
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/consultas")}>
              Ver consultas
            </button>
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/viajes")}>
              Ver viajes vendidos
            </button>
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/grupos")}>
              Ver grupos
            </button>
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/usuarios")}>
              Ver todos los usuarios
            </button>
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/crear-usuario")}>
              Crear usuario
            </button>
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/torneos")}>
              Crear torneo
            </button>
            <button className="btn btn-success w-50" onClick={() => navigate("/admin/ver-torneos")}>
              Ver torneos
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPanel;
