/**
 * @module composables/usarMapa
 */

import { ref, toRefs, watch } from 'vue'
import ControlEscalaGrafica from './../controls/EscalaGrafica'
import usarRegistroCapas from './usarCapasRegistradas'

/**
 * Objeto que contendrá la instancia del mapa, declararlo fuera de la función composable hace que
 * no se genere una nueva variable del mapa cada que se utilice el composable
 */
const olMapa = ref(undefined)

export const props = {
  /**
   * Coordenadas [x, y] del centro inicial de la vista.
   *
   * Estas coordenadas deben coincidir con la proyección definida
   */
  centro: {
    type: Array,
    default: () => [0, 0],
  },

  /**
   * Coordenadas extremas [x1, y1, x2, y2] de la caja envolvente de la vista.
   *
   * Estas coordenadas deben coincidir con la proyección definida
   */
  extension: {
    type: Array,
    default: () => [0, 0, 0, 0],
  },

  /**
   * Ver el icono de Conacyt debajo del mapa
   */
  iconoConacytVisible: {
    type: Boolean,
    default: true,
  },

  /**
   * Código de identificación SRS que define la proyección de la vista.
   *
   * El valor predeterminado es Universal Transversal de Mercator.
   */
  proyeccion: {
    type: String,
    default: 'EPSG:4326',
  },

  /**
   * Tema de la disposición de elemntos de apoyo del mapa (contenedor del header, pie y columnas
   * laterales)
   */
  tema: {
    type: String,
    default: '',
  },

  /**
   * Nivel de zoom utilizado para calcular la resolución inicial de la vista.
   */
  zoom: {
    type: Number,
    default: 1,
  },

  /**
   * Booleano que
   */
  escalaGrafica: {
    type: Boolean,
    default: false,
    validator: valor => typeof valor === typeof Boolean(),
  },
}

/**
 * Uso del mapa, la finalidad de este composable es acceder al mapa desde diferentes componentes
 * o composables
 * @returns {Function} composable
 */
export default function usarMapa(propsParam) {
  const { agregarTodoALMapa: agregarCapasRegistradas } = usarRegistroCapas()
  const { escalaGrafica } = toRefs(propsParam)

  /**
   * Guarda el objeto del mapa en una variable reactiva.
   * @param {import("ol/Map.js").default} mapaInstanciado
   */
  function salvarInstancia(mapaInstanciado) {
    // console.log('hola desde el composable del mapa', mapaInstanciado)
    agregarCapasRegistradas(mapaInstanciado)
    olMapa.value = mapaInstanciado
  }

  /**
   * Actualiza la coordenada centrica del mapa
   * @param {Number} centro nueva coordenada centrica
   */
  function cambiarCentro(centro) {
    if (olMapa.value) {
      olMapa.value.getView().setCenter(centro)
    }
  }

  /**
   * Actualiza el nivel de zoom en el mapa.
   * @param {Number} zoom nuevo bnivel de zoom
   */
  function cambiarZoom(zoom) {
    if (olMapa.value) {
      olMapa.value.getView().setZoom(zoom)
    }
  }

  /**
   * Devuelve un control por su nombre registrado
   * @param {String} nombreDelControl
   * @returns {import("ol/control/Control.js").default|undefined} Control
   */
  function conseguirControl(nombreDelControl) {
    if (olMapa.value) {
      return olMapa.value
        .getControls()
        .getArray()
        .find(control => control.nombre === nombreDelControl)
    }
  }

  function agregarControl(control) {
    olMapa.value.addControl(control)
  }

  function removerControl(control) {
    olMapa.value.removeControl(control)
  }

  function alternarEscalaGrafica(visible) {
    if (visible) {
      agregarControl(new ControlEscalaGrafica())
    } else {
      removerControl(conseguirControl(ControlEscalaGrafica.nombre))
    }
  }
  watch(escalaGrafica, alternarEscalaGrafica)

  return {
    salvarInstancia,
    cambiarZoom,
    cambiarCentro,
    conseguirControl,
    alternarEscalaGrafica,
  }
}
