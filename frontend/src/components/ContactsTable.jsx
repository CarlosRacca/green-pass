import React, { useState } from 'react';

const ContactsTable = ({ data }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('fecha');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  const filteredData = data
    .filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginated = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort('nombre')}>Nombre</th>
            <th onClick={() => handleSort('apellido')}>Apellido</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('telefono')}>Teléfono</th>
            <th onClick={() => handleSort('matricula')}>Matrícula</th>
            <th onClick={() => handleSort('fecha')}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((c) => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.email}</td>
              <td>{c.telefono}</td>
              <td>{c.matricula}</td>
              <td>{new Date(c.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ContactsTable;
