import React from "react";
import { motion } from "framer-motion";
import { FaGolfBallTee, FaPlaneDeparture, FaHotel } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

export default function HomeHowItWorks() {
  const { t } = useTranslation();
  const steps = [
    { icon: <FaGolfBallTee size={28} />, title: t('how.step1.title'), text: t('how.step1.text') },
    { icon: <FaPlaneDeparture size={28} />, title: t('how.step2.title'), text: t('how.step2.text') },
    { icon: <FaHotel size={28} />, title: t('how.step3.title'), text: t('how.step3.text') },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <motion.h2
          className="text-center mb-4 fw-bold"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('how.title')}
        </motion.h2>
        <div className="row g-4">
          {steps.map((s, i) => (
            <div key={i} className="col-12 col-md-4">
              <motion.div
                className="h-100 p-4 bg-white rounded-3 shadow-sm text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="mb-3 text-success">{s.icon}</div>
                <h5 className="fw-bold mb-2">{s.title}</h5>
                <p className="text-muted mb-0">{s.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


