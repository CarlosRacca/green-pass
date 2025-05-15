import React, { useEffect, useState } from 'react';

const AdminConsultas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notify/consultas`);
      const data = await res.json();
      if (data.success) {
        setConsultas(data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Consultas de Paquetes</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Paquete</th>
            <th>Cantidad de consultas</th>
            <th>Última averiguación</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((item) => (
            <tr key={item.id}>
              <td>{item.paquete}</td>
              <td>{item.cantidad}</td>
              <td>{new Date(item.ultima_consulta).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminConsultas;
