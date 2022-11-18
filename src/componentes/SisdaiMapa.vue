<script setup>
import { onMounted, ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import AttributionControl from 'ol/control/Attribution'
import usarMapa, { props } from './../composables/usarMapa'
import ControlZoomPersonalizado from './../controles/ZoomPersonalizado'
import ControlVistaInicial from './../controles/VistaInicial'
import BotonConacyt from './elementos/BotonConacyt.vue'

/**
 * Relleno (en píxeles) que se agregará a la extensión de la vista. Los valores en la matriz son
 * relleno: [superior, derecho, inferior, izquierdo] y solo es aplicable cuando la extensión es
 * definida.
 */
const rellenoAlBordeDeLaExtension = [10, 10, 10, 10]

// eslint-disable-next-line
const propsSetup = defineProps(props)
const { salvarInstancia, alternarEscalaGrafica } = usarMapa(propsSetup)

/**
 * Referencia al elemento html contenedor del mapa
 */
const refMapa = ref(null)

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
      center: propsSetup.centro,
      zoom: propsSetup.zoom,
      projection: propsSetup.proyeccion,
    }),
    controls: [
      new ControlZoomPersonalizado(),
      new ControlVistaInicial({
        centro: propsSetup.centro,
        extension: propsSetup.extension,
        rellenoAlBordeDeLaExtension,
        zoom: propsSetup.zoom,
      }),
      new AttributionControl({
        collapsible: false,
      }),
    ],
  })
}

onMounted(() => {
  salvarInstancia(crearMapa(refMapa.value))

  alternarEscalaGrafica(propsSetup.escalaGrafica)
})
</script>

<template>
  <div class="sisdai-mapa-contenedor borde borde-redondeado-8">
    <div
      ref="refMapa"
      class="sisdai-mapa"
    />

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
  grid-template-areas: 'mapa-encabezado' 'mapa-mapa' 'boton-conacyt';
  gap: 0;
  grid-template-rows: auto 40vh 40px;
  .sisdai-mapa-encabezado {
    grid-area: mapa-encabezado;
  }
  .sisdai-mapa {
    grid-area: mapa-mapa;
  }
  .boton-conacyt {
    grid-area: boton-conacyt;
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
