<script>
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

import usarCapa, { props, emits } from '../../composables/usarCapa'
import { toRefs } from 'vue'

export default {
  name: 'SisdaiCapaXyz',
  props: {
    url: {
      type: String,
      default:
        'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
    },
    ...props,
  },
  emits,
  setup(propsSetup, { emit }) {
    const { url } = toRefs(propsSetup)
    usarCapa(propsSetup, emit).registrar(
      new TileLayer({
        source: new XYZ({ url: url.value, crossOrigin: 'Anonymous' }),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
