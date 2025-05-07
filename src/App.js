import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';
import logo from './Assets/GP VERDE Y BLANCO.png';
import salta from './Assets/Salta golf.jpg';
import chapelco from './Assets/chapelco golf.jpg';
import terron from './Assets/El terron golf.jpg';
import llao from './Assets/llao llao golf.jpg';
import chapelco2 from './Assets/chapelco 2.jpg';
import houseTerron from './Assets/House terron.jpeg';
import PackageDetail from './packageDetail';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showContactFormModal, setShowContactFormModal] = useState(false);
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleContactFormModalToggle = () => {
    setShowContactFormModal(!showContactFormModal);
  };

  return (
    <div className="App">
      <header className="bg-primary text-white text-center py-5">
        <img src={logo} alt="Logo de Green Pass" className="img-fluid" style={{ maxWidth: '200px' }} />
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active position-relative">
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

      <div className="App">
        <Routes>
          <Route path="/" element={
            <main className="container my-5">
              <h2>Nuestros Paquetes</h2>
              <br />
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
            </main>
          } />
          <Route path="/package/:packageId" element={<PackageDetail />} />
        </Routes>
      </div>

      {/* Sección de contacto */}
      <footer className="bg-dark text-white text-center py-5" style={{ backgroundColor: '#006742' }}>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <img src={logo} alt="Logo de Green Pass" className="img-fluid mb-3" style={{ maxWidth: '150px' }} />
            <div className="ml-3">
              <h3>Contáctanos</h3>
              <p className="mb-1">Instagram: @tuempresa</p>
              <p className="mb-1">Email: contacto@tuempresa.com</p>
              <button className="btn btn-info" style={{ backgroundColor: '#F5BA67', color: '#001E26' }} onClick={handleModalToggle}>¿Quiénes somos?</button>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Si te parece, puedes dejarnos tus datos y nosotros te contactamos.</h4>
            <button className="btn btn-info" style={{ backgroundColor: '#F5BA67', color: '#001E26' }} onClick={handleContactFormModalToggle}>Déjanos tus datos</button>
          </div>
        </div>
      </footer>

      {/* Modal "Quiénes somos" */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Quiénes Somos</h5>
                <button type="button" className="btn-close" onClick={handleModalToggle}></button>
              </div>
              <div className="modal-body">
                <p>
                  Somos una empresa de dos golfistas argentinos que buscamos trasladar nuestros años de experiencia en un negocio. Green Pass es una empresa argentina dedicada a diseñar viajes y brindar experiencias superadoras para grupos de amigos que buscan experiencias inolvidables. Nuestro enfoque es brindar un servicio integral, donde cada detalle está cuidadosamente planificado para garantizar que nuestros clientes disfruten al máximo, pudiendo disfrutar sin preocuparse de gestionar nada. Además, ofrecemos un servicio de asistencia al golfista viajero para que el “capitán del equipo” esté constantemente en contacto con el equipo de Green Pass por cualquier necesidad.
                </p>
                <h6>Visión:</h6>
                <p>
                  Incentivar el deporte, que todas las personas se animen a vivir grandes momentos con amigos, creando experiencias de viajes únicos en Argentina.
                </p>
                <h6>Misión:</h6>
                <p>
                  Ofrecer a grupos una experiencia de viajes de golf en Argentina, combinando la pasión por el golf con las visitas a las provincias y lugares más lindos del país, diseñando el viaje a medida.
                </p>
                <h6>¿Qué ofrecemos?</h6>
                <p>
                  Green Pass es una empresa argentina dedicada a diseñar viajes y brindar experiencias superadoras. Ofrecemos servicio de viaje a grupos de amigos que quieran disfrutar de jugar al golf y viajar en Argentina.
                </p>
                <h6>Propuesta de Valor:</h6>
                <p>
                  La propuesta de valor diferencial es ofrecer un viaje totalmente completo para que el golfista pueda viajar y disfrutar sin tener que preocuparse de todo lo que es la parte de reservas, alquileres, pago de Green fees, reservar horarios de salidas, y más.
                </p>
                <h6>Ofrecemos más de tres tipos de viaje:</h6>
                <ul>
                  <li><strong>Paquete Signature:</strong> Experiencia all inclusive.</li>
                  <li><strong>Paquete Full:</strong> Experiencia superadora.</li>
                  <li><strong>Paquete Básico:</strong> Todo lo esencial para asegurar un gran viaje de golf.</li>
                </ul>
                <h6>Además, ofrecemos:</h6>
                <ul>
                  <li><strong>Aviones, traslados y más:</strong> Traslados seguros y de calidad.</li>
                  <li><strong>Hospedajes:</strong> Selección de casas y hoteles boutiques lujosos.</li>
                  <li><strong>Golf:</strong> Reserva de Tee Times y Golf Carts.</li>
                  <li><strong>Sistema de competencia:</strong> Herramienta digital para competencias.</li>
                  <li><strong>Servicio de gastronomía:</strong> Comidas de autor privadas y exclusivas.</li>
                  <li><strong>Merchandising:</strong> Kit de bienvenida y premios.</li>
                  <li><strong>Gift Card:</strong> Boucher inicial para compras digitales.</li>
                  <li><strong>Membresía y club de aliados:</strong> Membresía bonificada al viajar con nosotros.</li>
                </ul>
                <h6>Marketing:</h6>
                <p>
                  Estrategia comercial para darnos a conocer como marca. Atraer a los golfistas y grupos de amigos, logrando una imagen clara y concisa en redes sociales.
                </p>
                <h6>Nuestro Compromiso:</h6>
                <p>
                  Comprometidos con la satisfacción total de nuestros clientes, asegurando experiencias memorables en cada viaje.
                </p>
                <h6>Nuestra intención:</h6>
                <p>
                  Impactar positivamente en las vidas de las personas, promoviendo la felicidad a través del golf y los viajes.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal del formulario de contacto */}
      {showContactFormModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Formulario de Contacto</h5>
                <button type="button" className="btn-close" onClick={handleContactFormModalToggle}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control form-control-sm" id="nombre" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control form-control-sm" id="apellido" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control form-control-sm" id="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="tel" className="form-control form-control-sm" id="telefono" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="matricula" className="form-label">Matrícula de Golf</label>
                    <input type="text" className="form-control form-control-sm" id="matricula" required />
                  </div>
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;