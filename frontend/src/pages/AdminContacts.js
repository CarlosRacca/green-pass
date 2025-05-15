import React, { useEffect, useState } from 'react';
import ContactsTable from '../components/ContactsTable.jsx';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact/admin?password=supersecreto123`);
        const data = await res.json();
        if (data.success) {
          setContacts(data.data);
        } else {
          setError('Error al cargar los contactos.');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4">Contactos registrados</h3>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <ContactsTable data={contacts} />
      )}
    </div>
  );
};

export default AdminContacts;
