import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { paquetes } from "../data/paquetes.js";
import { useTranslation } from 'react-i18next';

export default function FeaturedExperiences() {
  const featured = paquetes.filter(p => p.id !== 'llao-llao').slice(0, 6);
  const { t } = useTranslation();

  return (
    <section id="work" className="py-5">
      <div className="container">
        <motion.h2
          className="text-center mb-4 fw-bold"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('home.featured') || 'Experiencias destacadas'}
        </motion.h2>
        <div className="row g-4">
          {featured.map((p, idx) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <motion.div
                className="position-relative overflow-hidden rounded-4 shadow-sm d-flex flex-column"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={p.image}
                  alt={p.detail.alt}
                  className="w-100"
                  loading="lazy"
                  decoding="async"
                  style={{ height: 220, objectFit: "cover" }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }} />
                <div className="position-absolute start-0 end-0 p-3 text-white d-flex flex-column" style={{ bottom: 0 }}>
                  <h5 className="fw-bold mb-1">{p.title}</h5>
                  <p className="mb-2 small opacity-75 flex-grow-1">{p.description}</p>
                  <div className="mt-auto">
                    <Link to={`/package/${p.id}`} className="btn btn-light btn-sm text-dark w-auto">
                      {t('home.see_more') || 'Ver más'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


