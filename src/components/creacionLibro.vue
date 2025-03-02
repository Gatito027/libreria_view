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
        <select class="form-select" v-model="nuevoLibro.AutorLibro" required>
          <option v-for="autor in Autores" :key="autor.autorLibroId" :value="autor.autorLibroGuid">{{ autor.nombre }} {{ autor.apellido }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="enviando">{{ enviando ? 'Enviando...' : 'Agregar' }}</button>
    </form>

    <!-- Modal -->
    <div class="modal fade" id="mensajeModal" tabindex="-1" aria-labelledby="mensajeModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mensajeModalLabel">Mensaje</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ mensajeModal }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../api.js';
import autorApiClient from '../autorApi.js';

export default {
  name: 'Crear',
  data() {
    return {
      nuevoLibro: {
        titulo: '',
        fechaPublicacion: '',
        AutorLibro: ''
      },
      Autores: [],
      enviando: false,
      mensajeModal: ''
    };
  },
  async created() {
    this.obtenerAutores();
  },
  methods: {
    async obtenerAutores() {
      try {
        const response = await autorApiClient.get('/api/AutorLibro');
        this.Autores = response.data;
        console.log(this.Autores);
      } catch (error) {
        console.error('Error al obtener autores:', error);
      }
    },
    async crearLibro() {
      this.enviando = true;
      try {
        const libroData = {
          titulo: this.nuevoLibro.titulo,
          fechaPublicacion: this.nuevoLibro.fechaPublicacion,
          AutorLibro: this.nuevoLibro.AutorLibro
        };
        //console.log('Datos enviados:', libroData);

        const response = await apiClient.post('/api/LibroMaterial', libroData);
        console.log('Respuesta del servidor:', response.data);

        this.mensajeModal = 'Libro añadido correctamente';
        this.mostrarModal();

        this.nuevoLibro.titulo = '';
        this.nuevoLibro.fechaPublicacion = '';
        this.nuevoLibro.AutorLibro = '';
      } catch (error) {
        this.mensajeModal = 'Error al crear libro';
        console.error('Error al crear libro:', error);
        this.mostrarModal();
      } finally {
        this.enviando = false;
      }
    },
    mostrarModal() {
      const modal = new bootstrap.Modal(document.getElementById('mensajeModal'));
      modal.show();
    }
  }
};
</script>
