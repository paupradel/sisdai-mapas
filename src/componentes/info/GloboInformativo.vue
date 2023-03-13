<script setup>
import { computed, toRefs } from 'vue'

// eslint-disable-next-line
const props = defineProps({
  ubicacion: {
    type: Array,
  },
})

const { ubicacion } = toRefs(props)

const left = computed(() => `${ubicacion.value[0] + 10}px`)
const right = 'auto'
const top = computed(() => `${ubicacion.value[1] + 10}px`)
const bottom = 'auto'
</script>

<template>
  <div id="info" />
</template>

<style lang="scss">
#info {
  background: #000;
  padding: 40px;
  position: absolute;
  z-index: 100;

  left: v-bind('left');
  right: v-bind('right');
  top: v-bind('top');
  bottom: v-bind('bottom');
}
</style>
