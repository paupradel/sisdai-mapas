/**
 * @module composables/usarMapa
 */

const olCapas = {}

export default function usarRegistroCapas() {
  function agregarTodoALMapa(mapa) {
    for (const idCapa in olCapas) {
      if (olCapas[idCapa]) {
        mapa.addLayer(olCapas[idCapa])
      }
    }
  }

  function laCapaYaExiste(idCapa) {
    if (olCapas[idCapa] !== undefined) {
      console.warn('¡La capa ya existe!')
      return true
    }
    return false
  }

  function registrar(capa) {
    const idCapa = capa.get('id')
    if (laCapaYaExiste(idCapa)) return

    olCapas[idCapa] = capa
  }

  return {
    agregarTodoALMapa,
    registrar,
    capas: olCapas,
  }
}
