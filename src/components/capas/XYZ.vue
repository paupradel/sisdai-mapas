<script>
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import TileEventType from 'ol/source/TileEventType'

import usarCapa, { props, emits } from '../../composables/usarCapa'

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
  emits: ['alIniciarCargaMosaico', 'alFinalizarCargaMosaico', ...emits],
  setup(propsSetup, { emit }) {
    const source = new XYZ({ url: propsSetup.url, crossOrigin: 'Anonymous' })

    source.on(TileEventType.TILELOADSTART, () => emit('alIniciarCargaMosaico'))
    source.on([TileEventType.TILELOADEND, TileEventType.TILELOADERROR], e => {
      emit('alFinalizarCargaMosaico', e.type === TileEventType.TILELOADEND)
    })

    usarCapa(propsSetup, emit).registrar(
      new TileLayer({
        source,
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
