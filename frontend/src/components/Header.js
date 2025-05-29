import React, { useContext } from "react";
import logo from "../assets/GP VERDE Y BLANCO.png";
import { FaWhatsapp } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx';


function Header({ onLogout }) {
  const { user } = useContext(AuthContext);

  return (
    <header
      className="text-white py-5"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.9)), url('/img/bg-golf.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container d-flex flex-column align-items-center text-center animate__animated animate__fadeInDown">
        <img
          src={logo}
          alt="Logo de Green Pass"
          className="img-fluid mb-4"
          style={{ maxWidth: "200px" }}
        />
        <h1 className="display-5 fw-bold mb-3">
          ¡Viví el golf como nunca antes!
        </h1>
        <p className="text-light fs-5 mb-4" style={{ maxWidth: "700px" }}>
          Sumate a una experiencia exclusiva de golf, relax y naturaleza en los
          destinos más increíbles de Argentina.
        </p>

        <a
          href="https://wa.me/1133681576"
          className="btn btn-success px-4 py-2 d-flex align-items-center gap-2 mb-3"
        >
          <FaWhatsapp size={18} /> Quiero más info ahora
        </a>

        <div className="d-flex gap-3">
          {user?.role === "superadmin" && (
            <a href="/panel" className="btn btn-outline-light">
              Panel Admin
            </a>
          )}
          {user ? (
            <button onClick={onLogout} className="btn btn-outline-danger">
              Cerrar sesión
            </button>
          ) : (
            <a href="/login" className="btn btn-outline-light">
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
