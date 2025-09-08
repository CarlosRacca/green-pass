import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/GP VERDE OSC Y NEGRO.png";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky-top" style={{ backgroundColor: '#f3f3f1', borderBottom: '1px solid rgba(0,0,0,0.06)', zIndex: 1020 }}>
      <nav className="navbar navbar-expand-md" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Green Pass" style={{ height: 48 }} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
            style={{ border: 'none' }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto align-items-center" style={{ gap: 20 }}>
              <li className="nav-item">
                <a href="#work" className="nav-link text-uppercase fw-semibold" style={{ letterSpacing: 2 }}>Experiencias</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link text-uppercase fw-semibold" style={{ letterSpacing: 2 }}>Sobre nosotros</a>
              </li>
            </ul>

            <div className="d-flex align-items-center" style={{ gap: 12 }}>
              <a href="https://www.instagram.com/greenpassok?igsh=andibzQ5OWE2cGFy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-dark"><FaInstagram size={18} /></a>
              <Link to="/login" className="btn btn-sm" style={{ backgroundColor: '#1a7f4b', color: '#fff', borderRadius: 4, paddingInline: 18, letterSpacing: 1 }}>Ingresar</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


