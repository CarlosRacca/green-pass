import React from "react";
import { Link, NavLink } from "react-router-dom";

const items = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/usuarios", label: "Usuarios" },
  { to: "/admin/torneos", label: "Torneos" },
  { to: "/admin/consultas", label: "Consultas" },
];

export default function AdminShell({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "calc(100vh - 76px)" }}>
      <aside className="border-end bg-light" style={{ width: 220 }}>
        <div className="p-3 fw-bold">Green Pass</div>
        <nav className="nav flex-column">
          {items.map(i => (
            <NavLink key={i.to} to={i.to} className={({isActive}) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}>{i.label}</NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-grow-1 p-3">
        {children}
      </main>
    </div>
  );
}
