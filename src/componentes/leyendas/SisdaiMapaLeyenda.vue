<script setup>
import { onMounted, ref, toRefs, watch } from 'vue'
import SisdaiCapaControl from './SisdaiCapaControl.vue'

// eslint-disable-next-line
const propsSetup = defineProps({
  /**
   * para
   * - Tipo: `String` o `Array`
   * - Obligatorio: ✅
   * - Interactivo: ❌
   *
   * Identificador de la capa a la que se quiere vincular el control de leyenda.
   */
  para: {
    type: [String, Array],
    required: true,
  },

  /**
   *
   */
  titulo: {
    type: String,
    default: undefined,
  },
})

const { titulo, para } = toRefs(propsSetup)

const idsCapas = ref([])
function actualizarIdsCapas() {
  if (Array.isArray(para.value)) {
    idsCapas.value = para.value
  } else if (typeof para.value === typeof '') {
    idsCapas.value = para.value.split(',')
  }
}
watch(para, actualizarIdsCapas)

onMounted(() => {
  actualizarIdsCapas()
})
</script>

<template>
  <div class="sisdai-capa-leyenda">
    <div
      class="titulo"
      v-show="titulo !== undefined"
    >
      {{ titulo }}
    </div>
    <div class="contenido">
      <SisdaiCapaControl
        v-for="idx in idsCapas"
        :key="`sisdai_mapa_control_${idx}`"
        :para="idx"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sisdai-capa-leyenda {
  .titulo {
    font-size: 20px;
  }
}
</style>
