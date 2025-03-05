<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Libros</h1>
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-4" v-for="libro in libros" :key="libro.libreriaMateriaId">
        <a class="text-decoration-none" :href="`/libroUnico?id=${libro.libreriaMateriaId}`">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h4 class="card-title">{{ libro.titulo }}</h4>
              <p class="card-text"><strong>Fecha de publicación:</strong> {{ libro.fechaPublicacion }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  name: 'Libros',
  data() {
    return {
      libros: []
    };
  },
  async created() {
    try {
      const response = await apiClient.get('/api/LibroMaterial');
      this.libros = response.data;
      console.log(this.libros);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 960px;
}

.card-title {
  font-size: 1.5rem;
  color: #333;
}

.card-text {
  font-size: 1rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-img-top {
  height: 250px;
  object-fit: cover;
}

.text-muted {
  color: #6c757d !important;
}

/* Estilos adicionales para el efecto hover */
.card:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.card:hover .card-title {
  color: #007bff;
}
</style>