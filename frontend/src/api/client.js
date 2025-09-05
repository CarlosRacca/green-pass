import axios from "axios";

const DEFAULT_BASE_URL = (() => {
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
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

export default api;


