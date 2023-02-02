<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import AttributionControl from 'ol/control/Attribution'
import usarMapa, { props, emits } from './../composables/usarMapa'
import ControlZoomPersonalizado from './../controles/ZoomPersonalizado'
import ControlAjusteVista from '../controles/AjusteVista'
import BotonConacyt from './externos/BotonConacyt.vue'
import VistaCarga from './externos/VistaCarga.vue'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emitsSetup = defineEmits(emits)

const {
  salvarInstancia,
  desmontar,
  alternarEscalaGrafica,
  verCargador,
  exportarImagen,
  ajustarVista,
} = usarMapa(propsSetup, emitsSetup)

/**
 * Referencia al elemento html contenedor del mapa
 */
const refSisdaiMapa = ref(null)

/**
 * Creación del elemento mapa con atributos definidos.
 * @param {HTMLDivElement|String} target elemento o id del elemento html que contendrá el mapa.
 */
function crearMapa(target) {
  // Instanciamiento del maapa como objeto de la calse ol/Map
  return new Map({
    target,
    layers: [],
    controls: [
      new ControlZoomPersonalizado(),
      new ControlAjusteVista(emitsSetup),
      new AttributionControl({
        collapsible: false,
      }),
    ],
  })
}

onMounted(() => {
  salvarInstancia(crearMapa(refSisdaiMapa.value))

  alternarEscalaGrafica(propsSetup.escalaGrafica)
})

onUnmounted(() => {
  desmontar()
})

// eslint-disable-next-line
defineExpose({
  exportarImagen,
  ajustarVista,
  ajustarVistaPorCapasVisibles: undefined,
})
</script>

<template>
  <div class="sisdai-mapa-contenedor borde borde-redondeado-8">
    <div
      ref="refSisdaiMapa"
      class="sisdai-mapa"
    />
    <VistaCarga v-show="verCargador" />

    <!-- Permite ingresar etiquetas dentro de etiqueta sisdai-mapa -->
    <slot />

    <BotonConacyt />
  </div>
</template>

<!-- Agregue el atributo "scoped" para limitar CSS solo a este componente -->
<style lang="scss" scoped>
@import './../estilos/mapa.scss';
</style>
