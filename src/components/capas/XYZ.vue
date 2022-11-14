<script>
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import usarCapaTeselas, {
  props,
  emits,
} from '../../composables/usarCapaTeselas'

export default {
  name: 'SisdaiCapaXyz',
  props,
  emits,
  setup(propsSetup, { emit }) {
    usarCapaTeselas(propsSetup, emit).registrar(
      new TileLayer({
        source: new XYZ({ url: propsSetup.url, crossOrigin: 'Anonymous' }),
        // className: this.className,
      })
    )
  },
  render: () => null,
}
</script>
