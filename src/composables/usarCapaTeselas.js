/**
 * @module composables/usarCapaTeselas
 */

import TileEventType from 'ol/source/TileEventType'
import usarCapa, { props as propsCapa, emits as emitsCapa } from './usarCapa'

export const props = {
  /**
   *
   */
  url: {
    type: String,
    default:
      'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
  },

  ...propsCapa,
}

export const emits = [
  'alIniciarCargaTesela',
  'alFinalizarCargaTesela',
  ...emitsCapa,
]

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de las capas que sean
 * cargadas por teselas desde diferentes componentes o composables.
 * @param {Object} propsParam props genéricos de capa.
 * @param {Object} emitsParam emits genéricos de capa.
 * @returns {Function} composable.
 */
export default function usarCapaTeselas(propsParam, emitsParam) {
  /**
   * .
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function agregarEmitsCarga(olCapa) {
    olCapa
      .getSource()
      .on(TileEventType.TILELOADSTART, () => emitsParam('alIniciarCargaTesela'))
    olCapa
      .getSource()
      .on([TileEventType.TILELOADEND, TileEventType.TILELOADERROR], e => {
        emitsParam(
          'alFinalizarCargaTesela',
          e.type === TileEventType.TILELOADEND
        )
      })
  }

  /**
   *
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function registrar(olCapa) {
    agregarEmitsCarga(olCapa)
    usarCapa(propsParam, emitsParam).registrar(olCapa)
  }

  return { registrar }
}
