import React from "react";
import { useNavigate } from "react-router-dom";

const AdminViajes = () => {
  const navigate = useNavigate();

  // Datos falsos para mostrar estructura
  const viajes = [
    { id: 1, nombre: "Viaje a Bariloche", fecha: "15/09/2024", grupo: "Grupo Norte" },
    { id: 2, nombre: "Viaje a Mendoza", fecha: "03/10/2024", grupo: "Grupo Sur" }
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">📋 Viajes Vendidos</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped rounded overflow-hidden">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Grupo</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((viaje) => (
              <tr key={viaje.id}>
                <td>{viaje.id}</td>
                <td>{viaje.nombre}</td>
                <td>{viaje.fecha}</td>
                <td>{viaje.grupo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/panel")}>Volver al panel</button>
      </div>
    </div>
  );
};

export default AdminViajes;
