/**
 * @module composables/utiles
 */

/**
 * Cambiar el estado de visivilidad de la capa. Si no se define el parámetro booleano, se
 * asignará el estado contratrio de su estado actual.
 * @param {import("ol/layer/Layer.js").default} olCapa capa de OpenLayers
 * @param {Boolean|undefined} estado
 */
export function alternarVisibilidadCapa(capa, estado = undefined) {
  if (capa) {
    if (estado === undefined) {
      capa.setVisible(!capa.getVisible())
    } else capa.setVisible(estado)
  }
}
