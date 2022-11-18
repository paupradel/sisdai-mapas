import './estilos/index.scss'
import Mapa from './componentes/SisdaiMapa.vue'
import * as Capas from './componentes/capas'
import * as Elementos from './componentes/elementos'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  agregarComponente(Mapa)
  agregarComponentes(Capas)
  agregarComponentes(Elementos)

  function agregarComponente(componente) {
    Vue.component(componente.__name, componente)
  }

  function agregarComponentes(componentes) {
    Object.values(componentes).forEach(componente =>
      agregarComponente(componente)
    )
  }
}

export { plugin as install }
