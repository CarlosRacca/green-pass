import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerItinerarioCliente = () => {
  const { paqueteId } = useParams();
  const [itinerario, setItinerario] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);

    const fetchItinerario = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/itinerarios/cliente/${stored.id}/paquete/${paqueteId}`
        );
        setItinerario(res.data);
      } catch (error) {
        console.error("Error al obtener el itinerario", error);
      }
    };

    if (stored?.id && paqueteId) {
      fetchItinerario();
    }
  }, [paqueteId]);

  if (!user) return <p className="text-center mt-5">Cargando usuario...</p>;

  return (
    <div className="container mt-5 mb-5">
      <div
        className="p-4 shadow rounded bg-white"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <h2 className="text-center mb-4 fw-bold text-success">
          Itinerario del viaje
        </h2>

        {itinerario.length === 0 ? (
          <p className="text-center">No hay actividades programadas.</p>
        ) : (
          itinerario.map((dia) => (
            <div key={dia.id} className="mb-5">
              <div
                className="py-2 px-3 rounded text-white mb-3"
                style={{ background: "#1c694d", fontWeight: "600" }}
              >
                {new Date(dia.fecha).toLocaleDateString("es-AR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="d-flex flex-column gap-3">
                {(dia.actividades || []).map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3 border rounded shadow-sm bg-light animate__animated animate__fadeIn"
                  >
                    <div className="fw-bold fs-5 mb-1">
                      🕒 {act.hora?.slice(0, 5)} - {act.actividad}
                    </div>
                    {act.lugar && (
                      <div className="text-muted mb-1">
                        📍 <strong>{act.lugar}</strong>
                      </div>
                    )}
                    {act.notas && (
                      <div className="fst-italic text-secondary">
                        📝 {act.notas}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
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
    </div>
  );
};

export default VerItinerarioCliente;
