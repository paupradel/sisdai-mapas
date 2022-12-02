<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import AttributionControl from 'ol/control/Attribution'
import usarMapa, { props, emits } from './../composables/usarMapa'
import ControlZoomPersonalizado from './../controles/ZoomPersonalizado'
// import ControlVistaInicial from './../controles/VistaInicial'
import ControlAjusteVista from '../controles/AjusteVista'
import BotonConacyt from './externos/BotonConacyt.vue'
import VistaCarga from './externos/VistaCarga.vue'
import vistaMapaDefault from './../defaults/vistaMapa'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emitsSetup = defineEmits(emits)

const { salvarInstancia, desmontar, alternarEscalaGrafica, verCargador } =
  usarMapa(propsSetup, emitsSetup)

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
    view: new View({
      center: vistaMapaDefault.centro,
      zoom: vistaMapaDefault.zoom,
      projection: propsSetup.proyeccion,
    }),
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
  // console.log('onUnmounted')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$altura-boton-conacyt: 40px;

.sisdai-mapa-contenedor {
  min-height: 200px;
  min-width: 200px;
  // height: calc(40vh + $altura-boton-conacyt);
  position: relative;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0;
  grid-template-rows: auto 40vh 40px;
  .sisdai-mapa-encabezado {
    grid-column: 1;
    grid-row: 1;
  }
  .sisdai-mapa,
  .sisdai-mapa-vista-carga {
    grid-column: 1;
    grid-row: 2;
  }
  .boton-conacyt {
    grid-column: 1;
    grid-row: 3;
  }

  .sisdai-mapa {
    width: 100%;
    // min-height: 200px;
    // height: 200px;
    // position: absolute;
    background-color: #e9e9e9;
    // padding-bottom: $altura-boton-conacyt;
  }
}
</style>
