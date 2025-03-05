<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-body">
        <h1 class="card-title">{{ libro.titulo }}</h1>
        <h6 class="card-subtitle mb-2 text-muted">Fecha de publicación: {{ libro.fechaPublicacion }}</h6>
        <div class="d-flex align-items-center mb-3">
          <div>
            <h5 class="mb-0">{{ autor.nombre }} {{ autor.apellido }}</h5>
            <p class="mb-0"><small>Fecha de nacimiento: {{ autor.fechaNacimiento }}</small></p>
          </div>
        </div>
        <h5>Grados Académicos:</h5>
        <div>
          <span v-for="gradoAcademico in autor.gradosAcademicos" :key="gradoAcademico.gradoAcademicoId" class="badge rounded-pill bg-success me-2 mb-2">{{ gradoAcademico.nombre }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../api.js';
import autorApiClient from '../autorApi.js';
import { ref, onMounted } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Libro',
  setup() {
    const libro = ref({});
    const autor = ref({});

    onMounted(async () => {
      try {
        // Extraer el parámetro 'id' de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const response = await apiClient.get(`/api/LibroMaterial/${id}`);
        libro.value = response.data;

        // Asegúrate de que el ID del autor esté disponible antes de hacer la solicitud
        if (libro.value.autorLibro) {
          const responseAutor = await autorApiClient.get(`/api/AutorLibro/${libro.value.autorLibro}`);
          autor.value = responseAutor.data;
          console.log(autor.value);
        }
      } catch (error) {
        console.error('Error al obtener el libro y/o el autor:', error);
      }
    });

    return {
      libro,
      autor
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card-title {
  font-size: 2rem;
  color: #333;
}

.card-subtitle {
  font-size: 1rem;
  color: #6c757d;
}

.card-body {
  font-size: 1rem;
}

.badge {
  font-size: 0.9rem;
}
</style>
