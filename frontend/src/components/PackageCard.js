import React from "react";

const PackageCard = ({ image, title, description, link }) => {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow border-0">
        <img
          src={image}
          alt={title}
          className="card-img-top"
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={link} className="btn btn-success mt-auto">
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;