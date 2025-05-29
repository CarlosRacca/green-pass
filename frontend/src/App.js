import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header.js";
import SimpleHeader from "./components/SimpleHeader.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import PackageDetail from "./pages/PackageDetail.js";
import AdminConsultas from "./pages/AdminConsultas.js";
import AdminViajes from "./pages/AdminViajes.jsx";
import AdminGrupos from "./pages/AdminGrupos.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";
import LoginForm from "./components/LoginForm.jsx";
import UserPanel from "./pages/UserPanel.jsx";
import MiViaje from "./pages/MiViaje.jsx";
import MisDatos from "./pages/MisDatos.jsx";
import AdminCrearUsuario from './pages/AdminCrearUsuario.jsx';
import AdminCrearTorneo from './pages/AdminCrearTorneo.jsx';
import CargarScore from './pages/Torneos/CargarScore.jsx';
import RankingFinal from './pages/Torneos/RankingFinal.jsx';
import RankingDia from './pages/Torneos/RankingDia.jsx';
import AdminVerTorneos from "./pages/AdminVerTorneo.jsx";
import AdminDetalleTorneo from "./pages/AdminDetalleTorneo.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoadingUser(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const hideHeaderRoutes = [];
  const isSuperadmin = user?.role === "superadmin";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideHeaderRoutes.includes(path) && (
        path === "/" ? (
          <Header user={user} onLogout={handleLogout} />
        ) : (
          <SimpleHeader user={user} onLogout={handleLogout} />
        )
      )}

      <main className="flex-grow-1">
        {loadingUser ? (
          <p className="text-center mt-5">Cargando sesión...</p>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package/:packageId" element={<PackageDetail />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/panel" replace /> : <LoginForm onLoginSuccess={setUser} />}
            />
            <Route path="/panel" element={<UserPanel />} />
            <Route path="/mi-viaje" element={<MiViaje />} />
            <Route path="/mis-datos" element={<MisDatos />} />
            <Route path="/admin/consultas" element={isSuperadmin ? <AdminConsultas /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/viajes" element={isSuperadmin ? <AdminViajes /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/grupos" element={isSuperadmin ? <AdminGrupos /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/usuarios" element={isSuperadmin ? <AdminUsuarios /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/torneos/:id" element={<AdminDetalleTorneo />} />
            <Route path="/admin/ver-torneos" element={<AdminVerTorneos />} />
            <Route path="/admin/crear-usuario" element={<AdminCrearUsuario />} />
            <Route path="/admin/torneos" element={<AdminCrearTorneo />} />
            <Route path="/torneos/:id/cargar-score" element={<CargarScore />} />
            <Route path="/torneos/:id/ranking-final" element={<RankingFinal />} />
            <Route path="/torneos/:id/ranking" element={<RankingDia />} />
          </Routes>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;