/**
 * @module composables/usarLeyenda
 */

import { reactive, ref, watch } from 'vue'
import usarMapa from './usarMapa'

export const props = {
  /**
   * Identificador de la caopa a la que se quiere enlazar el control de leyenda
   */
  para: {
    type: String,
    required: true,
  },
}

export default function usarLeyenda(propsRefs) {
  const { mapaPrincipal } = usarMapa()

  const olCapa = ref(undefined)

  const capa = reactive({
    nombre: 'Cargando...',
  })

  function enlazarCapa(capaEncontrada) {
    if (capaEncontrada !== undefined) {
      olCapa.value = capaEncontrada
      console.log(capaEncontrada)
      capa.nombre = capaEncontrada.get('nombre')
    } else console.warn(`La capa '${propsRefs.para}' no fue encontrada`)
  }

  watch(
    // Cuando el número de capas en el mapa cambie
    () => mapaPrincipal.value?.getLayers().getArray().length,
    () => {
      const capas = mapaPrincipal.value.getLayers().getArray()
      enlazarCapa(capas.find(capa => capa.get('id') === propsRefs.para))
    }
  )

  /**
   * Cambiar el estado de visivilidad de la capa. Si no se define el parámetro booleano, se
   * asignará el estado contratrio de su estado actual.
   * @param {Boolean|undefined} estado
   */
  function alternarVisibilidad(estado = undefined) {
    if (olCapa.value) {
      if (estado === undefined) {
        olCapa.value.setVisible(!olCapa.value.getVisible())
      } else olCapa.value.setVisible(estado)
    }
  }

  return {
    capa,
    alternarVisibilidad,
  }
}
