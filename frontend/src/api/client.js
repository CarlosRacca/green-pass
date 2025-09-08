import axios from "axios";
import { toast } from "../components/ToastProvider.jsx";

const DEFAULT_BASE_URL = (() => {
  const raw = process.env.REACT_APP_API_URL;
  if (raw) {
    const trimmed = raw.replace(/\/$/, "");
    // Asegurar sufijo /api si no está presente
    return /\/api$/.test(trimmed) ? trimmed : `${trimmed}/api`;
  }
  return "http://localhost:5001/api";
})();

export const api = axios.create({
  baseURL: DEFAULT_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error?.response?.data?.error || 'Error de red';
    toast({ type: 'error', message });
    return Promise.reject(error);
  }
);

export default api;


