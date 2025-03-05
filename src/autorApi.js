import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://www.AutorLibroMicroservice.somee.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

export default apiClient;