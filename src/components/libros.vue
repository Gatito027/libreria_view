<template>
  <div>
    <h1>Libros</h1>
    <pre>{{ libros }}</pre> <!-- Mostrar el JSON completo -->
    <ul>
      <li v-for="libro in libros" :key="libro.libreriaMateriaId">{{ libro.titulo }}</li>
    </ul>
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
    console.log('Método created ejecutado');
    try {
      const response = await apiClient.get('/api/LibroMaterial');
      console.log('Respuesta de la API:', response.data); // Verifica la respuesta de la API
      this.libros = response.data;
      console.log('Libros después de asignar:', this.libros); // Verifica los datos asignados
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  }
}
</script>

<style scoped>
/* Añade estilos básicos para asegurarte de que los elementos sean visibles */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
