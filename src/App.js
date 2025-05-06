import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';
import logo from './Assets/GP VERDE Y BLANCO.png'; // Cambia el nombre del archivo según corresponda
import salta from './Assets/Salta golf.jpg';
import chapelco from './Assets/chapelco golf.jpg';
import terron from './Assets/El terron golf.jpg';
import llao from './Assets/llao llao golf.jpg';
import chapelco2 from './Assets/chapelco 2.jpg';
import houseTerron from './Assets/House terron.jpeg';
import PackageDetail from './packageDetail'; // Importa el nuevo componente
import { Route, Routes , Link} from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white text-center py-5">
      <img src={logo} alt="Logo de Green Pass" className="img-fluid" style={{ maxWidth: '200px' }} />
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={llao} className="d-block w-100"/>
            </div>
            <div className="carousel-item">
              <img src={chapelco2} className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src={houseTerron} className="d-block w-100"/>
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

    <div className="App">
      <Routes>
        <Route path="/" element={          <main className="container my-5">
          <h2>Nuestros Paquetes</h2>
          <br></br>
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100">
                <img src={terron} className="card-img-top" alt="Cordoba" />
                <div className="card-body">
                  <h5 className="card-title">Córdoba</h5>
                  <p className="card-text">Paquete para 8 personas</p>
                  <p className="card-text">$1500 - Valor por persona.</p>
                  <Link to="/package/cordoba" className="btn btn-primary">Más Información</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <img src={salta} className="card-img-top" alt="Salta" />
                <div className="card-body">
                  <h5 className="card-title">Salta</h5>
                  <p className="card-text">Paquete para 8 personas</p>
                  <p className="card-text">$1550 - Valor por persona.</p>
                  <Link to="/package/salta" className="btn btn-primary">Más Información</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <img src={chapelco} className="card-img-top" alt="Patagonia" />
                <div className="card-body">
                  <h5 className="card-title">Patagonia</h5>
                  <p className="card-text">Paquete para 8 personas</p>
                  <p className="card-text">$1600 - Valor por persona.</p>
                  <Link to="/package/patagonia" className="btn btn-primary">Más Información</Link>
                </div>
              </div>
            </div>
          </div>
        </main>} />
        <Route path="/package/:packageId" element={<PackageDetail />} />
      </Routes>
    </div>
      <Routes>
        <Route path="/package/:packageId" component={PackageDetail} />
      </Routes>
    </div>
  );
}

export default App;
