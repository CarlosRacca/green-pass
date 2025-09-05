import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext({ addToast: () => {} });

let externalAddToast = null;
export function toast({ type = "info", message }) {
  if (externalAddToast) externalAddToast({ type, message });
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, message }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  externalAddToast = addToast;

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
        {toasts.map((t) => (
          <div key={t.id} className={`toast show mb-2 text-white ${t.type === 'error' ? 'bg-danger' : t.type === 'success' ? 'bg-success' : 'bg-dark'}`}>
            <div className="toast-body">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}


