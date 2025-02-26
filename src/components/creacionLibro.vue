<template>
    <div>
      <h1>Agregar Libro</h1>
      <form @submit.prevent="crearLibro">
        <input v-model="nuevoLibro.titulo" placeholder="Título del libro" />
        <button type="submit">Agregar</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../api.js';
  
  export default {
    name: 'Crear',
    data() {
      return {
        nuevoLibro: {
          titulo: ''
        }
      };
    },
    methods: {
      async crearLibro() {
        try {
          await apiClient.post('/api/LibroMaterial', this.nuevoLibro);
          this.nuevoLibro.titulo = '';
          // Aquí podrías actualizar la lista de libros, si es necesario
        } catch (error) {
          console.error('Error al crear libro:', error);
        }
      }
    }
  }

  </script>
  