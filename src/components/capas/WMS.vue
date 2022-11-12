<script>
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { ImageSourceEventType } from 'ol/source/Image'

import usarCapa, { props, emits } from '../../composables/usarCapa'
import { toRefs } from 'vue'

// const { IMAGELOADSTART, IMAGELOADEND, IMAGELOADERROR } = event

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
  emits,
  setup(propsSetup, { emit }) {
    const { parametros, url, servidor } = toRefs(propsSetup)

    const source = new ImageWMS({
      url: url.value,
      params: parametros.value,
      serverType: servidor.value,
      crossOrigin: 'Anonymous',
    })

    source.on(ImageSourceEventType.IMAGELOADSTART, x =>
      console.log(ImageSourceEventType.IMAGELOADSTART, x)
    )
    source.on(ImageSourceEventType.IMAGELOADEND, x =>
      console.log(ImageSourceEventType.IMAGELOADEND, x)
    )
    source.on(ImageSourceEventType.IMAGELOADERROR, x =>
      console.log(ImageSourceEventType.IMAGELOADERROR, x)
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
