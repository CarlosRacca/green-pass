import { useEffect } from 'react';

export default function RedirectToAdmin() {
  useEffect(() => {
    // Navega a la exportación estática del admin embebido en el mismo host
    window.location.href = '/admin-next/';
  }, []);
  return null;
}


