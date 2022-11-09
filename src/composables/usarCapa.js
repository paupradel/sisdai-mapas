/**
 * @module composables/usarCapa
 */

import usarCapasRegistradas from './usarCapasRegistradas'
import { idAleatorio } from '../utiles'
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
 * @param {Object} propsParam props genéricos de capa.
 * @param {Object} emitsParam emits genéricos de capa.
 * @returns {Function} composable.
 */
export default function usarCapa(propsParam, emitsParam) {
  const { registrarNuevaCapa, vincularCapa } = usarCapasRegistradas()

  const { nombre, visible, zIndex } = toRefs(propsParam)

  /**
   * Asigna un identificador aleatorio en caso de que no se asigne.
   */
  const idValida = propsParam.id === '_default_' ? idAleatorio() : propsParam.id

  /**
   * Agrega los porps al objeto y propiedades de la capa.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function asignarPorps(olCapa) {
    olCapa.set('id', idValida)
    olCapa.set('nombre', nombre.value)
    olCapa.setVisible(visible.value)
    olCapa.setZIndex(zIndex.value)
  }

  /**
   * Prepara la cap y la registra en el composable de capas.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function registrar(olCapa) {
    asignarPorps(olCapa)
    registrarNuevaCapa(olCapa)
    // agregarEventos()

    const { visibilidad, alternarVisibilidad, cambiarNombre } =
      vincularCapa(idValida)

    watch(visible, alternarVisibilidad)
    watch(visibilidad, nuevoValor =>
      emitsParam('al-cambiar-visibilidad', nuevoValor)
    )

    watch(nombre, cambiarNombre)
  }

  return {
    registrar,
  }
}
