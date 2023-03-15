<script setup>
import edos from './../../capas/ejemplo-edos.json'
</script>

<template>
  <SisdaiMapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <SisdaiCapaXyz />

    <sisdai-capa-geojson
      :datos="edos"
      :zIndex="1"
      :globoInformativo="f => `Estdo: ${f.nom_edo}`"
    />
  </SisdaiMapa>
</template>
