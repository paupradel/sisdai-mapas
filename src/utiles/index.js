/**
 * @module utiles/index
 */

/**
 * Devuelve una cadena de texto aleatoreo.
 * @returns {String}
 */
export function idAleatorio() {
  return Math.random().toString(36).substring(7)
}

/**
 *
 * @param {Array} extension
 * @returns
 */
export function extensionEsValida(extension) {
  return Boolean(Number(extension[0]) !== 0 && Number(extension[3]) !== 0)
}
