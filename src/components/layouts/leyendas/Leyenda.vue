<template>
  <div>
    <input
      type="checkbox"
      name="pruebas"
      id="prueba1"
      v-model="visibilidadCapa"
    />
    <label for="prueba1">{{ nota }}</label>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import usarLeyenda, { props } from './../../../composables/usarLeyenda'

export default {
  name: 'SisdaiMapaLeyenda',
  props,
  setup(propsSetup) {
    const { vincularCapa, visibilidadCapa } = usarLeyenda(propsSetup)

    const nota = ref('Cargando...')

    onMounted(() => {
      vincularCapa(props.para)
    })

    return {
      nota,
      visibilidadCapa,
    }
  },
}
</script>

<style></style>
