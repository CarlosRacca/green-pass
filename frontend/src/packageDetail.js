// src/PackageDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './styles.css'; // Asegúrate de importar el CSS

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate(); // Inicializar useNavigate

  const packages = {
    cordoba: {
      title: "Córdoba",
      description: "Paquete para 8 personas en Córdoba, incluyendo alojamiento, comidas y actividades.",
      price: "$1500 - Valor por persona.",
      details: [
        "3 noches de alojamiento en un hotel 4 estrellas.",
        "Desayuno, almuerzo y cena incluidos.",
        "Excursiones guiadas a los principales puntos turísticos.",
        "Actividades como senderismo y visitas a bodegas.",
        "Transporte durante toda la estadía.",
        "Seguro de viaje."
      ],
    },
    salta: {
      title: "Salta",
      description: "Paquete para 8 personas en Salta.",
      price: "$1550 - Valor por persona.",
      details: [
        "4 noches de alojamiento en un hotel boutique.",
        "Desayuno y cenas en restaurantes locales.",
        "Excursiones a los Valles Calchaquíes.",
        "Actividades como paseos en bicicleta.",
        "Transporte privado durante las excursiones.",
        "Seguro de viaje."
      ],
    },
    patagonia: {
      title: "Patagonia",
      description: "Paquete para 8 personas en la Patagonia.",
      price: "$1600 - Valor por persona.",
      details: [
        "5 noches de alojamiento en cabañas.",
        "Desayuno y cenas con productos locales.",
        "Actividades como pesca y senderismo.",
        "Transporte durante toda la estadía.",
        "Seguro de viaje."
      ],
    }
  };

  const selectedPackage = packages[packageId];

  return (
    <div className="container package-detail">
      {selectedPackage ? (
        <div>
          <h2>{selectedPackage.title}</h2>
          <p>{selectedPackage.description}</p>
          <p><strong>{selectedPackage.price}</strong></p>
          <h4>Detalles del Paquete:</h4>
          <ul>
            {selectedPackage.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <button className="back-button" onClick={() => navigate('/')}>Volver al Menú Principal</button>
        </div>
      ) : (
        <p>Paquete no encontrado.</p>
      )}
    </div>
  );
};

export default PackageDetail;