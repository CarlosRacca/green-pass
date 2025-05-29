import React from "react";
import { useNavigate } from "react-router-dom";

const AdminUsuarios = () => {
  const navigate = useNavigate();

  const usuarios = [
    { id: 1, email: "cliente1@greenpass.com", rol: "cliente" },
    { id: 2, email: "admin@greenpass.com", rol: "superadmin" }
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">👤 Usuarios</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped rounded overflow-hidden">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
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

export default AdminUsuarios;