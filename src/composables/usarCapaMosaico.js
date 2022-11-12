/**
 * @module composables/usarCapaMosaico
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
  'alIniciarCargaMosaico',
  'alFinalizarCargaMosaico',
  ...emitsCapa,
]

export default function usarCapaMosaico(propsParam, emitsParam) {
  function agregarEmitsCarga(olCapa) {
    olCapa
      .getSource()
      .on(TileEventType.TILELOADSTART, () =>
        emitsParam('alIniciarCargaMosaico')
      )
    olCapa
      .getSource()
      .on([TileEventType.TILELOADEND, TileEventType.TILELOADERROR], e => {
        emitsParam(
          'alFinalizarCargaMosaico',
          e.type === TileEventType.TILELOADEND
        )
      })
  }

  function registrar(olCapa) {
    agregarEmitsCarga(olCapa)
    usarCapa(propsParam, emitsParam).registrar(olCapa)
  }

  return { registrar }
}
