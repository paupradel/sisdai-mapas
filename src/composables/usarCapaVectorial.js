/**
 * @module composables/usarCapaVectorial
 */

import VectorEventType from 'ol/source/VectorEventType'
import GeoJSON from 'ol/format/GeoJSON'
import tiposEstatusCarga from './../defaults/estatusCarga'
import { crearEstiloOl } from './casificacion/json2estiloOl'
import estiloCapaPorDefecto from './../defaults/estiloCapa'
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
  let featuresTodos = '[]'

  const {
    estatusCarga,
    registrar: registrarCapa,
    vincular,
  } = usarCapa(propsParam, emitsParam)

  const { estilo, clasificacion } = toRefs(propsParam)

  /**
   * Agrega los porps al objeto y propiedades de la capa.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function asignarPorps(olCapa) {
    olCapa.set('estilo', JSON.stringify(estilo.value))
  }

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
  function asignarEstilo(olCapa) {
    olCapa.setStyle(crearEstiloOl(estilo.value))
  }

  function conseguirClases(clasificacion) {
    // unicos
    return [
      ...new Set(
        JSON.parse(featuresTodos)
          .map(feature => feature.properties)
          .map(propiedad => propiedad[clasificacion.columna])
      ),
    ]
  }

  function conseguirEstilosClases(clases) {
    return clases.map((clase, idx) => {
      let _estilo = { ...estilo.value }
      if (clasificacion.value.colores) {
        if (clasificacion.value.colores[idx]) {
          _estilo[clasificacion.value.propiedadEstilo] = {
            color: clasificacion.value.colores[idx],
          }
        }
      }

      return {
        clase: String(clase),
        etiqueta: String(clase),
        orden: idx,
        estilo: _estilo,
        cantidad: 0,
      }
    })
  }

  function asignarClasificacion(olCapa, estilosCalses) {
    olCapa
      .getSource()
      .getFeatures()
      .forEach(feature => {
        feature.setStyle(
          crearEstiloOl(
            estilosCalses.find(
              clase =>
                clase.clase === String(feature.get(clasificacion.value.columna))
            ).estilo
          )
        )
      })
  }

  /**
   *
   * @param {*} olCapa
   */
  function registrar(olCapa) {
    asignarPorps(olCapa)
    agregarEmitsCarga(olCapa)
    registrarCapa(olCapa)

    const { cambiarEstilo } = vincular()

    if (clasificacion.value !== undefined) {
      console.log('clasificar')
      featuresTodos = JSON.stringify(
        new GeoJSON().writeFeaturesObject(olCapa.getSource().getFeatures())
          .features
      )

      const estilosCalses = conseguirEstilosClases(
        conseguirClases(clasificacion.value)
      )
      cambiarEstilo(estilosCalses, capa =>
        asignarClasificacion(capa, estilosCalses)
      )
    } else {
      cambiarEstilo(estilo.value, asignarEstilo)
    }

    watch(estilo, nuevoEstilo => cambiarEstilo(nuevoEstilo, asignarEstilo))
    watch(clasificacion, nuevaClasificacion => {
      const estilosCalses = conseguirEstilosClases(
        conseguirClases(nuevaClasificacion)
      )
      cambiarEstilo(estilosCalses, capa =>
        asignarClasificacion(capa, estilosCalses)
      )
    })
  }

  return {
    registrar,
  }
}
