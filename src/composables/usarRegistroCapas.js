/**
 * @module composables/usarMapa
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
export default function usarRegistroCapas() {
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

  return {
    agregarTodoALMapa,
    registrar,
    capas: olCapas,
  }
}
