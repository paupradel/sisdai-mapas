/**
 * @module composables/usarCapasRegistradas
 */

import { ref, watch } from 'vue'

/**
 * Objeto de objetos de capas de openlayers, los leys de cada objeto debe ser el id de cada capa.
 */
const olCapas = {}
const capasRegistradas = {}

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

    olCapas[idCapa] = capa
    capasRegistradas[idCapa] = ref(capa)
  }

  /**
   * Agrega funciones a eventos detectables.
   * @param {String} idCapa id de la caopa a la que se agregará el evento.
   * @param {import("ol/ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
   *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} tipoEvento
   *    tipio de evento a detectar.
   * @param {Function} funsion función que se desencadenará al detectar el evento.
   function agregarFuncionesPorEvento(idCapa, tipoEvento, funcion) {
     olCapas[idCapa].on(tipoEvento, funcion)
    }
   */

  /**
   * Esta función en un pequeño composable para acceder a propiedades reactivas y funciones de a
   * una capa en especifico.
   * @param {String} idCapa id de la caopa a la que se vinculará.
   */
  function vincularCapa(idCapa) {
    const capa = () => capasRegistradas[idCapa].value

    const visibilidad = ref(capa().getVisible())
    const nombre = ref(capa().get('nombre'))

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

    return {
      alternarVisibilidad,
      visibilidad,
      cambiarNombre,
      nombre,
    }
  }

  return {
    agregarTodoALMapa,
    registrarNuevaCapa,
    vincularCapa,
  }
}
