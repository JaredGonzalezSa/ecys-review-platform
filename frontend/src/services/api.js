import axios from 'axios';

// Instancia global de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta esto si el puerto cambia
});

// Interceptor para inyectar el token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
