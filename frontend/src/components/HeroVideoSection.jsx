import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroVideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const heroVideoUrl = process.env.REACT_APP_HERO_VIDEO_URL || "";
  const heroPosterUrl = process.env.REACT_APP_HERO_POSTER_URL || "";

  // Permite múltiples URLs separadas por coma en REACT_APP_HERO_VIDEO_URLS o una sola en REACT_APP_HERO_VIDEO_URL
  const envList = (process.env.REACT_APP_HERO_VIDEO_URLS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const [playlist, setPlaylist] = useState(envList.length > 0 ? envList : [heroVideoUrl].filter(Boolean));

  // Fallback: si no hay env vars, intentamos cargar /hero/playlist.json desde public
  useEffect(() => {
    if (playlist.length > 0) return;
    let cancelled = false;
    fetch("/hero/playlist.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((arr) => {
        if (!cancelled && Array.isArray(arr) && arr.length > 0) {
          setPlaylist(arr.filter(Boolean));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const getWeekIndex = () => {
    const now = new Date();
    const firstJan = new Date(now.getFullYear(), 0, 1);
    const pastDays = Math.floor((now - firstJan) / 86400000);
    const week = Math.floor((pastDays + firstJan.getDay() + 1) / 7); // aprox ISO week
    return playlist.length > 0 ? (week % playlist.length) : 0;
  };

  const [activeIsA, setActiveIsA] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextReady, setNextReady] = useState(false);
  const [nextPreloadAuto, setNextPreloadAuto] = useState(false);

  useEffect(() => {
    // reajustar índice cuando llegue playlist
    if (playlist.length > 0 && currentIndex === 0) {
      setCurrentIndex(getWeekIndex());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist.length]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const active = videoRef.current;
        if (!active) return;
        if (entry.isIntersecting) {
          active.play().catch(() => {});
        } else {
          try { active.pause(); } catch {}
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: [0.2, 0.4, 0.6],
    });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Manejo de reproducción secuencial usando dos capas con crossfade
  const videoARef = useRef(null);
  const videoBRef = useRef(null);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    // Arranque: A reproduce actual, B precarga el siguiente
    a.play().catch(() => {});
    b.pause();
    b.currentTime = 0;
  }, [playlist.length]);

  const nextIndex = playlist.length > 0 ? ((currentIndex + 1) % playlist.length) : 0;

  // Reset del próximo video: mantener preload en metadata hasta el 60%
  useEffect(() => {
    if (playlist.length === 0) return;
    const nextEl = activeIsA ? videoBRef.current : videoARef.current;
    setNextReady(false);
    setNextPreloadAuto(false);
    if (!nextEl) return;
    try {
      nextEl.pause();
      nextEl.currentTime = 0;
      nextEl.preload = 'metadata';
      nextEl.load();
    } catch {}
  }, [activeIsA, currentIndex, nextIndex, playlist.length]);

  useEffect(() => {
    if (playlist.length === 0) return;
    const id = setInterval(() => {
      const active = activeIsA ? videoARef.current : videoBRef.current;
      const next = activeIsA ? videoBRef.current : videoARef.current;
      if (!active || !next) return;
      const duration = active.duration || 0;
      const time = active.currentTime || 0;
      const progress = duration > 0 ? time / duration : 0;

      // Promover preload a auto al 60% del video activo
      if (!nextPreloadAuto && progress >= 0.6) {
        try {
          setNextPreloadAuto(true);
          const onReady = () => setNextReady(true);
          next.preload = 'auto';
          next.load();
          next.addEventListener('canplaythrough', onReady, { once: true });
        } catch {}
      }

      // Cruce 200ms antes del final si el siguiente está listo
      if (nextReady && duration > 0 && (duration - time) < 0.2) {
        try { next.currentTime = 0; next.play().catch(() => {}); } catch {}
        setActiveIsA((prev) => !prev);
        setCurrentIndex((idx) => (idx + 1) % playlist.length);
      }
    }, 150);
    return () => clearInterval(id);
  }, [activeIsA, nextReady, nextPreloadAuto, playlist.length]);

  return (
    <section ref={sectionRef} className="position-relative" style={{ minHeight: "70vh", backgroundColor: "#000", overflow: "hidden" }}>
      {playlist.length > 0 && (
        <>
          {/* Capa A */}
          <video
            key={`A-${currentIndex}`}
            ref={(el) => {
              videoARef.current = el;
              videoRef.current = activeIsA ? el : videoRef.current;
            }}
            src={playlist[currentIndex]}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={heroPosterUrl || undefined}
            aria-label="Video de experiencia Green Pass"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: activeIsA ? 0.7 : 0, transition: "opacity 250ms ease" }}
          />

          {/* Capa B (siguiente) */}
          <video
            key={`B-${nextIndex}`}
            ref={(el) => {
              videoBRef.current = el;
              videoRef.current = !activeIsA ? el : videoRef.current;
            }}
            src={playlist[nextIndex]}
            autoPlay={false}
            muted
            playsInline
            preload="metadata"
            poster={heroPosterUrl || undefined}
            aria-label="Video de experiencia Green Pass"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: activeIsA ? 0 : 0.7, transition: "opacity 250ms ease" }}
          />
        </>
      )}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.9))" }} />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex flex-column align-items-start text-start justify-content-end py-5 hero-viewport-height" style={{ minHeight: "85vh", maxWidth: 900 }}>
          {/* Logo overlay removido a pedido */}
          <motion.h1
            className="display-3 fw-bold text-white mb-3"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            ¡Viví el golf como nunca antes!
          </motion.h1>
          <motion.p
            className="text-light fs-5 mb-4"
            style={{ maxWidth: 700 }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Sumate a una experiencia exclusiva de golf, relax y naturaleza en los destinos más increíbles de Argentina.
          </motion.p>
          {/* CTA removida por pedido: se mantiene limpio como referencia a vorrath */}
        </div>
      </div>
    </section>
  );
}


