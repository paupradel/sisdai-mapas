import Mapa from './components/Mapa'
import * as layout from './components/layouts'
import * as capas from './components/capas'

import './styles/controles.scss'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  Vue.component(Mapa.name, Mapa)

  Object.entries(layout).forEach(([, contenedor]) => {
    Vue.component(contenedor.name, contenedor)
  })

  // Capas
  Object.entries(capas).forEach(([, capa]) => {
    Vue.component(capa.name, capa)
  })
}

export { plugin as install }
