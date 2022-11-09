<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import usarCapa, { props, emits } from '../../composables/usarCapa'

export default {
  name: 'SisdaiCapaXyzOsm',
  props,
  emits,
  setup(propsSetup, { emit }) {
    usarCapa(propsSetup, emit).registrar(
      new TileLayer({
        source: new OSM(),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
