import { toRefs, watch } from 'vue'

import usarMapa from './usarMapa'

export const props = {
  /**
   * Identificador unico de la capa. Si no es detectado, se asignará un identificador random.
   */
  id: {
    type: String,
    default: '_default_',
  },

  /**
   * Nombre de la capa que aparecerá en el control de la leyenda.
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },

  /**
   * Visibilidad de la capa, true por defecto.
   */
  visible: {
    type: Boolean,
    default: true,
  },

  /**
   *
   */
  zIndex: {
    type: Number,
    default: undefined,
  },
}

export default function usarCapa(propsRefs) {
  let olCapa = undefined
  const { nombre, visible, zIndex } = toRefs(propsRefs)
  const { mapaPrincipal, agregarCapa } = usarMapa()

  /**
   *
   */
  watch(zIndex, nuevoValor => {
    if (olCapa && olCapa.getZIndex() !== nuevoValor) {
      // console.log('el zIndex ha cambiado', nuevoValor)
      olCapa.setZIndex(nuevoValor)
    }
  })

  /**
   * Asigna un identificador aleatorio en caso de que no se asigne.
   */
  const id =
    propsRefs.id !== '_default_'
      ? propsRefs.id
      : Math.random().toString(36).substring(7)

  /**
   * Observador que verifica cuando la instancia del mapa está lista para para agregar capas.
   *
   * Como este es un composable de Capa, se ejecutará este observasdor por cada capa que se
   * registre en el componente.
   */
  watch(mapaPrincipal, () => {
    // console.log('Mapa listo para recibir capas')
    asignarPorps()
    agregarCapa(olCapa)
  })

  /**
   *
   * @param {*} capaObjeto
   */
  function salvarCapaComoObjeto(capaObjeto) {
    olCapa = capaObjeto
  }

  /**
   *
   */
  function asignarPorps() {
    olCapa.set('id', id)
    olCapa.setZIndex(zIndex.value)
    olCapa.set('nombre', nombre)
    olCapa.setVisible(visible)
    // console.log('asignarProps', zIndex)
  }

  return {
    salvarCapaComoObjeto,
  }
}
