<template>
  <div>
    <input
      type="checkbox"
      :id="idCheck"
      v-model="visibilidadCapa"
    />
    <label :for="idCheck">{{ nota }}</label>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import usarLeyenda, { props } from './../../../composables/usarLeyenda'
import { idAleatorio } from './../../../utiles'

export default {
  name: 'SisdaiMapaLeyenda',
  props,
  setup(propsSetup) {
    const { vincularCapa, visibilidadCapa } = usarLeyenda(propsSetup)

    const nota = ref('Cargando...')

    onMounted(() => {
      vincularCapa()
    })

    return {
      idCheck: `${idAleatorio()}-${props.para}`,
      nota,
      visibilidadCapa,
    }
  },
}
</script>

<style></style>
