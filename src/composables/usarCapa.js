/**
 * @module composables/usarCapa
 */

import { ref, toRefs, watch } from 'vue'
import usarCapasRegistradas from './usarCapasRegistradas'
import { idAleatorio } from './../utiles'
import tiposEstatusCarga from './../defaults/estatusCarga'

export const props = {
  /**
   * id
   * - Tipo: `String`
   * - Obligatorio: ✅
   * - Interactivo: ❌
   *
   * Identificador unico de la capa. Si no es detectado, se asignará un identificador random.
   */
  id: {
    type: String,
    default: '_default_',
  },

  /**
   * nombre
   * - Tipo: `String`
   * - Valor por defecto: `Nombre no asignado`
   * - Interactivo: ✅
   *
   * Nombre de la capa que aparecerá en el control de la leyenda.
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },

  /**
   * verCargador
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Interactivo: ❌
   *
   * Esta propiedad le comunica a la vista del mapa si se desea sobreponer la vista que indica
   * el proceso de carga de una capa.
   */
  verCargador: {
    type: Boolean,
    default: false,
  },

  /**
   * visible
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Interactivo: ✅
   *
   * Visibilidad de la capa.
   */
  visible: {
    type: Boolean,
    default: true,
  },

  /**
   * zIndex
   * - Tipo: `Number`
   * - Valor por defecto: [trabajando...]
   * - Interactivo: ✅ [trabajando...]
   *
   * Indica la posicion respecto a otras capas, cuando se define un z-index mas alto respecto a
   * las demas capas, esa capa se posicionara enfrente de ellas.
   */
  zIndex: {
    type: Number,
    default: undefined,
  },
}

export const eventos = {
  /**
   * Evento ejecutado cuando se detecta el cambio de visibilidad de la capa desde las propiedades
   * reactivas o desde los controles del componente como el control de leyenda.
   * @param {Boolean} visibilidad Visibilidad final al ejecutarse este evento.
   */
  alCambiarVisibilidad: 'alCambiarVisibilidad',

  /**
   * Evento ejecutado cuando se detecta que se inicia con la carga de la información visible en
   * el mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la consulta de los features;
   * En el caso de capas raster (WMS) cuando inicia la consulta de la imágen; En el caso de las
   * capas por conjunto de teselas (XYZ, OSM) cuando inicia la consulta de un grupo de teselas.
   */
  alIniciarCarga: 'alIniciarCarga',

  /**
   * Evento ejecutado cuando se detecta que la carga de la información visible en el mapa ha
   * finalizado. En el caso de capas vectoriales (GeoJSON) cuando finaliza la consulta de los
   * features; En el caso de capas raster (WMS) cuando finaliza la consulta de la imágen; En el
   * caso de las capas por conjunto de teselas (XYZ, OSM) cuando finaliza la consulta de un grupo
   * de teselas.
   * @param {Boolean} cargaExitosa Indica si la carga no ha presentado error.
   */
  alFinalizarCarga: 'alFinalizarCarga',
}

export const emits = Object.values(eventos)

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
      emitsParam(eventos.alCambiarVisibilidad, nuevoValor)
    )

    watch(nombre, cambiarNombre)
    watch(estatusCarga, cambiarEstatusCarga)
  }

  return {
    registrar,
    estatusCarga,
  }
}
