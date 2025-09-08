import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/GP VERDE OSC Y NEGRO.png";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky-top" style={{ backgroundColor: '#f3f3f1', borderBottom: '1px solid rgba(0,0,0,0.06)', zIndex: 1020 }}>
      <nav className="navbar navbar-expand-md navbar-light" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Green Pass" style={{ height: 44 }} />
          </Link>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
            style={{ border: '1px solid rgba(0,0,0,0.2)' }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto align-items-center" style={{ gap: 18 }}>
              <li className="nav-item">
                <a href="#work" className="nav-link text-uppercase fw-semibold" style={{ letterSpacing: 2, fontSize: 14 }} onClick={() => setOpen(false)}>Experiencias</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link text-uppercase fw-semibold" style={{ letterSpacing: 2, fontSize: 14 }} onClick={() => setOpen(false)}>Sobre nosotros</a>
              </li>
            </ul>

            <div className="d-flex align-items-center ms-md-3 mt-3 mt-md-0 ms-auto" style={{ gap: 12 }}>
              <a href="https://www.instagram.com/greenpassok?igsh=andibzQ5OWE2cGFy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-dark" onClick={() => setOpen(false)}><FaInstagram size={18} /></a>
              <Link to="/login" className="btn btn-sm" style={{ backgroundColor: '#1a7f4b', color: '#fff', borderRadius: 6, paddingInline: 16, letterSpacing: 1 }} onClick={() => setOpen(false)}>Ingresar</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


