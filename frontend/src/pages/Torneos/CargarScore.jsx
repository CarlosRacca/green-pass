import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CargarScore = () => {
  const { id } = useParams(); // torneo_id
  const [dias, setDias] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState("");
  const [scores, setScores] = useState(Array(18).fill(""));
  const [longDrive, setLongDrive] = useState(false);
  const [mejorApproach, setMejorApproach] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch(`/api/torneos/${id}/completo`)
      .then(res => res.json())
      .then(data => {
        setDias(data.dias);
        setJugadores(data.jugadores);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diaSeleccionado || !jugadorSeleccionado) {
      setMensaje("Debes seleccionar día y jugador.");
      return;
    }

    try {
      for (let i = 0; i < 18; i++) {
        await fetch('/api/torneos/scores', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            torneo_id: id,
            dia_id: diaSeleccionado,
            jugador_id: jugadorSeleccionado,
            hoyo: i + 1,
            score: parseInt(scores[i]),
            long_drive: i === 0 ? longDrive : false,
            mejor_approach: i === 0 ? mejorApproach : false
          })
        });
      }
      setMensaje("✅ Score cargado con éxito.");
    } catch (err) {
      console.error("Error al enviar:", err);
      setMensaje("❌ Hubo un error al cargar los scores.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ⛳ Cargar Score
      </motion.h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        {/* Día y jugador */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Día</label>
            <select
              value={diaSeleccionado}
              onChange={e => setDiaSeleccionado(e.target.value)}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Seleccionar...</option>
              {dias.map(dia => (
                <option key={dia.id} value={dia.id}>
                  {new Date(dia.fecha).toLocaleDateString()} - {dia.modalidad}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Jugador</label>
            <select
              value={jugadorSeleccionado}
              onChange={e => setJugadorSeleccionado(e.target.value)}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Seleccionar...</option>
              {jugadores.map(j => (
                <option key={j.id} value={j.id}>
                  {j.nombre} {j.apellido}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Score por hoyo */}
        <div>
          <label className="block font-medium mb-2">Score por hoyo</label>
          <div className="grid grid-cols-6 gap-2">
            {scores.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                min={1}
                onChange={e => {
                  const nuevos = [...scores];
                  nuevos[i] = e.target.value;
                  setScores(nuevos);
                }}
                placeholder={`H${i + 1}`}
                className="p-2 border rounded text-center"
              />
            ))}
          </div>
        </div>

        {/* Opciones */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={longDrive} onChange={e => setLongDrive(e.target.checked)} />
            Long Drive 🏌️
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={mejorApproach} onChange={e => setMejorApproach(e.target.checked)} />
            Mejor Approach 🎯
          </label>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <motion.div
            className="text-center text-green-600 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {mensaje}
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
        >
          Cargar Score
        </button>
      </form>
    </div>
  );
};

export default CargarScore;
