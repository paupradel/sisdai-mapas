<template>
  <SisdaiMapa
    :centro="mapa.centro"
    :iconoConacytVisible="true"
    :extension="mapa.extension"
    :zoom="mapa.zoom"
  >
    <SisdaiMapaEncabezado>
      <div>
        Hola este es el encabezado
        <button @click="osm.visible = !osm.visible">
          {{ osm.visible ? 'apagar' : 'prender' }}
        </button>
      </div>

      <SisdaiMapaLeyenda :para="osm.id" />
    </SisdaiMapaEncabezado>

    <SisdaiMapaCapas>
      <!--SisdaiCapaGeojson
        :datos="geojson.edos"
        :visible="geojson.visible"
        :zIndex="geojson.zIndex"
      /-->

      <SisdaiCapaXyzOsm
        :id="osm.id"
        :visible="osm.visible"
        :zIndex="osm.zIndex"
      />
      <!--
        @al-cambiar-visibilidad="visibilidad => (osm.visible = visibilidad)"
      -->
    </SisdaiMapaCapas>
  </SisdaiMapa>
</template>

<script setup>
// import edos from './../public/capas/sample-edos.json'

import { ref, watch } from 'vue'

const extension = [
  -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
]

const mapa = {
  centro: [-102, 24],
  iconoConacytVisible: false,
  // extension,
  zoom: 4.5,
}

const osm = ref({
  id: 'osm-capa-id',
  visible: true,
  zIndex: 0,
})

watch(
  () => osm.value.visible,
  () => {
    console.log('osm.visible cambió')
  }
)

/*export default {
  data: () => ({
    mapa: {
      centro: [-102, 24],
      iconoConacytVisible: false,
      // extension,
      zoom: 4.5,
    },
    geojson: {
      edos,
      visible: true,
      zIndex: 1,
    },
    osm: {
      id: 'osm-capa-id',
      zIndex: 0,
    },
  }),
}*/
</script>
