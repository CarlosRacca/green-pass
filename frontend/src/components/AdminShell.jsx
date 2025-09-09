import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, MessageSquare, Plane, Trophy, BarChart3, Menu, X, Bell, Settings, Search } from "lucide-react";
import logo from "../assets/GP VERDE OSC Y NEGRO.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/consultas", label: "Consultas", icon: MessageSquare },
  { to: "/admin/viajes", label: "Viajes Vendidos", icon: Plane },
  { to: "/admin/usuarios", label: "Usuarios", icon: Users },
  { to: "/admin/torneos", label: "Torneos", icon: Trophy },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gp-bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5 h-16">
        <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between gap-3">
          <button aria-label="Abrir menú" className="md:hidden inline-flex items-center justify-center rounded-md border border-black/10 w-10 h-10" onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="hidden md:flex items-center gap-2">
            <img src={logo} alt="Green Pass" style={{ height: 28 }} />
            <span className="font-semibold tracking-wide">Admin</span>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input placeholder="Buscar usuarios, torneos, viajes..." className="form-control ps-5 py-2" style={{ height: 38 }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-light border"><Bell size={16} /></button>
            <button className="btn btn-sm btn-light border"><Settings size={16} /></button>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">SA</div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-0 md:gap-6">
        {/* Sidebar */}
        <aside className={`md:sticky md:top-[60px] h-[calc(100vh-60px)] md:h-[calc(100vh-76px)] bg-white md:bg-transparent border-r md:border-0 transition-transform ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:transform-none fixed md:static left-0 top-[60px] w-64 md:w-auto`}>
          <nav className="p-4 md:p-0">
            <ul className="flex md:block gap-2 md:gap-0">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to} className="md:mb-1">
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-emerald-600 text-white' : 'gp-link hover:bg-gray-100'}`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="py-4 md:py-6">
          <div className="gp-card p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
