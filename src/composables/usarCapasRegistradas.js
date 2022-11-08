/**
 * @module composables/usarCapasRegistradas
 */

/**
 * Objeto de objetos de capas de openlayers, los leys de cada objeto debe ser el id de cada capa.
 */
const olCapas = {}

/**
 * La finalidad de este composable es acceder al a las capas usadan en cada intsncia del
 * componernte desde diferentes componentes o composables de esta biblioteca.
 * @returns {Function} composable.
 */
export default function usarCapasRegistradas() {
  /**
   * Agrega todas las capas registradas en el objeto olCapas en el mapa visible.
   * @param {import("ol/Map.js").default} mapa objeto de mapa de openlayers.
   */
  function agregarTodoALMapa(mapa) {
    for (const idCapa in olCapas) {
      if (olCapas[idCapa]) {
        mapa.addLayer(olCapas[idCapa])
      }
    }
  }

  /**
   * Devuelve verdadero si la capa ya se encuentra dentro del objeto olCapas
   * @param {String} idCapa identificador único de la capa.
   * @returns {Boolean}
   */
  function laCapaYaExiste(idCapa) {
    if (olCapas[idCapa] !== undefined) {
      console.warn('¡La capa ya existe!')
      return true
    }
    return false
  }

  /**
   * Agrega la capa en el listado de capas disponibles para usarse.
   * @param {import("ol/layer/Layer.js").default} capa objeo de capa de OpenLayers.
   */
  function registrar(capa) {
    const idCapa = capa.get('id')
    if (laCapaYaExiste(idCapa)) return

    olCapas[idCapa] = capa
  }

  /**
   * Cambiar el estado de visivilidad de una capa de acuerdo con su id. Si no se define el
   * parámetro booleano, se asignará el estado contratrio de su estado actual.
   * @param {String} idCapa capa de OpenLayers.
   * @param {Boolean|undefined} estado prendido/apagado.
   */
  function alternarVisibilidadCapa(idCapa, estado = undefined) {
    if (olCapas[idCapa]) {
      if (estado === undefined) {
        olCapas[idCapa].setVisible(!olCapas[idCapa].getVisible())
      } else olCapas[idCapa].setVisible(estado)
    }
  }

  /**
   * Agrega funciones a eventos detectables.
   * @param {String} idCapa id de la caopa a la que se agregará el evento.
   * @param {import("ol/ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
   *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} tipoEvento
   *    tipio de evento a detectar.
   * @param {Function} funsion función que se desencadenará al detectar el evento.
   */
  function agregarFuncionesPorEvento(idCapa, tipoEvento, funcion) {
    olCapas[idCapa].on(tipoEvento, funcion)
  }

  return {
    agregarTodoALMapa,
    registrar,
    alternarVisibilidadCapa,
    agregarFuncionesPorEvento,
    capas: olCapas,
  }
}
