/**
 * @module composables/usarCapaVectorial
 */

import VectorEventType from 'ol/source/VectorEventType'
import tiposEstatusCarga from './../defaults/estatusCarga'
import { crearEstiloOl } from './casificacion/json2estiloOl'
import estiloCapaPorDefecto from './../defaults/estiloCapa'
import { combinarObjetos } from './../utiles/index'
import usarCapa, { props as propsCapa, emits as emitsCapa } from './usarCapa'
import { toRefs, watch } from 'vue'

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
    default: () => estiloCapaPorDefecto,
  },

  ...propsCapa,
}

export const emits = [...emitsCapa]

export default function usarCapaVectorial(propsParam, emitsParam) {
  const {
    estatusCarga,
    registrar: registrarCapa,
    vincular,
  } = usarCapa(propsParam, emitsParam)

  const { estilo } = toRefs(propsParam)

  function asignarEstilo(olCapa = vincular().capa()) {
    olCapa.setStyle(
      crearEstiloOl(combinarObjetos(estiloCapaPorDefecto, estilo.value))
    )
  }
  watch(estilo, () => asignarEstilo())

  function agregarEmitsCarga(olCapa) {
    olCapa.getSource().on(VectorEventType.FEATURESLOADSTART, ({ target }) => {
      emitsParam('alIniciarCarga')
      estatusCarga.value = tiposEstatusCarga.ini

      // si los datos no son cargados mediante url, los datos yas se tienen al alcance.
      if (target.getUrl() === undefined) {
        emitsParam('alFinalizarCarga', true)
        estatusCarga.value = tiposEstatusCarga.fin
      }
    })
    olCapa.getSource().on(
      // Estos eventos solo se desencadenan cuando los datos son cargados por una url.
      [VectorEventType.FEATURESLOADEND, VectorEventType.FEATURESLOADERROR],
      ({ type }) => {
        emitsParam('alFinalizarCarga', type === VectorEventType.FEATURESLOADEND)
      }
    )
  }

  function registrar(olCapa) {
    asignarEstilo(olCapa)
    agregarEmitsCarga(olCapa)
    registrarCapa(olCapa)
  }

  return {
    registrar,
  }
}
