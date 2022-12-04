<template>
  <div class="about">
    <h1>Estos es una pagina de prueba</h1>
    <table>
      <tbody>
        <tr v-for="dato in datos" :key="dato.id_evento">
          <td>{{ dato.nombre_evento }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      datos: null
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      axios
        .get('http://127.0.0.1:8000/api/evento/?format=json')
        .then(response => {
          this.datos = response.data
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
