/**
 * @module composables/usarMapa
 */

import { ref, toRefs, watch } from 'vue'
// import MapEventType from 'ol/MapEventType'
import View from 'ol/View'
import ControlEscalaGrafica from './../controles/EscalaGrafica'
// import ControlVistaInicial from './../controles/VistaInicial'
import AjusteVista from './../controles/AjusteVista'
import usarCapasRegistradas from './usarCapasRegistradas'
import vistaMapaDefault from './../defaults/vistaMapa'
import { extensionEsValida } from './../utiles'

/**
 * Objeto que contendrá la instancia del mapa, declararlo fuera de la función composable hace que
 * no se genere una nueva variable del mapa cada que se utilice el composable
 */
const olMapa = ref(undefined)

export const props = {
  /**
   * `ajustarVistaPorCapasVisibles`
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Interactivo: ✅
   *
   * Define si al presionar el botón que ajusta la vista, se aplicará el zoom a las capas
   * visibles que tengan una extensión definida.
   */
  ajustarVistaPorCapasVisibles: {
    type: Boolean,
    default: false,
  },

  /**
   * escalaGrafica
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Interactivo: ✅
   *
   * Define si se agrega la escala gráfica en el mapa.
   */
  escalaGrafica: {
    type: Boolean,
    default: true,
    validator: valor => typeof valor === typeof Boolean(),
  },

  /**
   * EVALUAR SI VA AQUÍ O EN LA PROPIEDAD VISTA
   * proyeccion
   * - Tipo: `String`
   * - Valor por defecto: `EPSG:4326`
   * - Interactivo: ❌
   *
   * Código de identificación SRS que define la proyección de la vista.
   *
   * > ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.
   */
  proyeccion: {
    type: String,
    default: 'EPSG:4326',
  },

  /**
   * Tema de la disposición de elemntos de apoyo del mapa (contenedor del header, pie y columnas
   * laterales)
   */
  tema: {
    type: String,
    default: '',
  },

  /**
   * `vista`
   * - Tipo: `Object`
   * - Valor por defecto: `{ centro: [0, 0], zoom: 1.5 }`
   * - Interactivo: ✅
   *
   * Objeto que define la vista del mapa. Revisa los detalles de la vista del mapa en la
   * sigueinte sección.
   */
  vista: {
    type: Object,
    default: () => vistaMapaDefault,
    validator: valor => {
      if (valor.extension) {
        return true
      }

      if (Number(valor.zoom) < 1 && Number(valor.zoom) > 22) {
        // eslint-disable-next-line
        console.error('El valor del zoom debe ser entre 1 y 22')
        return false
      }

      if (!Array.isArray(valor.centro)) {
        return false
      } else if (valor.centro.length < 2) {
        return false
      }

      return true
    },
  },
}

export const eventos = {
  /**
   * Ejecutado cuado se detecta que se ha ajustado la vista del mapa a los valores de la
   * propiedad vista.
   */
  alAjustarVista: 'alAjustarVista',

  /**
   * Ejecutado cuado se detecta que el zoom de la vista del mapa ha cambiado.
   * @param {Number} zoom Nuevo valor de zoom.
   */
  alCambiarZoom: 'alCambiarZoom',
}

export const emits = Object.values(eventos)

/**
 * Uso del mapa, la finalidad de este composable es acceder al mapa desde diferentes componentes
 * o composables.
 * @returns {Function} composable
 */
