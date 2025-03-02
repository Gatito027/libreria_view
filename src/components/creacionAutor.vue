<template>
    <div class="container mt-5">
      <h1 class="mb-4">Agregar Autor</h1>
      <form @submit.prevent="crearAutor" class="was-validated">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del autor</label>
          <input type="text" class="form-control" id="nombre" v-model="nuevoAutor.nombre" placeholder="Nombre del autor" required />
        </div>
        <div class="mb-3">
          <label for="apellido" class="form-label">Apellido del autor</label>
          <input type="text" class="form-control" id="apellido" v-model="nuevoAutor.apellido" placeholder="Apellido del autor" required />
        </div>
        <div class="mb-3">
          <label for="fechaNacimiento" class="form-label">Fecha de nacimiento</label>
          <input type="datetime-local" class="form-control" id="fechaNacimiento" v-model="nuevoAutor.fechaNacimiento" placeholder="Fecha de nacimiento" required />
        </div>
        <div class="mb-3">
          <h4 class="form-label">Grados Académicos</h4>
          <button type="button" class="btn btn-success mb-4 me-4" @click="abrirModal">Añadir Grado Académico</button>
          <div v-if="gradosAcademicos.length > 0" class="mt-3">
            <ul class="list-group">
              <li v-for="(grado, index) in gradosAcademicos" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                {{ grado.nombre }} - {{ grado.fechaGrado }}
                <div>
                  <button type="button" class="btn btn-primary btn-sm me-2" @click="editarGrado(index)">Editar</button>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarGrado(index)">Eliminar</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="enviando">{{ enviando ? 'Enviando...' : 'Agregar' }}</button>
      </form>
  
      <!-- Modal para añadir/editar grados académicos -->
      <div class="modal fade" id="gradoModal" tabindex="-1" aria-labelledby="gradoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="gradoModalLabel">Grado Académico</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="nombreGrado" class="form-label">Nombre del Grado</label>
                <input type="text" class="form-control" id="nombreGrado" v-model="gradoActual.nombre" placeholder="Nombre del Grado" required />
              </div>
              <div class="mb-3">
                <label for="fechaGrado" class="form-label">Fecha del Grado</label>
                <input type="datetime-local" class="form-control" id="fechaGrado" v-model="gradoActual.fechaGrado" placeholder="Fecha del Grado" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="guardarGrado">Guardar</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal de registro exitoso -->
      <div class="modal fade" id="registroExitosoModal" tabindex="-1" aria-labelledby="registroExitosoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="registroExitosoModalLabel">Registro Exitoso</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              El autor ha sido registrado con éxito.
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
  import { ref } from 'vue';
  import { Modal } from 'bootstrap';
  import autorApiClient from '../autorApi.js';
  
  export default {
    name: 'Crear',
    setup() {
      const nuevoAutor = ref({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
      });
      const gradosAcademicos = ref([]);
      const gradoActual = ref({ nombre: '', fechaGrado: '' });
      const indiceActual = ref(-1);
      const enviando = ref(false);
      let modalInstance = null;
      let registroExitosoModalInstance = null;
  
      const abrirModal = () => {
        gradoActual.value = { nombre: '', fechaGrado: '' };
        indiceActual.value = -1;
        modalInstance = new Modal(document.getElementById('gradoModal'));
        modalInstance.show();
      };
  
      const editarGrado = (index) => {
        gradoActual.value = { ...gradosAcademicos.value[index] };
        indiceActual.value = index;
        modalInstance = new Modal(document.getElementById('gradoModal'));
        modalInstance.show();
      };
  
      const eliminarGrado = (index) => {
        gradosAcademicos.value.splice(index, 1);
      };
  
      const guardarGrado = () => {
        if (indiceActual.value === -1) {
          gradosAcademicos.value.push({ ...gradoActual.value });
        } else {
          gradosAcademicos.value.splice(indiceActual.value, 1, { ...gradoActual.value });
        }
        modalInstance.hide();
      };
  
      const crearAutor = async () => {
        enviando.value = true;
        try {
          const autorData = {
            nombre: nuevoAutor.value.nombre,
            apellido: nuevoAutor.value.apellido,
            fechaNacimiento: nuevoAutor.value.fechaNacimiento,
            gradosAcademicos: gradosAcademicos.value.map(grado => ({
              nombre: grado.nombre,
              fechaGrado: grado.fechaGrado
            }))
          };
          
          const response = await autorApiClient.post('/api/AutorLibro', autorData);
          console.log(response.data);
  
          registroExitosoModalInstance = new Modal(document.getElementById('registroExitosoModal'));
          registroExitosoModalInstance.show();
        } catch (error) {
          console.error('Error al crear autor:', error);
        } finally {
          enviando.value = false;
        }
      };
  
      return {
        nuevoAutor,
        gradosAcademicos,
        gradoActual,
        enviando,
        abrirModal,
        editarGrado,
        eliminarGrado,
        guardarGrado,
        crearAutor,
      };
    },
  };
  </script>
  
  <style>
  /* Añade tus estilos aquí */
  </style>
  