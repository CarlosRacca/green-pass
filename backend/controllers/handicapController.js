// Simple controller to proxy handicap lookups to AAG or return mock data

export async function lookupHandicap(req, res) {
  try {
    const { matricula, apellido } = req.query;
    if (!matricula && !apellido) {
      return res.status(400).json({ error: 'Debe especificar matricula o apellido' });
    }

    const aagUrl = process.env.AAG_API_URL; // Optional real API endpoint
    if (aagUrl) {
      try {
        const url = new URL(aagUrl);
        if (matricula) url.searchParams.set('matricula', matricula);
        if (apellido) url.searchParams.set('apellido', apellido);
        const response = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
        if (!response.ok) throw new Error(`AAG ${response.status}`);
        const data = await response.json();
        return res.json({ source: 'aag', results: data });
      } catch (err) {
        // Fall through to mock if AAG fails
        // console.error('AAG lookup failed:', err);
      }
    }

    // Mock dataset for local dev
    const MOCK = [
      { matricula: 'SUPER02', apellido: 'Racca', nombre: 'Carlos', handicap: 0.0, club: 'Green Pass' },
      { matricula: '123456', apellido: 'Perez', nombre: 'Juan', handicap: 12.4, club: 'Buenos Aires GC' },
      { matricula: '654321', apellido: 'Gomez', nombre: 'María', handicap: 18.7, club: 'San Isidro GC' },
      { matricula: '112233', apellido: 'Lopez', nombre: 'Martín', handicap: 7.3, club: 'Cordoba GC' },
    ];

    const termMat = (matricula || '').toLowerCase();
    const termApe = (apellido || '').toLowerCase();
    const filtered = MOCK.filter((p) =>
      (termMat && p.matricula.toLowerCase().includes(termMat)) ||
      (termApe && p.apellido.toLowerCase().includes(termApe))
    );

    return res.json({ source: 'mock', results: filtered });
  } catch (error) {
    console.error('lookupHandicap error:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}


