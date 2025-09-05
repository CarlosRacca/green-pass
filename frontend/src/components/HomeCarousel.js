import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { paquetes } from "../data/paquetes.js";

const HomeCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <motion.h2
        className="text-center mb-5 fw-bold display-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explorá nuestras experiencias de golf
      </motion.h2>
      <div className="position-relative">
        <div className="overflow-hidden position-relative">
          <div className="d-flex overflow-auto gap-4 pb-3 px-2" style={{ scrollSnapType: 'x mandatory' }}>
            {paquetes.map((paquete) => (
              <motion.div
                key={paquete.id}
                className="flex-shrink-0"
                style={{ width: '300px', scrollSnapAlign: 'start' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card h-100 shadow border-0">
                  <img
                    src={paquete.image}
                    alt={paquete.detail.alt}
                    className="card-img-top"
                    loading="lazy"
                    decoding="async"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-success fw-bold text-center">
                      {paquete.title}
                    </h5>
                    <p className="card-text text-muted text-center">
                      {paquete.description}
                    </p>
                    <button
                      className="btn btn-success mt-auto"
                      onClick={() => navigate(`/package/${paquete.id}`)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mt-3 text-muted">
          <small>Desliza lateralmente para ver más paquetes</small>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
