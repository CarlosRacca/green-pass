import React from "react";
import { useNavigate } from "react-router-dom";

const paquetes = [
  {
    id: "llao-llao",
    nombre: "Llao Llao Experience",
    descripcion: "Golf, lujo y naturaleza en el corazón de Bariloche.",
    imagen: "/img/llao.jpg",
  },
  {
    id: "chapelco",
    nombre: "Chapelco Adventure",
    descripcion: "Disfrutá del golf en la Patagonia, con paisajes únicos.",
    imagen: "/img/chapelco.jpg",
  },
  {
    id: "el-terron",
    nombre: "El Terrón Golf Week",
    descripcion: "Una semana de golf y relax en Córdoba.",
    imagen: "/img/elterron.jpg",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Nuestros paquetes de golf</h2>
      <div className="row g-4">
        {paquetes.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card h-100 shadow">
              <img
                src={p.imagen}
                className="card-img-top"
                alt={p.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{p.descripcion}</p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => navigate(`/package/${p.id}`)}
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
