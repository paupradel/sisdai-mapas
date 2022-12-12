/**
 * @module composables/usarCapaVectorial
 */

import VectorEventType from 'ol/source/VectorEventType'
import tiposEstatusCarga from './../defaults/estatusCarga'
import { crearEstiloOl } from './casificacion/json2estiloOl'
import estiloCapaPorDefecto from './../defaults/estiloCapa'
// import { combinarObjetos } from './../utiles/index'
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
  clasificacion: {
    type: [Object, Array],
    default: () => undefined,
    validator: valor => {
      if (!(typeof valor === typeof {}) || valor === null) {
        console.error(
          'Es necesario un objeto o un arreglo de objetos para realizar la clasificación de la capa'
        )
        return false
      }
      return true
    },
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

  const { estilo, clasificacion } = toRefs(propsParam)

  /**
   *
   * @param {*} olCapa
   */
  function asignarClasificacion(olCapa) {
    const features = olCapa.getSource().getFeatures()

    const propiedades = features.map(feature => feature.getProperties())

    const unicos = [
      ...new Set(
        propiedades.map(propiedad => propiedad[clasificacion.value.columna])
      ),
    ]

    features.forEach(feature => {
      let _estilo = estilo.value
      _estilo[clasificacion.value.propiedadEstilo] = {
        color:
          clasificacion.value.colores[
            unicos.indexOf(feature.getProperties()[clasificacion.value.columna])
          ],
      }

      feature.setStyle(crearEstiloOl(_estilo))
    })
  }

  /**
   *
   * @param {*} olCapa
   */
  function asignarEstilo(olCapa = vincular().capa()) {
    if (clasificacion.value !== undefined) {
      asignarClasificacion(olCapa)
    } else {
      olCapa.setStyle(crearEstiloOl(estilo.value))
      olCapa.set('estilo', JSON.stringify(estilo.value))
    }
  }
  watch(estilo, () => asignarEstilo())
  watch(clasificacion, () => asignarEstilo())

  /**
   *
   * @param {*} olCapa
   */
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

  /**
   *
   * @param {*} olCapa
   */
  function registrar(olCapa) {
    asignarEstilo(olCapa)
    agregarEmitsCarga(olCapa)
    registrarCapa(olCapa)
  }

  return {
    registrar,
  }
}
