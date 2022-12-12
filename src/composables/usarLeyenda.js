/**
 * @module composables/usarLeyenda
 */

import { ref, watch } from 'vue'
import usarCapasRegistradas from './usarCapasRegistradas'

export const props = {
  /**
   * para
   * - Tipo: `String`
   * - Obligatorio: ✅
   * - Interactivo: ❌
   *
   * Identificador de la capa a la que se quiere vincular el control de leyenda.
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
  const estiloCapa = ref({})

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

    const { alternarVisibilidad, visibilidad, nombre, estilo } =
      usarCapasRegistradas().vincularCapa(propsParam.para)

    visibilidadCapa.value = visibilidad.value
    watch(visibilidad, nvoValor => (visibilidadCapa.value = nvoValor))
    watch(visibilidadCapa, alternarVisibilidad)

    nombreCapa.value = nombre.value
    watch(nombre, nvoNombre => (nombreCapa.value = nvoNombre))

    estiloCapa.value = JSON.parse(estilo.value ? estilo.value : '{}')
    watch(estilo, nvoEstilo => (estiloCapa.value = JSON.parse(nvoEstilo)))
  }

  return {
    vincularCapa,
    visibilidadCapa,
    nombreCapa,
    estiloCapa,
  }
}
