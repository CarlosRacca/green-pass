import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";

export default function HomeLoginCTA() {
  const { user } = useContext(AuthContext);
  if (user) return null;

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <motion.div
          className="p-4 p-md-5 rounded-4 shadow-sm d-flex flex-column flex-md-row align-items-center justify-content-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="me-md-3 text-center text-md-start">
            <h3 className="fw-bold mb-2">Accedé a tu experiencia</h3>
            <p className="text-muted mb-0">Ingresá para ver tus viajes, itinerarios y beneficios exclusivos.</p>
          </div>
          <div className="mt-3 mt-md-0">
            <Link to="/login" className="btn btn-success px-4 py-2">Ingresar</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


