<script setup>
import edos from './../../capas/ejemplo-edos.json'
</script>

<template>
  <sisdai-mapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <sisdai-mapa-encabezado>
      
    </sisdai-mapa-encabezado>

    <sisdai-capa-xyz :zIndex="0" />

    <sisdai-capa-geojson
      :datos="edos"
      :zIndex="1"
      :clasificacion="{
        tipo: 'categorias',
        columna: 'grado_marg',
        propiedadEstilo: 'relleno',
        colores: ['red', 'black', 'yellow', 'green', 'orange'],
      }"
    />
    <!--
    -->
  </sisdai-mapa>
</template>

<style></style>
