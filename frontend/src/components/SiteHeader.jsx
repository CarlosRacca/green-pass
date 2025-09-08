import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/GP VERDE OSC Y NEGRO.png";

export default function SiteHeader() {
  return (
    <header className="site-header sticky-top" style={{ backgroundColor: '#f3f3f1', borderBottom: '1px solid rgba(0,0,0,0.06)', zIndex: 1020 }}>
      <div className="container d-flex align-items-center py-3" style={{ gap: 24 }}>
        <Link to="/">
          <img src={logo} alt="Green Pass" style={{ height: 60 }} />
        </Link>

        <div className="flex-grow-1 d-flex justify-content-center">
          <nav className="d-flex align-items-center site-nav" style={{ gap: 28 }}>
            <a href="#work" className="site-link">Experiencias</a>
            <a href="#about" className="site-link">Sobre nosotros</a>
          </nav>
        </div>

        <div className="d-flex align-items-center" style={{ gap: 14 }}>
          <a href="https://www.instagram.com/greenpassok?igsh=andibzQ5OWE2cGFy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="site-icon"><FaInstagram size={18} /></a>
          <Link to="/login" className="btn btn-sm site-contact-btn">Ingresar</Link>
        </div>
      </div>
    </header>
  );
}


