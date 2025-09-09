import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminLayout = ({ title, breadcrumbs = [], children, actions = null }) => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "guest";

  return (
    <div className="container mt-4 mb-5">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/panel">Panel</Link>
          </li>
          {breadcrumbs.map((bc, idx) => (
            <li
              key={idx}
              className={`breadcrumb-item ${bc.active ? "active" : ""}`}
              aria-current={bc.active ? "page" : undefined}
            >
              {bc.to && !bc.active ? <Link to={bc.to}>{bc.label}</Link> : bc.label}
            </li>
          ))}
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0 text-success fw-bold">{title}</h2>
        <div className="d-flex align-items-center" style={{ gap: 8 }}>
          {role === 'superadmin' && (
            <a href="https://admin-h6lrbxde1-carlos-raccas-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success">Admin</a>
          )}
          {actions}
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;


