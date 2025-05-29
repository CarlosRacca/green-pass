import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TorneoDetalle = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/torneos/${id}/completo`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener torneo:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando torneo...</p>;
  if (!data) return <p>Error al cargar torneo.</p>;

  const { torneo, dias, jugadores, parejas, scores } = data;

  const scoresPorPareja = parejas.map(pareja => {
    const jugador1Scores = scores.filter(s => s.jugador_id === pareja.jugador_1_id);
    const jugador2Scores = scores.filter(s => s.jugador_id === pareja.jugador_2_id);

    return {
      parejaId: pareja.id,
      jugador1: {
        id: pareja.jugador_1_id,
        nombre: pareja.jugador_1_nombre,
        scores: jugador1Scores,
      },
      jugador2: {
        id: pareja.jugador_2_id,
        nombre: pareja.jugador_2_nombre,
        scores: jugador2Scores,
      },
    };
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{torneo.nombre}</h2>

      {/* Pareja del usuario */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">Tu Pareja</h3>
        {/* Aquí se puede filtrar por user actual */}
        {parejas.length > 0 ? (
          <p>{parejas[0].jugador_1_nombre} & {parejas[0].jugador_2_nombre}</p>
        ) : (
          <p>No estás asignado a una pareja aún.</p>
        )}
      </div>

      {/* Tabla de scores agrupados por pareja */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Scores del Torneo</h3>
        {scoresPorPareja.map((pareja) => (
          <div key={pareja.parejaId} className="bg-gray-100 rounded-xl p-4 shadow">
            <h4 className="font-semibold text-lg mb-2">
              {pareja.jugador1.nombre} & {pareja.jugador2.nombre}
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {[pareja.jugador1, pareja.jugador2].map((jugador) => (
                <div key={jugador.id}>
                  <h5 className="font-medium mb-1">{jugador.nombre}</h5>
                  <div className="grid grid-cols-6 gap-1 text-sm">
                    {jugador.scores.map((score, i) => (
                      <div
                        key={i}
                        className="bg-white border rounded px-2 py-1 text-center"
                      >
                        H{i + 1}: {score.score}
                        {score.long_drive && <span className="ml-1">🏌️</span>}
                        {score.mejor_approach && <span className="ml-1">🎯</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TorneoDetalle;
