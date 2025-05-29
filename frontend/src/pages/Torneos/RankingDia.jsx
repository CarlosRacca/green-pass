import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const RankingDia = () => {
  const { id } = useParams(); // torneo_id
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/torneos/${id}/ranking`)
      .then(res => res.json())
      .then(data => {
        setRanking(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener ranking por día:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando ranking diario...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📅 Ranking Parcial por Día
      </motion.h2>

      <div className="space-y-6">
        {ranking.map((pareja, index) => (
          <motion.div
            key={pareja.pareja_id}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-200"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-green-800">
                {pareja.nombre_1} {pareja.apellido_1} & {pareja.nombre_2} {pareja.apellido_2}
              </h4>
              <span className="text-sm font-bold text-green-700">
                {pareja.puntos} pts
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-700 mt-2">
              <div><strong>Total Score:</strong> {pareja.totalScore}</div>
              <div><strong>Birdies:</strong> {pareja.birdies}</div>
              <div><strong>Bogeys:</strong> {pareja.bogeys}</div>
              <div><strong>Long Drive:</strong> {pareja.longDrive ? '✅' : '❌'}</div>
              <div><strong>Approach:</strong> {pareja.approach ? '✅' : '❌'}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RankingDia;
