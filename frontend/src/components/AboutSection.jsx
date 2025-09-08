import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/WhatsApp Image 2025-09-08 at 14.49.42.jpeg";

export default function AboutSection() {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6">
            <motion.h2
              className="fw-bold mb-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Sobre nosotros
            </motion.h2>
            <motion.p
              className="text-muted"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              En Green Pass combinamos nuestra pasión por el golf con la hospitalidad y la organización de viajes premium. Diseñamos experiencias a medida, con canchas seleccionadas, hospedajes de primera y gastronomía local, para que solo te enfoques en disfrutar.
            </motion.p>
            <motion.p
              className="text-muted"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Nuestro equipo te acompaña en todo el proceso: desde la planificación hasta el último hoyo. Queremos que cada viaje sea único y memorable.
            </motion.p>
          </div>
          <div className="col-12 col-md-6">
            <motion.div
              className="rounded-4 bg-light overflow-hidden shadow-sm"
              style={{ height: 320 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src={aboutImg} alt="Green Pass" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


