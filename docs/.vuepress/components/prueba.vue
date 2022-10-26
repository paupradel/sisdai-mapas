<template>
  <SisdaiMapa
    :centro="mapa.centro"
    :iconoConacytVisible="true"
    :extension="mapa.extension"
    :zoom="mapa.zoom"
  >
    <SisdaiMapaEncabezado>
      Hola este es el encabezado
      <p>Cómo me gustaría tener más contenido</p>
    </SisdaiMapaEncabezado>

    <SisdaiMapaCapas>
      <DaiCapaGeojson
        :datos="geojson.edos"
        :zIndex="geojson.zIndex"
      />

      <DaiCapaXyzOsm :zIndex="osm.zIndex" />
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
      zIndex: 1,
    },
    osm: {
      zIndex: 0,
    },
  }),
}
</script>
