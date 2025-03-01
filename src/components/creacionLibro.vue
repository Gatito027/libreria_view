<template>
  <div class="container mt-5">
    <h1 class="mb-4">Agregar Libro</h1>
    <form @submit.prevent="crearLibro" class="was-validated">
      <div class="mb-3">
        <label for="titulo" class="form-label">Título del libro</label>
        <input type="text" class="form-control" id="titulo" v-model="nuevoLibro.titulo" placeholder="Título del libro" required/>
      </div>
      <div class="mb-3">
        <label for="fechaPublicacion" class="form-label">Fecha publicación</label>
        <input type="datetime-local" class="form-control" id="fechaPublicacion" v-model="nuevoLibro.fechaPublicacion" placeholder="Fecha publicación" required/>
      </div>
      <div class="mb-3">
        <label for="autorLibro" class="form-label">Autor del libro</label>
        <input type="text" class="form-control" id="autorLibro" v-model="nuevoLibro.AutorLibro" placeholder="Autor del libro" required/>
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
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
        titulo: '',
        fechaPublicacion: '',
        AutorLibro: ''
      }
    };
  },
  methods: {
    async crearLibro() {
      try {
        const libroData = {
          titulo: this.nuevoLibro.titulo,
          fechaPublicacion: this.nuevoLibro.fechaPublicacion,
          AutorLibro: this.nuevoLibro.AutorLibro
        };
        //console.log('Datos enviados:', libroData);

        const response = await apiClient.post('/api/LibroMaterial', libroData);
        console.log('Respuesta del servidor:', response.data);

        this.nuevoLibro.titulo = '';
        this.nuevoLibro.fechaPublicacion = '';
        this.nuevoLibro.AutorLibro = '';
      } catch (error) {
        console.error('Error al crear libro:', error);
      }
    }
  }
};
</script>
