/**
 * @module composables/usarCapasRegistradas
 */

import { ref, watch } from 'vue'
import tiposEstatusCarga from './../defaults/estatusCarga'

/**
 * Objeto de objetos de capas de openlayers, los leys de cada objeto debe ser el id de cada capa.
 */
let capasRegistradas = {}

/**
 * Variable que indica si hay capas que tienen el cargador visible en proceso de carga/actualiación.
 */
const hayCapasCargadorVisibleProcesando = ref(false)

/**
 * La finalidad de este composable es acceder al a las capas usadan en cada intsncia del
 * componernte desde diferentes componentes o composables de esta biblioteca.
 * @returns {Function} composable.
 */
export default function usarCapasRegistradas() {
  /**
   * Agrega todas las capas registradas en el objeto capasRegistradas al mapa visible.
   * @param {import("ol/Map.js").default} mapa objeto de mapa de openlayers.
   */
  function agregarTodoALMapa(mapa) {
    for (const idCapa in capasRegistradas) {
      if (capasRegistradas[idCapa]) {
        mapa.addLayer(capasRegistradas[idCapa].value)
      }
    }
  }

  /**
   * Limpia el objeto de capas registradas.
   */
  function limpiarRegistro() {
    capasRegistradas = {}
  }

  /**
   * Devuelve verdadero si la capa ya se encuentra dentro del objeto capasRegistradas.
   * @param {String} idCapa identificador único de la capa.
   * @returns {Boolean}
   */
  function laCapaYaExiste(idCapa) {
    if (capasRegistradas[idCapa] !== undefined) {
      // eslint-disable-next-line
      console.warn('¡La capa ya existe!')
      return true
    }
    return false
  }

  /**
   * Agrega la capa en el listado de capas disponibles para usarse.
   * @param {import("ol/layer/Layer.js").default} capa objeo de capa de OpenLayers.
   */
  function registrarNuevaCapa(capa) {
    const idCapa = capa.get('id')
    if (laCapaYaExiste(idCapa)) return

    capasRegistradas[idCapa] = ref(capa)
  }

  /**
   * Este watcher actualiza la variable `estadoCapasCargadorVisible` cada que cambie el estado
   * de algua capa, filra solo las capas que tienen el cargador visible y checa si hay alguna
   * capa en procesos de carga `tiposEstatusCarga.ini`.
   */
  watch(
    () =>
      Object.values(capasRegistradas)
        .filter(capa => capa.value.get('verCargador'))
        .map(capa => capa.value.get('estatusCarga'))
        .join(),
    estadoCapasCargadorVisible =>
      (hayCapasCargadorVisibleProcesando.value =
        estadoCapasCargadorVisible.includes(tiposEstatusCarga.ini))
  )

  /**
   * Esta función en un pequeño composable para acceder a propiedades reactivas y funciones de a
   * una capa en especifico.
   * @param {String} idCapa id de la caopa a la que se vinculará.
   */
  function vincularCapa(idCapa) {
    const capa = () => capasRegistradas[idCapa].value

    const nombre = ref(capa().get('nombre'))
    const estatusCarga = ref(capa().get('estatusCarga'))
    // const verCargador = ref(capa().get('verCargador'))
    const visibilidad = ref(capa().getVisible())

    /**
     * Cambiar el estado de visivilidad de una capa de acuerdo con su id. Si no se define el
     * parámetro booleano, se asignará el estado contratrio de su estado actual.
     * @param {Boolean|undefined} estado prendido/apagado.
     */
    function alternarVisibilidad(estado = undefined) {
      if (estado === undefined) estado = !capa().getVisible()
      capa().setVisible(estado)
    }
    watch(
      () => capa().values_.visible,
      nuevoValor => (visibilidad.value = nuevoValor)
    )
    watch(visibilidad, alternarVisibilidad)

    /**
     * Cambia el nombre de la capa, la cual es visible en la leyenda nativa.
     * @param {String} estado nombre a asignar.
     */
    function cambiarNombre(nuevoNombre) {
      capa().set('nombre', nuevoNombre)
    }
    watch(
      () => capa().values_.nombre,
      nuevoValor => (nombre.value = nuevoValor)
    )

    function cambiarEstatusCarga(nuevoEstatus) {
      estatusCarga.value = nuevoEstatus
    }
    watch(estatusCarga, nuevoEstatus =>
      capa().set('estatusCarga', nuevoEstatus)
    )

    return {
      alternarVisibilidad,
      visibilidad,
      cambiarNombre,
      nombre,
      cambiarEstatusCarga,
    }
  }

  return {
    agregarTodoALMapa,
    limpiarRegistro,
    registrarNuevaCapa,
    vincularCapa,
    hayCapasCargadorVisibleProcesando,
  }
}
