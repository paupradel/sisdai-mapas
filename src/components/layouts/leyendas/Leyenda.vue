<template>
  <div>
    <input
      type="checkbox"
      :id="idCheck"
      v-model="visibilidadCapa"
    />
    <label :for="idCheck">{{ nombreCapa }}</label>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import usarLeyenda, { props } from './../../../composables/usarLeyenda'
import { idAleatorio } from './../../../utiles'

export default {
  name: 'SisdaiMapaLeyenda',
  props,
  setup(propsSetup) {
    const { vincularCapa, visibilidadCapa, nombreCapa } =
      usarLeyenda(propsSetup)

    onMounted(() => {
      vincularCapa()
    })

    return {
      idCheck: `${idAleatorio()}-${props.para}`,
      visibilidadCapa,
      nombreCapa,
    }
  },
}
</script>

<style></style>
