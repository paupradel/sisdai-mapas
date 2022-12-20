<script setup>
import { onMounted } from 'vue'
import usarLeyenda, { props } from './../../composables/usarLeyenda'
import { idAleatorio } from './../../utiles'

// eslint-disable-next-line
const propsSetup = defineProps(props)

const { vincularCapa, visibilidadCapa, nombreCapa } = usarLeyenda(propsSetup)

onMounted(() => {
  vincularCapa()
})

const idCheck = `${idAleatorio()}-${props.para}`
</script>

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
