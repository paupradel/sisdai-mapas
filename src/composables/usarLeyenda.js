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
  /**
   * @property {String} idCapa id de la capa con la que se tratará de vincular la leyenda.
   */
  var idCapa
  const { capas, agregarFuncionesPorEvento, alternarVisibilidadCapa } =
    usarCapasRegistradas()

  const visibilidadCapa = ref(false)
  watch(visibilidadCapa, alternarVisibilidad)

  /**
   * Vimnculación de propiedades de una capa con variables reactivas que necesita la leyenda.
   */
  function vincularPropiedades() {
    visibilidadCapa.value = capas[idCapa].getVisible()
  }

  /**
   * Agregar eventos que podrán ser escuchados por este componente.
   */
  function agregarEventos() {
    agregarFuncionesPorEvento(idCapa, 'change:visible', ({ target }) => {
      visibilidadCapa.value = target.getVisible()
    })
  }

  /**
   * En caso de que no se encuentre la capa en las capas registradas, llegar a esta funciónß.
   * @param {String} id id de la capa con la que se trató de vincular.
   */
  function capaNoVinculada(id) {
    console.warn(`La capa '${id}' no fue encontrada`)
  }

  /**
   * Ejecutar esta función para vincular el idCapa con alguna capa registrada.
   */
  function vincularCapa() {
    // console.log('tratando de vincular', propsParam.para, capas)
    if (capas[propsParam.para] !== undefined) {
      idCapa = propsParam.para
      vincularPropiedades()
      agregarEventos()
    } else {
      capaNoVinculada(propsParam.para)
    }
  }

  /**
   * Cambia el estado de visibilidad de la capa vinculada.
   * @param {Boolean} estado estado visible que se asignará.
   */
  function alternarVisibilidad(estado) {
    alternarVisibilidadCapa(idCapa, estado)
  }

  return { vincularCapa, visibilidadCapa }
}
