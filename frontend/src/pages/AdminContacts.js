import React, { useState } from 'react';
import ContactsTable from '../components/ContactsTable.jsx';

const AdminContacts = () => {
  const [password, setPassword] = useState('');
  const [contacts, setContacts] = useState([]);
  const [autorizado, setAutorizado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`http://localhost:5001/api/contact/admin?password=${password}`);
      const data = await res.json();

      if (data.success) {
        setContacts(data.data);
        setAutorizado(true);
      } else {
        setError('Contraseña incorrecta');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="container py-4">
      {!autorizado ? (
        <form onSubmit={handleSubmit} className="text-center">
          <h3>Área privada</h3>
          <p>Ingrese la contraseña para acceder a los contactos:</p>
          <input
            type="password"
            className="form-control w-50 mx-auto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary mt-3">Acceder</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      ) : (
        <>
          <h3 className="mb-4">Contactos registrados</h3>
          <ContactsTable data={contacts} />
        </>
      )}
    </div>
  );
};

export default AdminContacts;

