<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import usarCapaMosaico, {
  props,
  emits,
} from './../../composables/usarCapaMosaico'

export default {
  name: 'SisdaiCapaXyzOsm',
  props,
  emits,
  setup(propsSetup, { emit }) {
    usarCapaMosaico(propsSetup, emit).registrar(
      new TileLayer({
        source: new OSM(),
        // className: this.className,
      })
    )
  },
  render: () => null,
}
</script>
