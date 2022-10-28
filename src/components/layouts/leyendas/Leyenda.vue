<template>
  <div>
    <input
      type="checkbox"
      name="pruebas"
      id="prueba1"
      v-model="capaVisible"
    />
    <label for="prueba1">{{ capa.nombre }}</label>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import usarLeyenda, { props } from './../../../composables/usarLeyenda'

export default {
  name: 'SisdaiMapaLeyenda',
  props,
  setup(props) {
    const { capa, alternarVisibilidad } = usarLeyenda(props)
    const capaVisible = ref(true)

    watch(capaVisible, alternarVisibilidad)

    return {
      capa,
      capaVisible,
    }
  },
}
</script>

<style></style>
