<script setup>
const nombre = 'SisdaiMapaEncabezado'
</script>

<template>
  <div
    class="sisdai-mapa-encabezado borde-b"
    :nombre="nombre"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-encabezado {
  padding: 16px;
}
</style>
