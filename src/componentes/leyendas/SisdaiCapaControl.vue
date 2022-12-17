<script setup>
import { onMounted } from 'vue'
import usarCapaControl, { props } from './../../composables/usarCapaControl'
import { idAleatorio } from './../../utiles'

// eslint-disable-next-line
const propsSetup = defineProps(props)

const { vincularCapa, visibilidadCapa, nombreCapa } =
  usarCapaControl(propsSetup)

onMounted(() => {
  vincularCapa()
})

const idCheck = `${propsSetup.para}-${idAleatorio()}`
</script>

<template>
  <span class="sisdai-mapa-capa-control">
    <input
      class="sisdai-mapa-capa-control-check"
      type="checkbox"
      :id="idCheck"
      v-model="visibilidadCapa"
    />
    <label
      class="sisdai-mapa-capa-control-etiequeta"
      :for="idCheck"
      >{{ nombreCapa }}
    </label>
  </span>
</template>
