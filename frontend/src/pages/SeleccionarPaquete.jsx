import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const SeleccionarPaquete = () => {
  const [user, setUser] = useState(null);
  const [paquetes, setPaquetes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchPaquetes = async () => {
      try {
        const res = await api.get(`/paquetes/cliente/${storedUser.id}`);
        setPaquetes(res.data);
      } catch (error) {
        console.error("Error al obtener paquetes del cliente:", error);
      }
    };

    fetchPaquetes();
  }, []);

  if (!user) return <p className="text-center mt-5">Cargando usuario...</p>;

  return (
    <div className="container mt-5 text-center mb-5">
      <h2 className="mb-4">Seleccioná un paquete</h2>
      {paquetes.length === 0 ? (
        <p>No tenés paquetes asignados.</p>
      ) : (
        <div className="d-flex flex-column gap-3 align-items-center">
          {paquetes.map((paquete) => (
            <button
              key={paquete.id}
              className="btn btn-success w-75"
              onClick={() => navigate(`/cliente/itinerario/${paquete.id}`)}
            >
              {paquete.nombre}
            </button>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-outline-secondary rounded-pill px-4"
          onClick={() => window.history.back()}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default SeleccionarPaquete;
