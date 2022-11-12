<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import TileEventType from 'ol/source/TileEventType'

import usarCapa, { props, emits } from '../../composables/usarCapa'

export default {
  name: 'SisdaiCapaXyzOsm',
  props,
  emits: ['alIniciarCargaMosaico', 'alFinalizarCargaMosaico', ...emits],
  setup(propsSetup, { emit }) {
    const source = new OSM()

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
