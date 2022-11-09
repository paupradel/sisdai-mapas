/**
 * @module composables/usarLeyenda
 */

import { ref, watch } from 'vue'
import usarCapasRegistradas from './usarCapasRegistradas'

export const props = {
  /**
   * Identificador de la caopa a la que se quiere enlazar el control de leyenda.
   */
  para: {
    type: String,
    required: true,
  },
}

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de la leyenda desde
 * diferentes componentes o composables.
 * @param {Object} propsParam props genéricos de leyenda.
 * @returns {Function} composable.
 */
export default function usarLeyenda(propsParam) {
  const visibilidadCapa = ref(false)
  const nombreCapa = ref('Cargando...')

  /**
   * En caso de que no se encuentre la capa en las capas registradas, llegar a esta funciónß.
   * @param {String} id id de la capa con la que se trató de vincular.
   function capaNoVinculada(id) {
     console.warn(`La capa '${id}' no fue encontrada`)
    }
   */

  /**
   * Ejecutar esta función para vincular el idCapa con alguna capa registrada.
   */
  function vincularCapa() {
    // console.log('tratando de vincular', propsParam.para)

    const { alternarVisibilidad, visibilidad, nombre } =
      usarCapasRegistradas().vincularCapa(propsParam.para)

    visibilidadCapa.value = visibilidad.value
    watch(visibilidad, nuevoValor => (visibilidadCapa.value = nuevoValor))
    watch(visibilidadCapa, alternarVisibilidad)

    nombreCapa.value = nombre.value
    watch(nombre, nuevoValor => (nombreCapa.value = nuevoValor))
  }

  return { vincularCapa, visibilidadCapa, nombreCapa }
}
