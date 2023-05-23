<template>
  <a class="pie-mapa-libreria" href="https://conacyt.mx/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://conacyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg"
      alt="Conahcyt"
      height="28px"
    />
  </a>
</template>

<style lang="scss">
.pie-mapa-libreria {
  margin-left: -0.3rem;
  width: calc(100% - 0.4rem);

  // boton-conacyt
  background-color: #F6F6F6;
  border-radius: 0 0 8px 8px;
  border-width: 0;
  border-top: 1px solid black;
  box-shadow: 3px 3px 4px transparent;
  display: flex;
  color: #003384;
  filter: grayscale(100%);
  padding: 4px 8px;
  text-align: left;
  // width: 100%;
  cursor: pointer;
  img {
    height: 28px;
    opacity: .5;
    transition: all .25s ease-in-out;
  }
  &:hover,
  &:focus {
    filter: grayscale(0%);
    img {
      opacity: 1;
    }
  }
}
</style>