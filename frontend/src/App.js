import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header.js";
import SimpleHeader from "./components/SimpleHeader.js";
import SiteHeader from "./components/SiteHeader.jsx";
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
import ClienteVerTorneo from "./pages/ClienteVerTorneo.jsx";
import ClientePanel from "./pages/ClientePanel.jsx";
import EditarPerfilCliente from "./pages/EditarPerfilCliente.jsx";
import VerItinerarioCliente from "./pages/VerItinerarioCliente.jsx";
import SeleccionarPaquete from "./pages/SeleccionarPaquete.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/"); // redirige al home
  };

  const hideHeaderRoutes = [];
  const isSuperadmin = user?.role === "superadmin";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideHeaderRoutes.includes(path) && <SiteHeader />}

      <main className="flex-grow-1">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package/:packageId" element={<PackageDetail />} />
            <Route
              path="/login"
              element={
                user ? (
                  user.role === "superadmin" ? (
                    <Navigate to="/panel" replace />
                  ) : (
                    <Navigate to="/cliente/panel" replace />
                  )
                ) : (
                  <LoginForm onLoginSuccess={setUser} />
                )
              }
            />
            <Route path="/panel" element={<UserPanel />} />
            <Route path="/cliente/panel" element={<ClientePanel />} />
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
            <Route path="/cliente/torneo/:id" element={<ClienteVerTorneo />} />
            <Route path="/cliente/perfil" element={<EditarPerfilCliente />} />
            <Route path="/cliente/itinerario/:paqueteId" element={<VerItinerarioCliente />} />
            <Route path="/cliente/seleccionar-paquete" element={<SeleccionarPaquete />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
