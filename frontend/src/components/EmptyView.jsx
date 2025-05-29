import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyView = ({ message = "Todavía no hay nada para mostrar.", backLabel = "Volver al menú" }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center py-5" style={{ minHeight: "60vh" }}>
      <h4 className="mb-4">{message}</h4>
      <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
        {backLabel}
      </button>
    </div>
  );
};

export default EmptyView;

