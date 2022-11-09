<script>
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'

import usarCapa, { props, emits } from '../../composables/usarCapa'
import { toRefs } from 'vue'

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
    ...props,
  },
  emits,
  setup(propsSetup, { emit }) {
    const { parametros, url, servidor } = toRefs(propsSetup)
    usarCapa(propsSetup, emit).registrar(
      new ImageLayer({
        source: new ImageWMS({
          url: url.value,
          params: parametros.value,
          serverType: servidor.value,
          crossOrigin: 'Anonymous',
        }),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
