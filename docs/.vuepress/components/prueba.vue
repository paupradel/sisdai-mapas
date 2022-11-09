<template>
  <SisdaiMapa
    :centro="mapa.centro"
    :iconoConacytVisible="true"
    :extension="mapa.extension"
    :zoom="mapa.zoom"
  >
    <SisdaiMapaEncabezado>
      <div class="iline">
        GeoJSON:
        <button
          class="boton-secundario boton-chico"
          @click="geojson.visible = !geojson.visible"
        >
          {{ geojson.visible ? 'Apagar' : 'Prender' }}
        </button>
        <input
          type="text"
          v-model="geojson.nombre"
        />
      </div>
      <SisdaiMapaLeyenda :para="geojson.id" />

      <hr />

      <div class="iline">
        OSM:
        <button
          class="boton-secundario boton-chico"
          @click="osm.visible = !osm.visible"
        >
          {{ osm.visible ? 'Apagar' : 'Prender' }}
        </button>
        <input
          type="text"
          v-model="osm.nombre"
        />
      </div>
      <SisdaiMapaLeyenda :para="osm.id" />
    </SisdaiMapaEncabezado>

    <SisdaiMapaCapas>
      <SisdaiCapaGeojson
        :id="geojson.id"
        :datos="geojson.datos"
        :nombre="geojson.nombre"
        :visible="geojson.visible"
        :zIndex="geojson.zIndex"
      />

      <SisdaiCapaXyzOsm
        :id="osm.id"
        :nombre="osm.nombre"
        :visible="osm.visible"
        :zIndex="osm.zIndex"
        @al-cambiar-visibilidad="alCambiarVisibilidad"
      />
    </SisdaiMapaCapas>
  </SisdaiMapa>
</template>

<script setup>
import edos from './../public/capas/sample-edos.json'

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
  nombre: 'Capa de OpenStreetMap',
  visible: true,
  zIndex: 0,
})

watch(
  () => osm.value.visible,
  () => {
    console.log('osm.visible cambió')
  }
)

function alCambiarVisibilidad(params) {
  console.log('emit detectado')
}

const geojson = ref({
  id: 'geojson-capa-id',
  datos: edos,
  nombre: 'Capa de Vectorial GeoJSON',
  visible: true,
  zIndex: 1,
})
</script>

<style lang="scss">
.iline {
  display: flex;
  input[type='text'] {
    margin: 0 !important;
  }
}
</style>
