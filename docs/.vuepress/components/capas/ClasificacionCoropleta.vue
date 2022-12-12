<script setup>
import edos from './../../capas/ejemplo-edos.json'
</script>

<template>
  <sisdai-mapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <sisdai-capa-geojson
      id="clasificada"
      nombre="Capa clasificada"
      :datos="edos"
      :zIndex="1"
      :clasificacion="{
        tipo: 'categorias',
        columna: 'grado_marg',
        propiedadEstilo: 'relleno',
        colores: ['red', 'black', 'yellow', 'green', 'orange'],
      }"
    />

    <!--<sisdai-mapa-encabezado>

      <hr>
      <sisdai-mapa-leyenda para="clasificada" />
    </sisdai-mapa-encabezado>-->

    <sisdai-capa-xyz :zIndex="0" />
  </sisdai-mapa>
</template>

<style></style>
