import { useEffect } from 'react';

export default function AdminBridge() {
  useEffect(() => {
    const url = window.location.pathname + window.location.search + window.location.hash;
    // Forzar navegación completa para que el proxy dev redireccione a Next
    window.location.assign(url);
  }, []);
  return null;
}


