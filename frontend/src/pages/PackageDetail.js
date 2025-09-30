import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { paquetes } from "../data/paquetes.js";
import { FaCheckCircle } from "react-icons/fa";
import AdminContacts from "./AdminContacts.js";
import AdminConsultas from "./AdminConsultas.js";
import { useTranslation } from 'react-i18next';

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";
  const { t, i18n } = useTranslation();

  const [mostrarPrecio, setMostrarPrecio] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("detalle");

  const paquete = paquetes.find((p) => p.id === packageId);

  const handlePrecio = async () => {
    setMostrarPrecio(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/notify/notify-package-view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paquete: paquete.title }),
      });
    } catch (err) {
      // Silenciar error de tracking en producción para no mostrar alerta al usuario
      if (process.env.NODE_ENV === 'development') {
        setError(t('package.register_error', { defaultValue: "No se pudo registrar la consulta" }));
      }
      try { console.warn("Notify package view failed:", err); } catch {}
    }
  };

  const renderTabs = () => {
    if (!isAdminRoute) return null;

    return (
      <div className="bg-light py-3 mb-4 d-flex justify-content-center gap-4 border rounded">
        <button
          className={`btn ${activeTab === "admin" ? "btn-primary" : "btn-outline-primary"} focus-outline-none`}
          onClick={() => setActiveTab("admin")}
        >
          {t('package.view_contacts') || 'Ver contactos'}
        </button>
        <button
          className={`btn ${activeTab === "consultas" ? "btn-primary" : "btn-outline-primary"} focus-outline-none`}
          onClick={() => setActiveTab("consultas")}
        >
          {t('package.view_queries') || 'Ver consultas'}
        </button>
      </div>
    );
  };

  if (activeTab === "admin") {
    return (
      <div className="container py-5">
        {renderTabs()}
        <AdminContacts />
      </div>
    );
  }

  if (activeTab === "consultas") {
    return (
      <div className="container py-5">
        {renderTabs()}
        <AdminConsultas />
      </div>
    );
  }

  if (!paquete) {
    return (
      <div className="container py-5 text-center">
        <h2>{t('package.not_found') || 'Paquete no encontrado'}</h2>
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() => navigate("/")}
        >
          {t('package.back_home') || 'Volver al inicio'}
        </button>
      </div>
    );
  }

  // Animación mínima y única del contenedor

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
      {renderTabs()}

      {/* Título centrado sobre ambas columnas */}
      <h1 className="text-center text-success fw-bold mb-4">{paquete.title}</h1>

      <div className="row align-items-stretch g-5">
        <div className="col-md-6 d-flex flex-column">
          <img
            src={paquete.image}
            alt={paquete.detail.alt}
            className="img-fluid rounded shadow-lg"
          />
          {/* Descripción breve debajo de la foto */}
          <p className="lead text-muted mt-3">{paquete.detail.descripcion}</p>
          {/* Botón volver debajo de la descripción */}
          <div className="mt-auto">
            <button
              className="btn btn-success btn-lg shadow-sm px-4"
              onClick={() => navigate("/")}
            >
              ← {t('package.back_home') || 'Volver al inicio'}
            </button>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column">
          <h5 className="mt-0 mb-3">{t('package.includes') || 'Incluye:'}</h5>
          <ul className="list-group list-group-flush mb-4">
            {paquete.detail.servicios.map((s, i) => (
              <li key={i} className="list-group-item d-flex align-items-start gap-2">
                <FaCheckCircle className="text-success mt-1" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              className="btn btn-success btn-lg shadow-sm px-4"
              onClick={handlePrecio}
            >
              {t('package.reveal_price') || 'Descubrí el valor aproximado'}
            </button>

            {mostrarPrecio && (
              <div className="alert alert-success text-center fw-bold fs-4 mt-3">
                {new Intl.NumberFormat(i18n.language, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(paquete.priceUSD ?? 0)} {t('package.per_person')}
              </div>
            )}
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default PackageDetail;
