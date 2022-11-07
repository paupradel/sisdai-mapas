/**
 * @module composables/usarMapa
 */

import { ref, readonly } from 'vue'
import usarRegistroCapas from './usarRegistroCapas'

/**
 * Objeto que contendrá la instancia del mapa, declararlo fuera de la función composable hace que
 * no se genere una nueva variable del mapa cada que se utilice el composable
 */
const olMapa = ref(undefined)

/**
 * Uso del mapa, la finalidad de este composable es acceder al mapa desde diferentes componentes
 * o composables
 * @returns {Function} composable
 */
export default function usarMapa() {
  const { agregarTodoALMapa: agregarCapasRegistradas } = usarRegistroCapas()

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
  function extraerControl(nombreDelControl) {
    if (olMapa.value) {
      return olMapa.value
        .getControls()
        .getArray()
        .find(control => control.nombre === nombreDelControl)
    }
  }

  return {
    olMapa: readonly(olMapa),
    salvarInstancia,
    cambiarZoom,
    cambiarCentro,
    extraerControl,
  }
}
