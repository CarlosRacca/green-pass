import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const paquetes = {
  "llao-llao": {
    nombre: "Llao Llao Experience",
    descripcion: "Disfrutá de una experiencia premium en Bariloche, combinando golf, spa y naturaleza en el icónico hotel Llao Llao.",
    imagen: "/img/llao.jpg",
    servicios: [
      "3 noches en Llao Llao Resort",
      "2 green fees en Arelauquen y Llao Llao Golf",
      "Traslados privados",
      "Desayuno buffet",
    ],
  },
  "chapelco": {
    nombre: "Chapelco Adventure",
    descripcion: "Golf y aventura en la Patagonia. Juga en uno de los mejores campos de Sudamérica con vista a los Andes.",
    imagen: "/img/chapelco.jpg",
    servicios: [
      "4 noches en Loi Suites Chapelco",
      "3 rondas de golf",
      "Traslados aeropuerto-hotel",
      "Actividades outdoor opcionales",
    ],
  },
  "el-terron": {
    nombre: "El Terrón Golf Week",
    descripcion: "Una semana en Córdoba con golf ilimitado, gastronomía gourmet y relax total.",
    imagen: "/img/elterron.jpg",
    servicios: [
      "5 noches en Estancia El Terrón",
      "Green fees ilimitados",
      "Clases de golf personalizadas",
      "Cena gourmet incluida",
    ],
  },
};

function PackageDetail() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const paquete = paquetes[packageId];

  if (!paquete) {
    return (
      <div className="container py-5 text-center">
        <h2>Paquete no encontrado</h2>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button className="btn btn-link mb-3" onClick={() => navigate("/")}>
        ← Volver
      </button>
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={paquete.imagen}
            alt={paquete.nombre}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>{paquete.nombre}</h2>
          <p className="lead">{paquete.descripcion}</p>
          <h5 className="mt-4">Incluye:</h5>
          <ul>
            {paquete.servicios.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
          <button className="btn btn-success mt-3">Consultar disponibilidad</button>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;
