import usarRegistroCapas from './usarRegistroCapas'

import { idAleatorio } from './../utiles'
import { toRefs, watch } from 'vue'

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
   * Nivel de jerarquía visible en la lista de capas, cuanto más alto el número más arriba estará
   * la capa de otras.
   */
  zIndex: {
    type: Number,
    default: undefined,
  },
}

export const emits = ['al-cambiar-visibilidad']

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de la capa desde
 * diferentes componentes o composables.
 * @param {Object} propsRefs props genéricos de capa.
 * @param {Object} emit emits genéricos de capa.
 * @returns {Function} composable.
 */
export default function usarCapa(propsRefs, emit) {
  const { registrar: registrarCapa, alternarVisibilidadCapa } =
    usarRegistroCapas()

  const { nombre, visible, zIndex } = toRefs(propsRefs)
  watch(visible, alternarVisibilidad)

  /**
   * Asigna un identificador aleatorio en caso de que no se asigne.
   */
  const idValida = propsRefs.id === '_default_' ? idAleatorio() : propsRefs.id

  /**
   * Agrega los porps al objeto y propiedades de la capa.
   * @param {import("ol/layer/Layer.js").default} capa objeto de capa de openlayers.
   */
  function asignarPorps(capa) {
    capa.set('id', idValida)
    capa.set('nombre', nombre.value)
    capa.setVisible(visible.value)
    capa.setZIndex(zIndex.value)
    // console.log('asignarProps', zIndex)
  }

  /**
   * Agregar eventos que podrán ser escuchados por este componente.
   * @param {import("ol/layer/Layer.js").default} capa objeto de capa de openlayers.
   */
  function agregarEventos(capa) {
    capa.on('change:visible', ({ target }) => {
      emit('al-cambiar-visibilidad', target.getVisible())
    })
  }

  /**
   * Prepara la cap y la registra en el composable de capas.
   * @param {import("ol/layer/Layer.js").default} capa objeto de capa de openlayers.
   */
  function registrar(capa) {
    asignarPorps(capa)
    agregarEventos(capa)
    registrarCapa(capa)
  }

  /**
   * @param {Boolean} estado estado que se asignará.
   */
  function alternarVisibilidad(estado) {
    alternarVisibilidadCapa(idValida, estado)
  }

  return {
    registrar,
    alternarVisibilidad,
  }
}
