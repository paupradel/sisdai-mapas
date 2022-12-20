/**
 * @module composables/usarCapaVectorial
 */

import {
  DEFAULT_FILL_COLOR,
  DEFAULT_STROKE_COLOR,
  DEFAULT_RADIUS,
} from './../defaults/estiloCapa'
import usarCapa, { props as propsCapa, emits as emitsCapa } from './usarCapa'

export const props = {
  /**
   * Fuente de datos de una capa GeoJSON
   */
  url: {
    type: String,
    default: '',
  },

  /**
   * Objetos que se convertiran en feature, dependera del tipo de capa la estructura que estos
   * deben tener (si esta definido, url se ignora )
   */
  datos: {
    type: [Array, Object],
    default: undefined,
  },

  /**
   *
   */
  estilo: {
    type: Object,
    default: () => ({
      fill: {
        color: DEFAULT_FILL_COLOR,
      },
      stroke: {
        width: 1,
        color: DEFAULT_STROKE_COLOR, // "scale["color"]"
      },
      circle: {
        fill: {
          color: DEFAULT_FILL_COLOR,
        },
        stroke: {
          color: DEFAULT_STROKE_COLOR,
          width: 1,
        },
        radius: DEFAULT_RADIUS,
      },
    }),
  },

  ...propsCapa,
}

export const emits = [...emitsCapa]

export default function usarCapaVectorial(propsParam, emitsParam) {
  // function asignarEstilo(params) {}

  return {
    ...usarCapa(propsParam, emitsParam),
  }
}
