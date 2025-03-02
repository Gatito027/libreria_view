<template>
    <div class="container mt-4">
    <h1 class="text-center mb-4">Autores</h1>
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-4" v-for="autor in Autores" :key="autor.autorLibroId">
        <a class="text-decoration-none" :href="`/`">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h4 class="card-title">{{ autor.nombre }}</h4>
              <p class="card-text"><strong>Fecha de publicación:</strong> {{ autor.apellido }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import autorApiClient from '../autorApi.js';

export default {
  name: 'Lista',
  data() {
    return {
      Autores: []
    };
  },
    async created() {
    try {
      const response = await autorApiClient.get('/api/AutorLibro');
      this.Autores = response.data;
      console.log(this.Autores);
    } catch (error) {
      console.error('Error al obtener autores:', error);
    }
  }
};
</script>