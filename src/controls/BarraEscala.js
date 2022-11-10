/**
 * @module control/BarraEscala
 */

import ScaleLine from 'ol/control/ScaleLine'

/**
 * Configuración del objeto original de openlayers.
 */
const consifguracion = {
  units: 'metric',
  bar: true,
  steps: 4,
  text: false,
  minWidth: 140,
  maxWidth: 220,
}

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'barra-escala'

/**
 * @classdesc
 * Clase extendida de la clase `ScaleLine` de openlayers configurada especialmente para este mapa.
 */
export default class BarraEscala extends ScaleLine {
  constructor() {
    super(consifguracion)

    this._agregarClasesSisdai()
  }

  /**
   * Agrega al elemnto HTML del control las clases genéricas de los controles de la biblioteca.
   */
  _agregarClasesSisdai() {
    this.element.classList.add('sisdai-mapa-control')
    this.element.classList.add(`sisdai-mapa-control-${claseCss}`)
  }
}
