<script>
import { toRefs } from 'vue'

import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import usarCapaVectorial, {
  props,
  emits,
} from './../../../composables/usarCapaVectorial'

export default {
  name: 'SisdaiCapaGeojson',
  props,
  emits,
  setup(propsRefs, { emit }) {
    const { datos } = toRefs(propsRefs)

    const { registrar } = usarCapaVectorial(propsRefs, emit)

    registrar(
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures({ ...datos.value }),
        }),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
