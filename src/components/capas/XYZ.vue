<script>
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

import usarCapaMosaico, {
  props,
  emits,
} from './../../composables/usarCapaMosaico'

export default {
  name: 'SisdaiCapaXyz',
  props,
  emits,
  setup(propsSetup, { emit }) {
    usarCapaMosaico(propsSetup, emit).registrar(
      new TileLayer({
        source: new XYZ({ url: propsSetup.url, crossOrigin: 'Anonymous' }),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
