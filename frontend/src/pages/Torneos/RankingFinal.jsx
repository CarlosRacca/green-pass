import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const RankingFinal = () => {
  const { id } = useParams(); // torneo_id
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/torneos/${id}/ranking-final`)
      .then(res => res.json())
      .then(data => {
        setRanking(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener ranking:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando ranking...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏁 Ranking Final
      </motion.h2>

      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Jugador 1</th>
              <th className="py-3 px-4 text-left">Jugador 2</th>
              <th className="py-3 px-4 text-center">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((pareja, index) => (
              <tr
                key={index}
                className={`border-b ${index === 0 ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}
              >
                <td className="py-2 px-4 font-bold">{index + 1}</td>
                <td className="py-2 px-4">{pareja.jugador_a_nombre} {pareja.jugador_a_apellido}</td>
                <td className="py-2 px-4">{pareja.jugador_b_nombre} {pareja.jugador_b_apellido}</td>
                <td className="py-2 px-4 text-center font-semibold text-green-800">
                  {pareja.puntos_totales}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default RankingFinal;
