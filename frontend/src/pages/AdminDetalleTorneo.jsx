import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";

const API_URL = "/torneos";

const AdminDetalleTorneo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [torneo, setTorneo] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [scoresPorDia, setScoresPorDia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const res = await api.get(`${API_URL}/${id}/completo`);
        setTorneo(res.data);

        const rankingRes = await api.get(`${API_URL}/${id}/ranking-final`);
        setLeaderboard(rankingRes.data);

        const scoresRes = await api.get(`${API_URL}/${id}/scores-por-dia`);
        setScoresPorDia(scoresRes.data);
      } catch (err) {
        console.error("Error al cargar datos del torneo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneo();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Cargando torneo...</p>;
  if (!torneo) return <p className="text-center mt-5">No se encontró el torneo</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h2 className="mb-3">🏌️ {torneo.torneo.nombre}</h2>
      <p>
        Cliente: {torneo.torneo.cliente_id} | Inicio:{" "}
        {new Date(torneo.torneo.fecha_inicio).toLocaleDateString()} | Fin:{" "}
        {new Date(torneo.torneo.fecha_fin).toLocaleDateString()}
      </p>

      <hr />

      <h4 className="mt-4">🏆 Leaderboard</h4>
      {leaderboard?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador 1</th>
                <th>Jugador 2</th>
                <th>Puntos Totales</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((pareja, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pareja.jugador_a_nombre} {pareja.jugador_a_apellido}</td>
                  <td>{pareja.jugador_b_nombre} {pareja.jugador_b_apellido}</td>
                  <td><strong>{pareja.puntos_totales}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted">Aún no hay puntuaciones cargadas</p>
      )}

      <hr />
      <h4 className="mt-4">📊 Scores por Día</h4>
      {scoresPorDia?.length > 0 ? (
        scoresPorDia.map((dia, i) => (
          <div key={i} className="mb-4">
            <h5>{new Date(dia.fecha).toLocaleDateString()} | Modalidad: {dia.modalidad}</h5>
            {dia.jugadores.map((jugador, j) => (
              <div key={j} className="mb-3 border rounded p-2">
                <strong>{jugador.nombre} {jugador.apellido}</strong>
                <table className="table table-sm table-bordered mt-2">
                  <thead>
                    <tr>
                      {[...Array(18)].map((_, i) => (
                        <th key={i}>H{i + 1}</th>
                      ))}
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {jugador.scores.slice(0, 18).map((hoyo, k) => (
                        <td key={k}>{hoyo.score}</td>
                      ))}
                      <td>
                        <strong>
                          {jugador.scores.slice(0, 18).reduce((acc, curr) => acc + curr.score, 0)}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-muted">No hay scores registrados aún.</p>
      )}
    </div>
  );
};

export default AdminDetalleTorneo;
