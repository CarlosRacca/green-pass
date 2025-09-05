import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PackageCard = ({ image, title, description, link }) => {
  return (
    <div className="col-md-4">
      <motion.div whileHover={{ y: -4, boxShadow: "0 0.75rem 1.5rem rgba(0,0,0,0.15)" }} className="card h-100 shadow border-0">
        <img
          src={image}
          alt={title}
          className="card-img-top"
          loading="lazy"
          decoding="async"
          width="400"
          height="220"
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">{title}</h5>
          <p className="card-text">{description}</p>
          <Link to={link} className="btn btn-success mt-auto">
            Ver más
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PackageCard;