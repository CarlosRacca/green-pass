import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { paquetes } from "../data/paquetes.js";
import { FaCheckCircle } from "react-icons/fa";
import AdminContacts from "./AdminContacts.js";
import AdminConsultas from "./AdminConsultas.js";

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

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
      setError("No se pudo registrar la consulta");
      console.error("Error al registrar la consulta:", err);
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
          Ver contactos
        </button>
        <button
          className={`btn ${activeTab === "consultas" ? "btn-primary" : "btn-outline-primary"} focus-outline-none`}
          onClick={() => setActiveTab("consultas")}
        >
          Ver consultas
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
        <h2>Paquete no encontrado</h2>
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // Animación mínima y única del contenedor

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
      {renderTabs()}

      <button
        className="btn btn-outline-dark mb-4 px-4 rounded-pill"
        onClick={() => navigate("/")}
      >
        ← Volver al inicio
      </button>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <img
            src={paquete.image}
            alt={paquete.detail.alt}
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3 text-success fw-bold">{paquete.title}</h1>
          <p className="lead text-muted">{paquete.detail.descripcion}</p>

          <h5 className="mt-4 mb-3">Incluye:</h5>
          <ul className="list-group list-group-flush mb-4">
            {paquete.detail.servicios.map((s, i) => (
              <li key={i} className="list-group-item d-flex align-items-start gap-2">
                <FaCheckCircle className="text-success mt-1" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          {!mostrarPrecio ? (
            <button
              className="btn btn-success btn-lg shadow-sm px-4"
              onClick={handlePrecio}
            >
              Descubrí el valor aproximado
            </button>
          ) : (
            <div className="alert alert-success text-center fw-bold fs-4">
              {paquete.precio}
            </div>
          )}

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default PackageDetail;
