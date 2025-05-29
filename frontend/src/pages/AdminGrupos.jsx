import React from "react";
import { useNavigate } from "react-router-dom";

const AdminGrupos = () => {
  const navigate = useNavigate();

  const grupos = [
    { id: 1, nombre: "Grupo Norte", integrantes: 12 },
    { id: 2, nombre: "Grupo Sur", integrantes: 8 }
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">👥 Grupos</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped rounded overflow-hidden">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Integrantes</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((grupo) => (
              <tr key={grupo.id}>
                <td>{grupo.id}</td>
                <td>{grupo.nombre}</td>
                <td>{grupo.integrantes}</td>
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

export default AdminGrupos;
