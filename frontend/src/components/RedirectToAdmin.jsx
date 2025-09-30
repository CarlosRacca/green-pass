import { useEffect } from 'react';

export default function RedirectToAdmin() {
  useEffect(() => {
    window.location.replace('/admin-next');
  }, []);
  return null;
}


