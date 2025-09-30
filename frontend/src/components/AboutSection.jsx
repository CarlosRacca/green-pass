import React, { useState } from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/WhatsApp Image 2025-09-08 at 14.49.42.jpeg";
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';

export default function AboutSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null); // 'vision' | 'mision' | null
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
              {t('about.title') || 'Sobre nosotros'}
            </motion.h2>
            <motion.p
              className="text-muted"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('about.p1') || 'En Green Pass combinamos nuestra pasión por el golf con la hospitalidad y la organización de viajes premium. Diseñamos experiencias a medida, con canchas seleccionadas, hospedajes de primera y gastronomía local, para que solo te enfoques en disfrutar.'}
            </motion.p>
            <motion.p
              className="text-muted"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {t('about.p2') || 'Nuestro equipo te acompaña en todo el proceso: desde la planificación hasta el último hoyo. Queremos que cada viaje sea único y memorable.'}
            </motion.p>
            <div className="mt-3 d-flex gap-2 justify-content-center flex-wrap">
              <button className="btn btn-outline-success" onClick={() => setOpen('vision')}>{t('about.vision_title') || 'Visión'}</button>
              <button className="btn btn-outline-success" onClick={() => setOpen('mision')}>{t('about.mission_title') || 'Misión'}</button>
            </div>
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
      {open && createPortal(
        <div className="position-fixed top-0 start-0 end-0 bottom-0" style={{ background:'rgba(0,0,0,0.4)', zIndex:1060 }} onClick={() => setOpen(null)}>
          <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-3 shadow p-4" style={{ width: 'min(640px, 92vw)' }} onClick={(e)=>e.stopPropagation()}>
            <h5 className="fw-bold mb-2">{open === 'vision' ? (t('about.vision_title') || 'Visión') : (t('about.mission_title') || 'Misión')}</h5>
            <p className="mb-0 text-muted">{open === 'vision' ? (t('about.vision_text') || '') : (t('about.mission_text') || '')}</p>
            <div className="text-end mt-3"><button className="btn btn-success" onClick={() => setOpen(null)}>OK</button></div>
          </div>
        </div>, document.body)
      }
    </section>
  );
}


