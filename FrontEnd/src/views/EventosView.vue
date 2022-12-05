<template>
  <div class="eventos">
    <h1>Estoszxczs una pagina de prueba</h1>
    <table>
      <tbody>
        <tr v-for="dato in datos" :key="dato.id_evento">
          
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import SsrCarousel from 'vue-ssr-carousel'
import ssrCarouselCss from 'vue-ssr-carousel/index.css'
Vue.component 'ssr-carousel', SsrCarousel
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
