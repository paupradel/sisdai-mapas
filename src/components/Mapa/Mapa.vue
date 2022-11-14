<template>
  <div
    class="sisdai-mapa-contenedor borde borde-redondeado-8"
    :class="`tema-${tema}`"
  >
    <div
      ref="refMapa"
      class="sisdai-mapa"
      :class="{ 'icono-conacyt-visible': iconoConacytVisible }"
    />

    <!-- Permite ingresar etiquetas dentro de etiqueta sisdai-mapa -->
    <slot />

    <BotonConacyt />
  </div>
</template>

<script>
import { onMounted, ref, toRefs } from 'vue'

import Map from 'ol/Map'
import View from 'ol/View'
import AttributionControl from 'ol/control/Attribution'
import 'ol/ol.css'

import BotonConacyt from './../layouts/BotonConacyt'
import ControlZoomPersonalizado from '../../controls/ZoomPersonalizado'
import ControlVistaInicial from '../../controls/VistaInicial'

import usarMapa, { props } from '../../composables/usarMapa'

/**
 * Relleno (en píxeles) que se agregará a la extensión de la vista. Los valores en la matriz son
 * relleno: [superior, derecho, inferior, izquierdo] y solo es aplicable cuando la extensión es
 * definida.
 */
const rellenoAlBordeDeLaExtension = [10, 10, 10, 10]

export default {
  name: 'SisdaiMapa',
  props,
  components: { BotonConacyt },
  setup(propsSetup) {
    const { salvarInstancia, alternarEscalaGrafica } = usarMapa(propsSetup)

    /**
     * Referencia al elemento html contenedor del mapa
     */
    const refMapa = ref(null)

    /**
     * Props reactivos.
     * ¡¡¡REVISAR SI ES NECESARIO QUE SEAN REACTIVOS AQUÍ O SOLO EN EL COMPOSABLE!!!
     */
    const { centro, extension, tema, zoom } = toRefs(propsSetup)

    /**
     * Creación del elemento mapa con atributos definidos.
     * @param {HTMLDivElement|String} target elemento o id del elemento html que contendrá el mapa.
     */
    function crearMapa(target) {
      salvarInstancia(
        // Instanciamiento del maapa como onjeto de la calse ol/Map
        new Map({
          target,
          layers: [],
          view: new View({
            center: centro.value,
            zoom: zoom.value,
            projection: propsSetup.proyeccion,
          }),
          controls: [
            new ControlZoomPersonalizado(),
            new ControlVistaInicial({
              centro,
              extension,
              rellenoAlBordeDeLaExtension,
              zoom,
            }),
            new AttributionControl({
              collapsible: false,
            }),
          ],
        })
      )

      alternarEscalaGrafica(propsSetup.escalaGrafica)
    }

    /**
     * Instanciar el mapa en cuanto el html esté montado.
     */
    onMounted(() => {
      crearMapa(refMapa.value)
    })

    return { refMapa, tema }
  },
}
</script>

<style lang="scss">
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
