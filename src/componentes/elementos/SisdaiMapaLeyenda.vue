<script setup>
import { computed, onMounted } from 'vue'
import usarLeyenda, { props } from './../../composables/usarLeyenda'
import { idAleatorio } from './../../utiles'

// eslint-disable-next-line
const propsSetup = defineProps(props)

const { vincularCapa, visibilidadCapa, nombreCapa, estiloCapa } =
  usarLeyenda(propsSetup)

onMounted(() => {
  vincularCapa()
})

const idCheck = `${idAleatorio()}-${props.para}`

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

const estiloCapaCss = computed(() => estiloACss(estiloCapa.value))
const simboloVisible = computed(
  () =>
    !(
      estiloCapaCss.value.background.color === 'none' &&
      estiloCapaCss.value.border.style === 'none'
    )
)
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <input
      type="checkbox"
      :id="idCheck"
      v-model="visibilidadCapa"
    />
    <label :for="idCheck">
      <span
        class="simbolo"
        v-show="simboloVisible"
      />
      {{ nombreCapa }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda {
  label {
    align-items: center;
    // background-color: black;

    .simbolo {
      margin-right: 5px;
      width: 16px;
      height: 16px;
      background-color: v-bind('estiloCapaCss.background.color');
      border-width: v-bind('estiloCapaCss.border.width');
      border-style: v-bind('estiloCapaCss.border.style');
      border-color: v-bind('estiloCapaCss.border.color');
    }
  }
}
</style>
