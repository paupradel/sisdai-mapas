<script setup>
import { computed, onMounted, watch } from 'vue'
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

watch(estiloCapa, n => {
  console.log(n)
})
const rellenoColor = computed(() =>
  estiloCapa.value.relleno ? estiloCapa.value.relleno.color : 'none'
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
        v-show="rellenoColor !== 'none'"
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
      background-color: v-bind(rellenoColor);
      /*
      border-width: calc(v-bind('estiloCapa.contorno.grosor') * 1px);
      border-style: solid;
      border-color: v-bind('estiloCapa.contorno.color');
      */
    }
  }
}
</style>
