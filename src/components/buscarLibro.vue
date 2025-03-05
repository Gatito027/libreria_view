<template>
    <div>
        <form action="">
            <input type="text" required/><button>Buscar</button>
        </form>
    </div>
    <div>
        Resultado:
    </div>
</template>
<script>
    import apiClient from '../api.js';

export default {
  name: 'Busqueda',
  data() {
    return {
      libros: []
    };
  }
}
</script>