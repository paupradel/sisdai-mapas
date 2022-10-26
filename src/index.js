import MapaPrincipal from './components/MapaPrincipal/MapaPrincipal'
import * as layout from './components/layouts'
import CapaOSM from './components/capas/OSM'
import CapaGeoJSON from './components/capas/GeoJSON'

import './styles/controles.scss'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  Vue.component(MapaPrincipal.name, MapaPrincipal)

  Object.entries(layout).forEach(([, contenedor]) => {
    Vue.component(contenedor.name, contenedor)
  })

  // Capas
  Vue.use(CapaOSM)
  Vue.use(CapaGeoJSON)
}

export { plugin as install, CapaOSM, CapaGeoJSON }
