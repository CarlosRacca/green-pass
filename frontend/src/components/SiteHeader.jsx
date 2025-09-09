import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/GP VERDE OSC Y NEGRO.png";
import { AuthContext } from "../context/AuthContext.jsx";

export default function SiteHeader() {
  const [open] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    try {
      localStorage.clear();
      setUser(null);
      navigate("/");
    } catch {}
  };

  return (
    <header className="site-header fixed-top" style={{ backgroundColor: '#f3f3f1', borderBottom: '1px solid rgba(0,0,0,0.06)', zIndex: 1050 }}>
      <div className="container">
        {/* Desktop (>= md): Grid de 3 columnas: logo | centro | acciones */}
        <div className="d-none d-md-grid align-items-center" style={{ gridTemplateColumns: 'auto 1fr auto', display: 'grid', columnGap: 16, paddingTop: 10, paddingBottom: 10 }}>
          <div className="d-flex align-items-center">
            <Link className="d-flex align-items-center" to="/">
              <img src={logo} alt="Green Pass" style={{ height: 44 }} />
            </Link>
          </div>

          {isHome ? (
            <nav aria-label="Primary" className="d-flex justify-content-center">
              <ul className="list-unstyled d-flex m-0 align-items-center" style={{ gap: 28 }}>
                <li>
                  <a href="#work" className="text-decoration-none text-uppercase fw-semibold text-dark" style={{ letterSpacing: 2, fontSize: 14 }}>Experiencias</a>
                </li>
                <li>
                  <a href="#about" className="text-decoration-none text-uppercase fw-semibold text-dark" style={{ letterSpacing: 2, fontSize: 14 }}>Sobre nosotros</a>
                </li>
              </ul>
            </nav>
          ) : (
            <div />
          )}

          <div className="d-flex align-items-center justify-content-end" style={{ gap: 14 }}>
            <a href="https://www.instagram.com/greenpassok?igsh=andibzQ5OWE2cGFy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-dark"><FaInstagram size={22} /></a>
            {user ? (
              <>
                {user.role === 'superadmin' && (
                  <a href="https://admin-h6lrbxde1-carlos-raccas-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success" style={{ borderRadius: 6, paddingInline: 14, letterSpacing: 1 }}>Admin</a>
                )}
                <Link to={user.role === 'superadmin' ? '/panel' : '/cliente/panel'} className="btn btn-sm" style={{ backgroundColor: '#1a7f4b', color: '#fff', borderRadius: 6, paddingInline: 14, letterSpacing: 1 }}>Panel</Link>
                <button onClick={handleLogout} className="btn btn-sm btn-outline-secondary" style={{ borderRadius: 6, paddingInline: 14, letterSpacing: 1 }}>Salir</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm" style={{ backgroundColor: '#1a7f4b', color: '#fff', borderRadius: 6, paddingInline: 18, letterSpacing: 1 }}>Ingresar</Link>
            )}
          </div>
        </div>

        {/* Mobile (< md): brand + toggler y collapse centrado */}
        <nav className="navbar navbar-light d-flex d-md-none align-items-center" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Green Pass" style={{ height: 40 }} />
          </Link>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            aria-label="Toggle navigation"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNav"
            style={{ border: '1px solid rgba(0,0,0,0.2)' }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="mobileNav" className="collapse navbar-collapse">
            <div className="d-flex flex-column align-items-center w-100">
              {isHome && (
                <ul className="navbar-nav w-100 align-items-center justify-content-center text-center" style={{ gap: 12 }}>
                  <li className="nav-item">
                    <a href="#work" className="nav-link w-100 text-center text-uppercase fw-semibold" style={{ letterSpacing: 2, fontSize: 14 }} data-bs-toggle="collapse" data-bs-target="#mobileNav">Experiencias</a>
                  </li>
                  <li className="nav-item">
                    <a href="#about" className="nav-link w-100 text-center text-uppercase fw-semibold" style={{ letterSpacing: 2, fontSize: 14 }} data-bs-toggle="collapse" data-bs-target="#mobileNav">Sobre nosotros</a>
                  </li>
                </ul>
              )}

              <div className="d-flex align-items-center mt-3 w-100 justify-content-center" style={{ gap: 14 }}>
                <a href="https://www.instagram.com/greenpassok?igsh=andibzQ5OWE2cGFy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-dark" data-bs-toggle="collapse" data-bs-target="#mobileNav"><FaInstagram size={22} /></a>
                {user ? (
                  <>
                    {user.role === 'superadmin' && (
                      <a href="https://admin-h6lrbxde1-carlos-raccas-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success" style={{ borderRadius: 6, paddingInline: 14, letterSpacing: 1 }} data-bs-toggle="collapse" data-bs-target="#mobileNav">Admin</a>
                    )}
                    <Link to={user.role === 'superadmin' ? '/panel' : '/cliente/panel'} className="btn btn-sm" style={{ backgroundColor: '#1a7f4b', color: '#fff', borderRadius: 6, paddingInline: 14, letterSpacing: 1 }} data-bs-toggle="collapse" data-bs-target="#mobileNav">Panel</Link>
                    <button onClick={handleLogout} className="btn btn-sm btn-outline-secondary" style={{ borderRadius: 6, paddingInline: 14, letterSpacing: 1 }} data-bs-toggle="collapse" data-bs-target="#mobileNav">Salir</button>
                  </>
                ) : (
                  <Link to="/login" className="btn btn-sm" style={{ backgroundColor: '#1a7f4b', color: '#fff', borderRadius: 6, paddingInline: 18, letterSpacing: 1 }} data-bs-toggle="collapse" data-bs-target="#mobileNav">Ingresar</Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}