export default function usarMapa(propsParam, emitsParam) {
  const {
    agregarTodoALMapa: agregarCapasRegistradas,
    limpiarRegistro: limpiarCapasRegistradas,
    hayCapasCargadorVisibleProcesando: verCargador,
  } = usarCapasRegistradas()
  const { escalaGrafica, ajustarVistaPorCapasVisibles, vista } =
    toRefs(propsParam)

  /**
   *
   * @param {import("ol/Map.js").default} mapaInstanciado
   */
  function asignarProps(mapaInstanciado) {
    const vistaMapa = { ...vistaMapaDefault, ...vista.value }
    vistaMapa.tipo = extensionEsValida(vistaMapa.extension)
      ? 'extension'
      : 'centro'
    vistaMapa.ajustePorCapas = ajustarVistaPorCapasVisibles.value
    mapaInstanciado.set('vista', vistaMapa)
    mapaInstanciado.setView(
      new View({
        center: vistaMapa.centro,
        zoom: vistaMapa.zoom,
        projection: propsParam.proyeccion,
      })
    )

    mapaInstanciado.on('moveend', ({ map }) => {
      const zoomRedondeado = Math.round(map.getView().getZoom() * 100) / 100
      if (Number(vista.value.zoom) !== zoomRedondeado) {
        emitsParam(eventos.alCambiarZoom, zoomRedondeado)
      }
    })
  }

  /**
   * Guarda el objeto del mapa en una variable reactiva.
   * @param {import("ol/Map.js").default} mapaInstanciado
   */
  function salvarInstancia(mapaInstanciado) {
    asignarProps(mapaInstanciado)
    agregarCapasRegistradas(mapaInstanciado)
    olMapa.value = mapaInstanciado
    // olMapa.value.set(
    //   'ajustarVistaPorCapasVisibles',
    //   ajustarVistaPorCapasVisibles.value
    // )

    // olMapa.value.on(MapEventType.LOADSTART, console.log(MapEventType.LOADSTART))
    // olMapa.value.on(MapEventType.LOADEND, console.log(MapEventType.LOADEND))
  }

  /**
   * Invoca la limpieza de las capas registradas y reinicia el valor del mapa instanciado.
   */
  function desmontar() {
    limpiarCapasRegistradas()
    olMapa.value = undefined
  }

  /**
   * Devuelve un control por su nombre registrado
   * @param {String} nombreDelControl
   * @returns {import("ol/control/Control.js").default|undefined} olControl
   */
  function conseguirControl(nombreDelControl) {
    if (olMapa.value) {
      return olMapa.value
        .getControls()
        .getArray()
        .find(olControl => olControl.nombre === nombreDelControl)
    }
  }

  /**
   * Agrega un control de openlayers en el mapa.
   * @param {import("ol/control/Control.js").default} olControl
   */
  function agregarControl(olControl) {
    if (olMapa.value) {
      olMapa.value.addControl(olControl)
    }
  }

  /**
   * Quita un control de openlayers en el mapa.
   * @param {import("ol/control/Control.js").default} olControl
   */
  function removerControl(olControl) {
    if (olMapa.value) {
      olMapa.value.removeControl(olControl)
    }
  }

  /**
   * Actualiza la coordenada centrica del mapa
   * @param {Number} centro nueva coordenada centrica
   */
  function cambiarCentro(centro) {
    if (olMapa.value) {
      olMapa.value.getView().setCenter(centro)
    }
  }
  watch(() => vista.value.centro, cambiarCentro)

  /**
   * Quita o agrega el control de escala gáfica en el mapa dependiendo del parámetro boleano.
   * @param {Boolean} visible
   */
  function alternarEscalaGrafica(visible) {
    if (visible) {
      agregarControl(new ControlEscalaGrafica())
    } else {
      removerControl(conseguirControl(ControlEscalaGrafica.nombre))
    }
  }
  watch(escalaGrafica, alternarEscalaGrafica)

  function crearImagen(mapa) {
    const mapCanvas = document.createElement('canvas')
    const size = mapa.getSize()
    mapCanvas.width = size[0]
    mapCanvas.height = size[1]
    const mapContext = mapCanvas.getContext('2d')

    Array.prototype.forEach.call(
      mapa.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity =
            canvas.parentNode.style.opacity || canvas.style.opacity
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
          let matrix
          const transform = canvas.style.transform
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              //eslint-disable-next-line
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number)
          } else {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width,
              0,
              0,
              parseFloat(canvas.style.height) / canvas.height,
              0,
              0,
            ]
          }
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          )
          const backgroundColor = canvas.parentNode.style.backgroundColor
          if (backgroundColor) {
            mapContext.fillStyle = backgroundColor
            mapContext.fillRect(0, 0, canvas.width, canvas.height)
          }
          mapContext.drawImage(canvas, 0, 0)
        }
      }
    )

    mapContext.globalAlpha = 1
    mapContext.setTransform(1, 0, 0, 1, 0, 0)
    return mapCanvas.toDataURL()
  }

  /**
   *
   * @param {String} nombreCaptura
   */
  function exportarImagen(nombreCaptura) {
    olMapa.value.once('rendercomplete', function () {
      const link = document.createElement('a')
      link.href = crearImagen(olMapa.value)
      link.download = `${nombreCaptura}.png`
      link.click()
    })
    olMapa.value.renderSync()
  }

  /**
   * Ajusta la vista del mapa a los valores definidos en la propiedad vista.
   */
  function ajustarVista() {
    const controlAjusteVista = conseguirControl(AjusteVista.nombre)
    controlAjusteVista.ajustar()
  }

  /**
   * Cambiar la extension, esto proboca que el mapa ajuste la vista con la extención actual
   * en caso de ser valida.
   * @param {Array<Number>} extension
   */
  function cambiarExtension(nuevaExtension) {
    olMapa.value.get('vista').tipo = extensionEsValida(nuevaExtension)
      ? 'extension'
      : 'centro'
    olMapa.value.get('vista').extension = nuevaExtension
    ajustarVista()
  }
  // watch(extension, cambiarExtension)
  watch(() => vista.value.extension, cambiarExtension)

  /**
   * Actualiza el nivel de zoom en el mapa.
   * @param {Number} zoom nuevo bnivel de zoom
   */
  function cambiarZoom(zoom) {
    if (olMapa.value) {
      olMapa.value.getView().setZoom(zoom)
    }
  }
  watch(() => vista.value.zoom, cambiarZoom)

  return {
    salvarInstancia,
    desmontar,
    alternarEscalaGrafica,
    verCargador,
    ajustarVista,
    exportarImagen,
  }
}
