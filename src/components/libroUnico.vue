<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">{{ libro.titulo }}</h1>
          <h6 class="card-subtitle mb-2 text-muted">Fecha de publicación: {{ libro.fechaPublicacion }}</h6>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';
  import { ref, onMounted } from 'vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Libro',
    setup() {
      const libro = ref({});
  
      onMounted(async () => {
        try {
          // Extraer el parámetro 'id' de la URL
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');
          console.log(id);
          const response = await apiClient.get(`/api/LibroMaterial/${id}`);
          libro.value = response.data;
          console.log(libro.value);
        } catch (error) {
          console.error('Error al obtener libros:', error);
        }
      });
  
      return {
        libro
      };
    }
  });
  </script>
  
  <style>
  /* Añade tus estilos aquí */
  </style>
  