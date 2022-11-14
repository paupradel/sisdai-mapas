<script>
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { ImageSourceEventType } from 'ol/source/Image'

import usarCapa, { props, emits } from '../../composables/usarCapa'

export default {
  name: 'SisdaiCapaWms',
  props: {
    /**
     * Url del servicio wms.
     */
    url: {
      type: String,
      required: true,
    },

    /**
     * Parametros del servicio wms, layers, cql, styles, etc
     */
    parametros: {
      type: Object,
      default: function () {
        return {}
      },
    },

    /**
     * Parametro de tipo de servidor.
     * @see https://openlayers.org/en/latest/apidoc/module-ol_source_WMSServerType.html
     */
    servidor: {
      type: String,
      default: 'geoserver',
    },

    /**
     * Extensión de la capa. Con este parametro se calcularán los minimos y maximos de las capas
     * registradas en el mapa.
     */
    extension: {
      type: Array,
      default: () => [],
    },

    ...props,
  },
  emits: ['alIniciarCarga', 'alFinalizarCarga', ...emits],
  setup(propsSetup, { emit }) {
    const source = new ImageWMS({
      url: propsSetup.url,
      params: propsSetup.parametros,
      serverType: propsSetup.servidor,
      crossOrigin: 'Anonymous',
    })

    source.on(ImageSourceEventType.IMAGELOADSTART, () => emit('alIniciarCarga'))
    source.on(
      [ImageSourceEventType.IMAGELOADEND, ImageSourceEventType.IMAGELOADERROR],
      e => {
        emit('alFinalizarCarga', e.type === ImageSourceEventType.IMAGELOADEND)
      }
    )

    usarCapa(propsSetup, emit).registrar(
      new ImageLayer({
        source,
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
