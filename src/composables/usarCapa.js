import usarRegistroCapas from './usarRegistroCapas'

import { idAleatorio } from './../utiles'
import { toRefs, watch } from 'vue'

export const props = {
  /**
   * Identificador unico de la capa. Si no es detectado, se asignará un identificador random.
   */
  id: {
    type: String,
    default: '_default_',
  },

  /**
   * Nombre de la capa que aparecerá en el control de la leyenda.
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },

  /**
   * Visibilidad de la capa, true por defecto.
   */
  visible: {
    type: Boolean,
    default: true,
  },

  /**
   *
   */
  zIndex: {
    type: Number,
    default: undefined,
  },
}

export const emits = ['al-cambiar-visibilidad']

export default function usarCapa(propsRefs, emit) {
  // let olCapa = undefined
  const { nombre, visible, zIndex } = toRefs(propsRefs)
  watch(visible, alternarVisibilidad)

  const { registrar: registrarCapa, capas } = usarRegistroCapas()

  /**
   *
  watch(zIndex, nuevoValor => {
    if (capas[idValida] && capas[idValida].getZIndex() !== nuevoValor) {
      // console.log('el zIndex ha cambiado', nuevoValor)
      capas[idValida].setZIndex(nuevoValor)
    }
  })
   */

  /**
   * Asigna un identificador aleatorio en caso de que no se asigne.
   */
  const idValida = propsRefs.id === '_default_' ? idAleatorio() : propsRefs.id

  /**
   * @DEPRECATED
   * Observador que verifica cuando la instancia del mapa está lista para para agregar capas.
   *
   * Como este es un composable de Capa, se ejecutará este observasdor por cada capa que se
   * registre en el componente.
  watch(mapaPrincipal, () => {
    // console.log('Mapa listo para recibir capas')
    asignarPorps()
    agregarCapa(olCapa)
  })
   */

  /**
   * @DEPRECATED
   * @param {*} capaObjeto
  function salvarCapaComoObjeto(capaObjeto) {
    olCapa = capaObjeto
  }
   */

  /**
   *
   */
  function asignarPorps(capa) {
    capa.set('id', idValida)
    capa.set('nombre', nombre.value)
    capa.setVisible(visible.value)
    capa.setZIndex(zIndex.value)
    // console.log('asignarProps', zIndex)
  }

  function agregarEventos(capa) {
    capa.on('change:visible', ({ target }) => {
      emit('al-cambiar-visibilidad', target.getVisible())
    })
  }

  function registrar(capa) {
    asignarPorps(capa)
    agregarEventos(capa)
    registrarCapa(capa)
  }

  function alternarVisibilidad(estado = undefined) {
    if (estado === undefined) {
      capas[idValida].setVisible(!capas[idValida].getVisible())
    } else {
      capas[idValida].setVisible(estado)
    }
  }

  return {
    registrar,
    alternarVisibilidad,
  }
}
