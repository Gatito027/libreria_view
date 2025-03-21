import axios from 'axios';

const autorApiClient = axios.create({
  baseURL: 'http://www.AplicacionPrueba1.somee.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

autorApiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

export default autorApiClient;