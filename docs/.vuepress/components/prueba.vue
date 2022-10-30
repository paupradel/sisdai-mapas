<template>
  <SisdaiMapa
    :centro="mapa.centro"
    :iconoConacytVisible="true"
    :extension="mapa.extension"
    :zoom="mapa.zoom"
  >
    <SisdaiMapaEncabezado>
      <div>Hola este es el encabezado</div>

      <SisdaiMapaLeyenda para="capaConLeyenda" />
    </SisdaiMapaEncabezado>

    <SisdaiMapaCapas>
      <SisdaiCapaGeojson
        id="capaConLeyenda"
        :datos="geojson.edos"
        :visible="geojson.visible"
        :zIndex="geojson.zIndex"
      />

      <SisdaiCapaXyzOsm :zIndex="osm.zIndex" />
    </SisdaiMapaCapas>
  </SisdaiMapa>
</template>

<script>
import edos from './../public/capas/sample-edos.json'

const extension = [
  -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
]

export default {
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
      zIndex: 0,
    },
  }),
}
</script>
