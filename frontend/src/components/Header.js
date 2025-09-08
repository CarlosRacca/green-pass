import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/GP VERDE Y BLANCO.png";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx';

function Header({ onLogout }) {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky-top" style={{ zIndex: 1020, backgroundColor: '#f3f3f1', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container d-flex align-items-center py-3" style={{ gap: 24 }}>
        <Link to="/">
          <img src={logo} alt="Green Pass" style={{ height: 40 }} />
        </Link>
        <div className="flex-grow-1 d-flex justify-content-center">
          <nav className="d-flex align-items-center" style={{ gap: 28, letterSpacing: 3, fontSize: 13, fontWeight: 600 }}>
            <a href="#about" className="text-decoration-none text-dark text-uppercase">About</a>
            <a href="#work" className="text-decoration-none text-dark text-uppercase">Work</a>
            <a href="#contact" className="text-decoration-none text-dark text-uppercase">Press + Testimonials</a>
          </nav>
        </div>
        <div className="d-flex align-items-center" style={{ gap: 14 }}>
          <a href="#contact" aria-label="Instagram" className="text-dark"><FaInstagram size={18} /></a>
          <a href="#contact" aria-label="Facebook" className="text-dark"><FaFacebookF size={16} /></a>
          <a href="#contact" className="btn btn-sm" style={{ backgroundColor: '#6d3a1c', color: '#fff', borderRadius: 4, paddingInline: 18, letterSpacing: 2 }}>Contact</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
