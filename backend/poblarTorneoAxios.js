import axios from 'axios';

const API_URL = 'http://localhost:5001/api/torneos';

const cargarScores = async () => {
  const scores = [
    // Día 1 - Pareja 1: Jugadores 1 y 2
    { torneo_id: 1, dia_id: 1, jugador_id: 1, hoyo: 1, score: 4, long_drive: false, mejor_approach: false },
    { torneo_id: 1, dia_id: 1, jugador_id: 2, hoyo: 1, score: 3, long_drive: true, mejor_approach: false },

    // Día 1 - Pareja 2: Jugadores 3 y 4
    { torneo_id: 1, dia_id: 1, jugador_id: 3, hoyo: 1, score: 5, long_drive: false, mejor_approach: false },
    { torneo_id: 1, dia_id: 1, jugador_id: 4, hoyo: 1, score: 4, long_drive: false, mejor_approach: true },

    // Día 1 - Pareja 3: Jugadores 5 y 6
    { torneo_id: 1, dia_id: 1, jugador_id: 5, hoyo: 1, score: 3, long_drive: false, mejor_approach: false },
    { torneo_id: 1, dia_id: 1, jugador_id: 6, hoyo: 1, score: 4, long_drive: false, mejor_approach: false },

    // Día 1 - Pareja 4: Jugadores 7 y 8
    { torneo_id: 1, dia_id: 1, jugador_id: 7, hoyo: 1, score: 6, long_drive: false, mejor_approach: false },
    { torneo_id: 1, dia_id: 1, jugador_id: 8, hoyo: 1, score: 5, long_drive: false, mejor_approach: false },
  ];

  for (const score of scores) {
    try {
      const response = await axios.post(`${API_URL}/scores`, score);
      console.log(`✔️ Score cargado para jugador ${score.jugador_id}`);
    } catch (error) {
      console.error(`❌ Error al cargar score para jugador ${score.jugador_id}:`, error.response?.data || error.message);
    }
  }

  console.log('✅ Carga de scores completada');
};

cargarScores();
