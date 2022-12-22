<script setup>
import { computed, toRefs } from 'vue'

// eslint-disable-next-line
const propsSetup = defineProps({
  /**
   *
   */
  estiloClase: {
    type: Object,
    required: true,
  },

  /**
   *
   */
  etiqueta: {
    type: String,
    required: true,
  },
})

const { estiloClase, etiqueta } = toRefs(propsSetup)

const estiloACss = estilo => ({
  background: {
    color: estilo.relleno?.color ? estilo.relleno.color : 'none',
  },
  border: {
    width: `${estilo.contorno?.grosor ? estilo.contorno.grosor : 0}px`,
    style: estilo.contorno?.color ? 'solid' : 'none',
    color: estilo.contorno?.color ? estilo.contorno.color : 'none',
  },
})
const estiloClaseCss = computed(() => estiloACss(estiloClase.value))

function seleccioando() {
  console.log('seleccionado')
}
</script>

<template>
  <div
    class="sisdai-mapa-leyenda-capa-clase"
    @click="seleccioando"
  >
    <span class="sisdai-mapa-leyenda-capa-clase-color" />
    {{ etiqueta }}
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda-capa-clase {
  display: flex;
  flex-direction: row;

  &-color {
    margin-right: 5px;
    width: 16px;
    height: 16px;
    background-color: v-bind('estiloClaseCss.background.color');
    border-width: v-bind('estiloClaseCss.border.width');
    border-style: v-bind('estiloClaseCss.border.style');
    border-color: v-bind('estiloClaseCss.border.color');
  }
}
</style>
