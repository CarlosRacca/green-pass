import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
import RedirectToAdmin from "./components/RedirectToAdmin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUsuariosIndex from "./pages/AdminUsuariosIndex.jsx";
import AdminTorneosIndex from "./pages/AdminTorneosIndex.jsx";
import AdminConsultasIndex from "./pages/AdminConsultasIndex.jsx";
import RequireRole from "./components/RequireRole.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { AuthContext } from "./context/AuthContext.jsx";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { user, setUser } = useContext(AuthContext);

  // Redirección global: cualquier ruta de panel/cliente del CRA va al admin Next
  useEffect(() => {
    const shouldGoAdmin =
      path.startsWith('/panel') ||
      path.startsWith('/cliente') ||
      path.startsWith('/mi-viaje') ||
      path.startsWith('/mis-datos') ||
      path.startsWith('/torneos/') ||
      path.startsWith('/cliente/torneo') ||
      path.startsWith('/cliente/perfil') ||
      path.startsWith('/cliente/itinerario') ||
      path.startsWith('/cliente/seleccionar-paquete');
    if (shouldGoAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [path, navigate]);

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
            {/* Redirecciones: toda área privada propia migra al admin Next */}
            <Route path="/panel" element={<Navigate to="/admin" replace />} />
            <Route path="/cliente/panel" element={<Navigate to="/admin" replace />} />
            <Route path="/cliente/*" element={<Navigate to="/admin" replace />} />
            <Route path="/mi-viaje" element={<Navigate to="/admin" replace />} />
            <Route path="/mis-datos" element={<Navigate to="/admin" replace />} />

            {/* Nuevo admin in-app */}
            {/* Enviar todo /admin al proxy → Next */}
            <Route path="/admin-next/*" element={<RedirectToAdmin />} />
            <Route path="/admin/usuarios" element={
              <RequireRole allowed={"superadmin"}>
                <AdminUsuariosIndex />
              </RequireRole>
            } />
            <Route path="/admin/torneos" element={
              <RequireRole allowed={"superadmin"}>
                <AdminTorneosIndex />
              </RequireRole>
            } />
            <Route path="/admin/consultas" element={
              <RequireRole allowed={"superadmin"}>
                <AdminConsultasIndex />
              </RequireRole>
            } />

            {/* Rutas existentes */}
            <Route path="/admin/consultas-old" element={isSuperadmin ? <AdminConsultas /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/viajes" element={isSuperadmin ? <AdminViajes /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/grupos" element={isSuperadmin ? <AdminGrupos /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/usuarios-old" element={isSuperadmin ? <AdminUsuarios /> : <Navigate to="/panel" replace />} />
            <Route path="/admin/torneos/:id" element={<AdminDetalleTorneo />} />
            <Route path="/admin/ver-torneos" element={<AdminVerTorneos />} />
            <Route path="/admin/crear-usuario" element={<AdminCrearUsuario />} />
            <Route path="/admin/torneos-old" element={<AdminCrearTorneo />} />

            <Route path="/torneos/:id/cargar-score" element={<Navigate to="/admin" replace />} />
            <Route path="/torneos/:id/ranking-final" element={<Navigate to="/admin" replace />} />
            <Route path="/torneos/:id/ranking" element={<Navigate to="/admin" replace />} />
            <Route path="/cliente/torneo/:id" element={<Navigate to="/admin" replace />} />
            <Route path="/cliente/perfil" element={<Navigate to="/admin" replace />} />
            <Route path="/cliente/itinerario/:paqueteId" element={<Navigate to="/admin" replace />} />
            <Route path="/cliente/seleccionar-paquete" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
