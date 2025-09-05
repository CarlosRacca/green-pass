import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/GP VERDE Y BLANCO.png";

const SimpleHeader = ({ user, onLogout }) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white">
      <Link to="/">
        <img src={logo} alt="Green Pass" style={{ height: "40px" }} />
      </Link>
      <div className="d-flex gap-3">
        {user?.role === "superadmin" && (
          <Link to="/panel" className="btn btn-outline-light btn-sm">
            Panel
          </Link>
        )}
        {user ? (
          <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline-light btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default SimpleHeader;
