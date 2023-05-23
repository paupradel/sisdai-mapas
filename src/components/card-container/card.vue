<template>
  <div
    class="card-map-container"
    :class="{
      'without-footer': !VM_hasFooter,
      collapsed: collapsingClass,
      flex: llenarEspacioDisponibleConMapa,
      'desktop-version': esVersionEscritorioEnPantallaLarga,
      'usar-margen-inferior-por-logo-lib': usarLogoLibreria
    }"
    :style="{ 'max-height': collapsingHeight }"
  >
    <div class="card-map-header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div
      class="card-map-footer"
      v-if="VM_hasFooter"
      :class="{ collapsing: permitirColapso, 'usar-margen-por-logo-lib': usarLogoLibreria }"
    >
      <div class="card-map-footer-container">
        <slot name="footer"></slot>
      </div>

      <button
        v-if="permitirColapso"
        class="collapsable-button"
        :class="{'sibling-logo-lib':usarLogoLibreria}"
        @click="VM_collapsed = !VM_collapsed"
        v-html="VM_collapsed ? etiquetaColapso : etiquetaNoColapso"
      ></button>
      
    </div>
    <pie-mapa v-if="usarLogoLibreria" />
  </div>
</template>

<script>
import pieMapa from "./pie-mapa.vue";

export default {
  name: "DaiTarjetaContenedorMapa",
  props: {
    permitirColapso: {
      type: Boolean,
      default: true,
    },
    colapsada: {
      type: Boolean,
      default: true,
    },
    alturaColapsada: {
      type: String,
      default: "60vh",
    },
    llenarEspacioDisponibleConMapa: {
      type: Boolean,
      default: false,
    },
    etiquetaColapso: {
      type: String,
      default: '<span class="dai-icon-collapsed size-font-25rem-x7"></span>',
    },
    etiquetaNoColapso: {
      type: String,
      default: '<span class="dai-icon-uncollapsed size-font-25rem-x7"></span>',
    },
    esVersionEscritorioEnPantallaLarga: {
      type: Boolean,
      default: false,
    },
    usarLogoLibreria: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      cmpMap: null,
      VM_hasFooter: false,
      VM_collapsed: true,
      VM_screenIsMobile: false,
    };
  },
  created: function () {
    this.VM_collapsed = this.colapsada;
  },
  computed: {
    collapsingClass: function () {
      return this.VM_hasFooter && this.VM_collapsed && this.permitirColapso;
    },
    collapsingHeight: function () {
      if (this.esVersionEscritorioEnPantallaLarga && !this.VM_screenIsMobile) {
        return "initial";
      }
      return this.VM_hasFooter && this.VM_collapsed && this.permitirColapso
        ? this.alturaColapsada
        : "250vh";
    },
  },
  mounted: function () {
    this.VM_hasFooter = this.hasFooterSlot();

    let mediaquery = window.matchMedia("(max-width: 976px)");
    this._fn_matchMediaQueryMobile(mediaquery);
    mediaquery.addEventListener("change", this._fn_matchMediaQueryMobile);
  },
  methods: {
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    _registerMap(mapComponent) {
      this.cmpMap = mapComponent;
      if (!this.VM_screenIsMobile) {
        this.cmpMap.forceResizeMap(true);
      }
    },
    _getComponentMap: function () {
      return this.cmpMap;
    },
    _fn_matchMediaQueryMobile: function (media) {
      if (media.matches) {
        this.VM_screenIsMobile = true;
      } else {
        this.VM_screenIsMobile = false;
      }
    },
  },
  provide: function () {
    return {
      getComponentMap: this._getComponentMap,
    };
  },
  destroyed: function () {},
  components: {
    pieMapa,
  }
};
</script>

<style lang="scss">
.card-map-container {
  border-radius: 8px;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  padding: 0.6rem 0.3rem 0rem 0.3rem;
  border: 1px solid black;
  overflow-y: clip;
  position: relative;
  transition: max-height 0.3s ease-in;
  &.flex {
    display: flex;
    flex-direction: column;
    .dai-map-container {
      flex-grow: 1;
    }
  }
  &.without-footer {
    padding-bottom: 0px;
    .dai-map-container {
      margin-bottom: 0px;
    }
    // &.usar-margen-inferior-por-logo-lib{
    //     padding-bottom: 40px;
    // }
  }
  .dai-map-container {
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    margin-top: 0.5rem;

    margin-bottom: 0.5rem;
  }
  .card-map-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > * {
      margin: 0.3rem;
      flex-grow: 1;
    }
  }

  .card-map-footer {
    &.collapsing {
      padding-bottom: 1.8rem;
      &.usar-margen-por-logo-lib{
          padding-bottom: calc( 1.8rem + 40px);
      }
    }

    &.usar-margen-por-logo-lib{
        padding-bottom: 40px;
    }

    .card-map-footer-container {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 0.3rem);
      align-items: center;
      justify-content: center;
      > * {
        margin: 0.3rem;
        flex-grow: 1;
      }
    }
    .collapsable-button {
      width: 100%;
      //width: calc(100% + .6rem);
      background-color: var(--control-bg-color-accent);
      color: var(--control-color-accent);
      margin-left: -0.3rem;
      margin-right: -0.3rem;
      border-style: none;
      border-radius: 0 0 8px 8px;
      cursor: pointer;
      //font-size: 28px;
      height: 1.8rem;
      position: absolute;
      bottom: 0px;
      &.sibling-logo-lib{
          bottom: 40px;
          border-radius: 0;
      }
    }

    
  }

  &.desktop-version {
    @media screen and (min-width: 976px) {
      display: grid;
      grid-template-areas:
        "head map"
        "foot map"
        "pielibreria pielibreria";
      //grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 2fr;
      padding-top: 0;
      //flex-direction: row;
      .card-map-header {
        grid-area: head;
        padding-top: 0.6rem;
        padding-right: 0.3rem;
      }
      .card-map-footer {
        grid-area: foot;
        padding-right: 0.3rem;
        .collapsable-button {
          display: none;
        }
        &.usar-margen-por-logo-lib{
            padding-bottom: 40px;
        }
      }
      .dai-map-container {
        grid-area: map;
        height: 100%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 0;
      }
      .pie-mapa-libreria {
        grid-area: pielibreria;
      }
      // &.usar-margen-inferior-por-logo-lib{
      //     .dai-map-container{
      //         height: calc(100% - 40px);
      //     }
      // }
    }
  }
}

$sizes: 20;

@for $i from 1 through $sizes {
  .size-font-25rem-x#{$i} {
    font-size: $i * 0.25rem;
  }
}
</style>