import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/GP VERDE Y BLANCO.png";
import llao from "../assets/img/llao llao golf.jpg"
import chapelco2 from "../assets/img/chapelco 2.jpg";
import houseTerron from "../assets/img/House terron.jpeg";

function Header() {
  return (
    <header className="bg-primary text-white text-center py-5">
      <img src={logo} alt="Logo de Green Pass" className="img-fluid" style={{ maxWidth: "200px" }} />
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={llao} className="d-block w-100" alt="Imagen de fondo" />
          </div>
          <div className="carousel-item">
            <img src={chapelco2} className="d-block w-100" alt="Imagen de fondo" />
          </div>
          <div className="carousel-item">
            <img src={houseTerron} className="d-block w-100" alt="Imagen de fondo" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <a href="https://wa.me/1133681576" className="btn btn-success mt-3">
        <FaWhatsapp /> Contáctanos por WhatsApp
      </a>
    </header>
  );
}

export default Header;
