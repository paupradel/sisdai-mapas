<script setup>
import { onMounted } from 'vue'
import usarCapaControl, { props } from './../../composables/usarCapaControl'
import { idAleatorio } from './../../utiles'
import SisdaiMapaLeyendaCapaColor from './SisdaiMapaLeyendaCapaColor.vue'
import SisdaiClaseControl from './SisdaiMapaLeyendaCapaClase.vue'

// eslint-disable-next-line
const propsSetup = defineProps(props)

const { vincularCapa, visibilidadCapa, nombreCapa, estiloCapa } =
  usarCapaControl(propsSetup)

onMounted(() => vincularCapa())

const idCheck = `${propsSetup.para}-${idAleatorio()}`
</script>

<template>
  <span class="sisdai-mapa-leyenda-capa-control">
    <form v-if="!Array.isArray(estiloCapa)">
      <input
        class="sisdai-mapa-leyenda-capa-control-check"
        type="checkbox"
        :id="idCheck"
        v-model="visibilidadCapa"
      />
      <label
        class="sisdai-mapa-leyenda-capa-control-etiequeta"
        :for="idCheck"
      >
        <SisdaiMapaLeyendaCapaColor :estiloClase="estiloCapa" />
        {{ nombreCapa }}
      </label>
    </form>

    <div
      class="sisdai-mapa-leyenda-capa-control-clases"
      v-if="Array.isArray(estiloCapa)"
    >
      <p>{{ nombreCapa }}</p>
      <SisdaiClaseControl
        v-for="(clase, idx) in estiloCapa"
        :key="`estilo-${idx}`"
        :estiloClase="clase.estilo"
        :etiqueta="clase.etiqueta"
      />
    </div>
  </span>
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda-capa-control {
  &-etiequeta {
    align-items: center;
    // background-color: black;
  }

  &-clases {
    display: flex;
    flex-direction: column;
  }
}
</style>
