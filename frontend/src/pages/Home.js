import React from "react";
import "./Home.css"; // Agregamos estilos personalizados si querés
import { useNavigate } from "react-router-dom";
import llao from "../assets/img/llao llao golf.jpg";
import chapelco from "../assets/img/chapelco golf.jpg";
import elterron from "../assets/img/El terron golf.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold display-5">Explorá nuestras experiencias de golf</h2>

      <div className="row g-4">

        {/* Llao Llao */}
        <div className="col-md-4">
          <div className="card h-100 shadow border-0">
            <img src={llao} alt="Llao Llao" className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-primary">Llao Llao Experience</h5>
              <p className="card-text">Golf, lujo y naturaleza en el corazón de Bariloche.</p>
              <button className="btn btn-success mt-auto" onClick={() => navigate("/package/llao-llao")}>
                Ver más
              </button>
            </div>
          </div>
        </div>

        {/* Chapelco */}
        <div className="col-md-4">
          <div className="card h-100 shadow border-0">
            <img src={chapelco} alt="Chapelco" className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-primary">Chapelco Adventure</h5>
              <p className="card-text">Disfrutá del golf en la Patagonia, con paisajes únicos.</p>
              <button className="btn btn-success mt-auto" onClick={() => navigate("/package/chapelco")}>
                Ver más
              </button>
            </div>
          </div>
        </div>

        {/* El Terrón */}
        <div className="col-md-4">
          <div className="card h-100 shadow border-0">
            <img src={elterron} alt="El Terrón" className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-primary">El Terrón Golf Week</h5>
              <p className="card-text">Una semana de golf y relax en Córdoba.</p>
              <button className="btn btn-success mt-auto" onClick={() => navigate("/package/el-terron")}>
                Ver más
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
