<script setup>
import { computed, onMounted, watch } from 'vue'
import usarCapaControl, { props } from './../../composables/usarCapaControl'
import { idAleatorio } from './../../utiles'
import SisdaiClaseControl from './SisdaiClaseControl.vue'

// eslint-disable-next-line
const propsSetup = defineProps(props)

const { vincularCapa, visibilidadCapa, nombreCapa, estiloCapa } =
  usarCapaControl(propsSetup)

onMounted(() => vincularCapa())

const idCheck = `${propsSetup.para}-${idAleatorio()}`

const clasesEstilos = computed(() => {
  if (Array.isArray(estiloCapa.value)) {
    return estiloCapa.value
  }
  return [{ estilo: estiloCapa.value }]
})
watch(
  () => clasesEstilos.value.length,
  n => console.log('clases', n)
)
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
    >
      <SisdaiClaseControl
        v-for="(clase, idx) in clasesEstilos"
        :key="`estilo-${idx}`"
        :estiloClase="clase.estilo"
      />
      {{ nombreCapa }}
    </label>
  </span>
</template>

<style lang="scss" scoped>
.sisdai-mapa-capa-control {
  &-etiequeta {
    align-items: center;
    // background-color: black;
  }
}
</style>
