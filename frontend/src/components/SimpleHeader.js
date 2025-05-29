import React from "react";
import logo from "../assets/GP VERDE Y BLANCO.png";

const SimpleHeader = ({ user, onLogout }) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white">
      <a href="/">
        <img src={logo} alt="Green Pass" style={{ height: "40px" }} />
      </a>
      <div className="d-flex gap-3">
        {user?.role === "superadmin" && (
          <a href="/panel" className="btn btn-outline-light btn-sm">
            Panel
          </a>
        )}
        {user ? (
          <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
            Cerrar sesión
          </button>
        ) : (
          <a href="/login" className="btn btn-outline-light btn-sm">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default SimpleHeader;
