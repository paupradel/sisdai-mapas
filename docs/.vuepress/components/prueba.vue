<template>
  <SisdaiMapa
    :centro="mapa.centro"
    :escalaGrafica="mapa.escalaGrafica"
    :zoom="mapa.zoom"
  >
    <!--
      :extension="mapa.extension"
    -->
    <SisdaiMapaEncabezado>
      Cotroles que no son del mapa
      <div>
        <span>
          <input
            type="checkbox"
            id="check-escala"
            v-model="mapa.escalaGrafica"
          />
          <label for="check-escala">Visualizar escala</label>
        </span>
      </div>

      <div class="inline">
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

      <hr />
      Controles del mapa
      <SisdaiMapaLeyenda :para="osm.id" />
      <SisdaiMapaLeyenda :para="geojson.id" />
      <SisdaiMapaLeyenda :para="xyz.id" />
      <SisdaiMapaLeyenda :para="wms.id" />
    </SisdaiMapaEncabezado>

    <SisdaiMapaCapas>
      <SisdaiCapaGeojson
        :id="geojson.id"
        :datos="geojson.datos"
        :nombre="geojson.nombre"
        :visible="geojson.visible"
        :zIndex="geojson.zIndex"
        @alCambiarVisibilidad="v => (geojson.visible = v)"
        @alIniciarCarga="tipo => alIniciarCarga('geojson', tipo)"
        @alFinalizarCarga="tipo => alFinalizarCarga('geojson', tipo)"
      />

      <SisdaiCapaXyzOsm
        :id="osm.id"
        :nombre="osm.nombre"
        :visible="osm.visible"
        :zIndex="osm.zIndex"
        @alIniciarCargaTesela="tipo => alIniciarCarga('osm', tipo)"
        @alFinalizarCargaTesela="tipo => alFinalizarCarga('osm', tipo)"
      />

      <SisdaiCapaXyz
        :id="xyz.id"
        :nombre="xyz.nombre"
        :url="xyz.url"
        :visible="xyz.visible"
        :zIndex="xyz.zIndex"
        @alIniciarCargaTesela="tipo => alIniciarCarga('xyz', tipo)"
        @alFinalizarCargaTesela="tipo => alFinalizarCarga('xyz', tipo)"
      />

      <SisdaiCapaWms
        :id="wms.id"
        :nombre="wms.nombre"
        :parametros="wms.parametros"
        :url="wms.url"
        :visible="wms.visible"
        :zIndex="wms.zIndex"
        @alIniciarCarga="tipo => alIniciarCarga('wms', tipo)"
        @alFinalizarCarga="tipo => alFinalizarCarga('wms', tipo)"
      />
    </SisdaiMapaCapas>
  </SisdaiMapa>
</template>

<script setup>
import edos from './../public/capas/sample-edos.json'

import { ref } from 'vue'

const extension = [
  -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
]

const mapa = ref({
  centro: [-102, 24],
  escalaGrafica: true,
  iconoConacytVisible: false,
  // extension,
  zoom: 4.5,
})

const osm = ref({
  id: 'osm-capa-id',
  nombre: 'Capa de OpenStreetMap',
  visible: true,
  zIndex: 0,
})

const geojson = ref({
  id: 'geojson-capa-id',
  datos: edos,
  nombre: 'Capa Vectorial GeoJSON',
  visible: true,
  zIndex: 1,
})

const xyz = ref({
  id: 'xyz-capa-id',
  nombre: 'Capa XYZ de calles',
  url: 'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
  visible: false,
  zIndex: 3,
})

const wms = ref({
  id: 'wms-capa-id',
  nombre: 'Capa WMS de estados',
  parametros: { LAYERS: 'estados_inegi_2019' },
  url: 'https://geo.crip.conacyt.mx/geoserver/estados_inegi_2019/wms',
  visible: false,
  zIndex: 2,
})

function alIniciarCarga(tipo) {
  console.log(`Empezó a cargar ${tipo}`)
}
function alFinalizarCarga(tipo, estatus) {
  console.log(`Terminó de cargar ${tipo}`, estatus)
}
</script>

<style lang="scss">
.inline {
  display: flex;
  input[type='text'] {
    margin: 0 !important;
  }
}
</style>
