<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import usarCapaTeselas, {
  props,
  emits,
} from '../../composables/usarCapaTeselas'

export default {
  name: 'SisdaiCapaXyzOsm',
  props,
  emits,
  setup(propsSetup, { emit }) {
    usarCapaTeselas(propsSetup, emit).registrar(
      new TileLayer({
        source: new OSM(),
        // className: this.className,
      })
    )
  },
  render: () => null,
}
</script>
