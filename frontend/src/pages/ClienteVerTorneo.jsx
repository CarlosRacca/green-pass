// src/pages/ClienteVerTorneo.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";

const ClienteVerTorneo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [torneo, setTorneo] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = parseInt(localStorage.getItem("userId")); // Asegurate que guardás el ID al loguear

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const res = await api.get(
          `/torneos/${id}/completo`
        );
        setTorneo(res.data);
      } catch (error) {
        console.error("Error al cargar torneo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTorneo();
  }, [id]);

  const calcularTotal = (scores) =>
    scores.slice(0, 18).reduce((acc, s) => acc + s.score, 0);

  if (loading) return (
    <div className="container mt-5">
      <div className="placeholder-glow">
        <span className="placeholder col-6"></span>
      </div>
      <div className="placeholder-glow mt-3">
        <span className="placeholder col-12"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-10"></span>
      </div>
    </div>
  );
  if (!torneo) return <p className="text-center mt-5">Torneo no encontrado</p>;

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <motion.h2 className="mb-3 text-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        🏌️ {torneo.torneo.nombre}
      </motion.h2>
      <p>
        Del {new Date(torneo.torneo.fecha_inicio).toLocaleDateString()} al{" "}
        {new Date(torneo.torneo.fecha_fin).toLocaleDateString()}
      </p>

      {torneo.dias.map((dia) => (
        <div key={dia.id} className="mt-5">
          <h4 className="text-primary border-bottom pb-2">
            Día {new Date(dia.fecha).toLocaleDateString()} - Modalidad: {dia.modalidad}
          </h4>

          {torneo.parejasDetalle
            .filter((p) => p.dia_id === dia.id)
            .map((pareja) => {
              const esMiPareja =
                pareja.jugador_1.id === userId || pareja.jugador_2.id === userId;

              return (
                <div
                  className={`card my-4 shadow-sm ${
                    esMiPareja ? "border-success border-2" : ""
                  }`}
                  key={pareja.pareja_id}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      🧑‍🤝‍🧑 {pareja.jugador_1.nombre} {pareja.jugador_1.apellido} &{" "}
                      {pareja.jugador_2.nombre} {pareja.jugador_2.apellido}
                    </h5>

                    <div className="mb-2">
                      {pareja.longDrive && (
                        <span className="badge bg-warning text-dark me-2">
                          🏆 Long Drive
                        </span>
                      )}
                      {pareja.mejorApproach && (
                        <span className="badge bg-info text-dark me-2">
                          🏆 Mejor Approach
                        </span>
                      )}
                      {pareja.ganador_birdies && (
                        <span className="badge bg-success me-2">
                          🏆 Más Birdies
                        </span>
                      )}
                      {pareja.ganador_bogeys && (
                        <span className="badge bg-secondary me-2">
                          🏆 Menos Bogeys
                        </span>
                      )}
                    </div>

                    <p>
                      Birdies: <strong>{pareja.birdies}</strong> | Bogeys:{" "}
                      <strong>{pareja.bogeys}</strong>
                    </p>

                    <div className="table-responsive">
                      <table className="table table-bordered text-center table-sm">
                        <thead className="table-light">
                          <tr>
                            <th>Jugador</th>
                            {Array.from({ length: 18 }, (_, i) => (
                              <th key={i + 1}>{i + 1}</th>
                            ))}
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {pareja.jugador_1.nombre.split(" ")[0]}
                            </td>
                            {pareja.jugador_1.scores.slice(0, 18).map((s, i) => (
                              <td key={i}>{s.score}</td>
                            ))}
                            <td>
                              <strong>
                                {calcularTotal(pareja.jugador_1.scores)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {pareja.jugador_2.nombre.split(" ")[0]}
                            </td>
                            {pareja.jugador_2.scores.slice(0, 18).map((s, i) => (
                              <td key={i}>{s.score}</td>
                            ))}
                            <td>
                              <strong>
                                {calcularTotal(pareja.jugador_2.scores)}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default ClienteVerTorneo;
