<script setup>
import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import VectorEventType from 'ol/source/VectorEventType'

import usarCapaVectorial, {
  props,
  emits,
} from './../../composables/usarCapaVectorial'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emit = defineEmits(['alIniciarCarga', 'alFinalizarCarga', ...emits])

const source = new VectorSource({
  features: new GeoJSON().readFeatures({ ...propsSetup.datos }),
})

source.on(VectorEventType.FEATURESLOADSTART, ({ target }) => {
  emit('alIniciarCarga')

  // si los datos no son cargados mediante url, los datos yas se tienen al alcance.
  if (target.getUrl() === undefined) {
    emit('alFinalizarCarga', true)
  }
})
source.on(
  // Estos eventos solo se desencadenan cuando los datos son cargados por una url.
  [VectorEventType.FEATURESLOADEND, VectorEventType.FEATURESLOADERROR],
  ({ type }) => {
    emit('alFinalizarCarga', type === VectorEventType.FEATURESLOADEND)
  }
)

usarCapaVectorial(propsSetup, emit).registrar(
  new VectorLayer({
    source,
    // className: this.className,
  })
)
</script>

<template style="display: none"><span /></template>
