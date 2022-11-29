<script setup>
import { onMounted } from 'vue'
import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import VectorEventType from 'ol/source/VectorEventType'
import tiposEstatusCarga from './../../defaults/estatusCarga'

import usarCapaVectorial, {
  props,
  emits,
} from './../../composables/usarCapaVectorial'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emitsSetup = defineEmits(emits)

const { registrar, estatusCarga } = usarCapaVectorial(propsSetup, emitsSetup)

const source = new VectorSource({
  features: new GeoJSON().readFeatures({ ...propsSetup.datos }),
})

source.on(VectorEventType.FEATURESLOADSTART, ({ target }) => {
  emitsSetup('alIniciarCarga')
  estatusCarga.value = tiposEstatusCarga.ini

  // si los datos no son cargados mediante url, los datos yas se tienen al alcance.
  if (target.getUrl() === undefined) {
    emitsSetup('alFinalizarCarga', true)
    estatusCarga.value = tiposEstatusCarga.fin
  }
})
source.on(
  // Estos eventos solo se desencadenan cuando los datos son cargados por una url.
  [VectorEventType.FEATURESLOADEND, VectorEventType.FEATURESLOADERROR],
  ({ type }) => {
    emitsSetup('alFinalizarCarga', type === VectorEventType.FEATURESLOADEND)
  }
)

onMounted(() => {
  registrar(
    new VectorLayer({
      source,
      // className: this.className,
    })
  )
})
</script>

<template style="display: none"><span /></template>
