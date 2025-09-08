import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/1133681576"
      className="position-fixed"
      style={{
        right: 20,
        bottom: 20,
        zIndex: 1080,
      }}
      aria-label="Chatear por WhatsApp"
    >
      <div
        className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center animate__animated animate__pulse animate__infinite"
        style={{ width: 56, height: 56, boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}
      >
        <FaWhatsapp size={28} />
      </div>
    </a>
  );
}


