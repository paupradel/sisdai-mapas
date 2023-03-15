<script setup>
import edos from './../../capas/ejemplo-edos.json'
// import centEdos from './../../capas/centroides-estados.json'

const contenidoGloboInformativo = feature => `Estdo: <b>${feature.nom_edo}</b>`
</script>

<template>
  <SisdaiMapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <SisdaiCapaXyz />

    <!--SisdaiCapaGeojson
      :datos="centEdos"
      :zIndex="2"
      :globoInformativo="f => `Estdo: ${f.nom_edo}`"
    /-->

    <SisdaiCapaGeojson
      :datos="edos"
      :zIndex="1"
      :globoInformativo="contenidoGloboInformativo"
    />
  </SisdaiMapa>
</template>
