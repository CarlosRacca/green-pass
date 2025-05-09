import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PackageDetail() {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const renderDetalle = (data) => (
    <div className="container py-5">
      <button
        className="btn btn-outline-dark mb-4 px-4 rounded-pill"
        onClick={() => navigate("/")}
      >
        ← Volver al inicio
      </button>

      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <img
            src={data.imagen}
            alt={data.alt}
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3 text-success fw-bold">{data.titulo}</h1>
          <p className="lead text-muted">{data.descripcion}</p>

          <h5 className="mt-4 mb-3">Incluye:</h5>
          <ul className="list-group list-group-flush mb-4">
            {data.servicios.map((s, i) => (
              <li key={i} className="list-group-item">
                ✅ {s}
              </li>
            ))}
          </ul>

          <button className="btn btn-success btn-lg shadow-sm px-4">
            Consultar disponibilidad
          </button>
        </div>
      </div>
    </div>
  );

  if (packageId === "llao-llao") {
    return renderDetalle({
      imagen: "/img/llao.jpg",
      alt: "Llao Llao",
      titulo: "Llao Llao Experience",
      descripcion:
        "Disfrutá de una experiencia premium en Bariloche, combinando golf, spa y naturaleza en el icónico hotel Llao Llao.",
      servicios: [
        "3 noches en Llao Llao Resort",
        "2 green fees en Arelauquen y Llao Llao Golf",
        "Traslados privados",
        "Desayuno buffet",
      ],
    });
  }

  if (packageId === "chapelco") {
    return renderDetalle({
      imagen: "/img/chapelco.jpg",
      alt: "Chapelco",
      titulo: "Chapelco Adventure",
      descripcion:
        "Golf y aventura en la Patagonia. Jugá en uno de los mejores campos de Sudamérica con vista a los Andes.",
      servicios: [
        "4 noches en Loi Suites Chapelco",
        "3 rondas de golf",
        "Traslados aeropuerto-hotel",
        "Actividades outdoor opcionales",
      ],
    });
  }

  if (packageId === "el-terron") {
    return renderDetalle({
      imagen: "/img/El terron golf.jpg",
      alt: "El Terrón",
      titulo: "El Terrón Golf Week",
      descripcion:
        "Una semana en Córdoba con golf ilimitado, gastronomía gourmet y relax total.",
      servicios: [
        "5 noches en Estancia El Terrón",
        "Green fees ilimitados",
        "Clases de golf personalizadas",
        "Cena gourmet incluida",
      ],
    });
  }

  return (
    <div className="container py-5 text-center">
      <h2>Paquete no encontrado</h2>
      <button className="btn btn-outline-secondary mt-3" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default PackageDetail;
