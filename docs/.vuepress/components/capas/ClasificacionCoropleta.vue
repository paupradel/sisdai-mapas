<script setup>
import edos from './../../capas/ejemplo-edos.json'
</script>

<template>
  <sisdai-mapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <sisdai-capa-xyz :zIndex="0" />

    <sisdai-capa-geojson
      :datos="edos"
      :zIndex="1"
      :estilo="{
        perimetro: { color: 'black', grosor: 5 },
        relleno: undefined,
      }"
    />
    <!--
    -->
  </sisdai-mapa>
</template>

<style></style>
