/**
 * @module composables/usarLeyenda
 */

import { ref, watch } from 'vue'
import usarRegistroCapas from './usarRegistroCapas'
import { alternarVisibilidadCapa as _alternarVisibilidadCapa } from './utiles'

export const props = {
  /**
   * Identificador de la caopa a la que se quiere enlazar el control de leyenda
   */
  para: {
    type: String,
    required: true,
  },
}

/**
 * La finalidad de este composable es acceder a las funciones del genericas de la leyenda desde
 * diferentes componentes o composables
 * @returns {Function} composable
 */
export default function usarLeyenda(propsRefs) {
  // const { alternarVisibilidad } = usarCapa({ id: propsRefs.para })
  const { capas } = usarRegistroCapas()

  const visibilidadCapa = ref(false)
  watch(visibilidadCapa, alternarVisibilidad)

  function vincularPropiedades() {
    visibilidadCapa.value = capas[idCapa].getVisible()
  }

  function agregarEventos() {
    capas[idCapa].on('change:visible', ({ target }) => {
      visibilidadCapa.value = target.getVisible()
    })
  }

  function capaNoVinculada(id) {
    console.warn(`La capa '${id}' no fue encontrada`)
  }

  var idCapa
  function vincularCapa() {
    // console.log('tratando de vincular', propsRefs.para, capas)
    if (capas[propsRefs.para] !== undefined) {
      idCapa = propsRefs.para
      vincularPropiedades()
      agregarEventos()
    } else {
      capaNoVinculada(propsRefs.para)
    }
  }

  function alternarVisibilidad(estado = undefined) {
    _alternarVisibilidadCapa(capas[idCapa], estado)
  }

  return { vincularCapa, visibilidadCapa }
}
