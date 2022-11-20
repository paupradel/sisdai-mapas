/**
 * @module composables/usarCapa
 */

import { ref, toRefs, watch } from 'vue'
import usarCapasRegistradas from './usarCapasRegistradas'
import { idAleatorio } from './../utiles'
import tiposEstatusCarga from './../defaults/estatusCarga'

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
   *
   */
  verCargador: {
    type: Boolean,
    default: true,
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

export const emits = ['alCambiarVisibilidad']

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de la capa desde
 * diferentes componentes o composables.
 * @param {Object} propsParam props genéricos de capa.
 * @param {Object} emitsParam emits genéricos de capa.
 * @returns {Function} composable.
 */
export default function usarCapa(propsParam, emitsParam) {
  const { registrarNuevaCapa, vincularCapa } = usarCapasRegistradas()
  const { nombre, verCargador, visible, zIndex } = toRefs(propsParam)
  const estatusCarga = ref(tiposEstatusCarga.no)

  /**
   * Asigna un identificador aleatorio en caso de que no se asigne.
   */
  const idValida = propsParam.id === '_default_' ? idAleatorio() : propsParam.id

  /**
   * Agrega los porps al objeto y propiedades de la capa.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function asignarPorps(olCapa) {
    olCapa.set('estatusCarga', estatusCarga.value)
    olCapa.set('id', idValida)
    olCapa.set('nombre', nombre.value)
    olCapa.set('verCargador', verCargador.value)
    olCapa.setVisible(visible.value)
    olCapa.setZIndex(zIndex.value)
  }

  /**
   * Prepara la capa y la registra en el composable de capas registradas.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function registrar(olCapa) {
    asignarPorps(olCapa)
    registrarNuevaCapa(olCapa)

    const {
      visibilidad,
      alternarVisibilidad,
      cambiarNombre,
      cambiarEstatusCarga,
    } = vincularCapa(idValida)

    watch(visible, alternarVisibilidad)
    watch(visibilidad, nuevoValor =>
      emitsParam('alCambiarVisibilidad', nuevoValor)
    )

    watch(nombre, cambiarNombre)
    watch(estatusCarga, cambiarEstatusCarga)
  }

  return {
    registrar,
    estatusCarga,
  }
}
