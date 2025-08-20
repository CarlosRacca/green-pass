import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientePanel = () => {
  const [user, setUser] = useState(null);
  const [torneoId, setTorneoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("👤 Usuario cargado:", storedUser);
    setUser(storedUser);

    const fetchTorneo = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/torneos`);
        console.log("📦 Todos los torneos:", res.data);

        const misTorneos = res.data.filter(
          (t) =>
            t.cliente_id === storedUser.id ||
            t.jugadores?.some((j) => j.user_id === storedUser.id)
        );

        console.log("✅ Torneos asignados al cliente:", misTorneos);

        if (misTorneos.length > 0) setTorneoId(misTorneos[0].id);
      } catch (error) {
        console.error("Error al buscar torneo del cliente", error);
      }
    };

    if (storedUser?.id) fetchTorneo();
  }, []);

  if (!user) return <p className="text-center mt-5">Cargando usuario...</p>;

  const acciones = [
    {
      label: "✏️ Editar / completar perfil",
      path: "/cliente/perfil",
      disabled: false,
    },
    {
      label: "📅 Ver itinerario del viaje",
      path: "/cliente/seleccionar-paquete",
      disabled: false,
    },
    {
      label: "🏆 Ver torneo completo",
      path: torneoId ? `/cliente/torneo/${torneoId}` : null,
      disabled: !torneoId,
    },
    {
      label: "📝 Cargar score del día",
      path: torneoId ? `/cliente/cargar-score/${torneoId}` : null,
      disabled: !torneoId,
    },
    {
      label: "📊 Ver leaderboard",
      path: torneoId ? `/cliente/leaderboard/${torneoId}` : null,
      disabled: !torneoId,
    },
    {
      label: "🧳 Ver mis viajes contratados",
      path: "/cliente/mis-viajes",
      disabled: false,
    },
  ];

  return (
    <div className="container mt-5 text-center mb-5">
      <h2 className="mb-2 fw-bold">
        Hola{user.nombre ? `, ${user.nombre} 👋` : " 👋"}
      </h2>
      <p className="text-muted">¡Bienvenido a tu espacio personal!</p>

      <div className="d-flex flex-column align-items-center gap-3 mt-4 mb-5">
        {acciones.map((accion, idx) => (
          <button
            key={idx}
            className={`btn w-75 py-3 ${
              accion.disabled ? "btn-secondary" : "btn-success"
            }`}
            style={{
              fontSize: "1rem",
              borderRadius: "0.5rem",
              opacity: accion.disabled ? 0.7 : 1,
              cursor: accion.disabled ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              if (!accion.disabled && accion.path) {
                navigate(accion.path);
              } else {
                alert("Esta opción aún no está disponible.");
              }
            }}
            disabled={accion.disabled}
          >
            {accion.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClientePanel;
