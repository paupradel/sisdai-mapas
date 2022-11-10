import ScaleLine from 'ol/control/ScaleLine'

const consifguracion = {
  units: 'metric',
  bar: true,
  steps: 4,
  text: false,
  minWidth: 140,
  maxWidth: 220,
}

const claseCss = 'barra-escala'

export default class BarraEscala extends ScaleLine {
  constructor() {
    super(consifguracion)

    this.element.classList.add('sisdai-mapa-control')
    this.element.classList.add(`sisdai-mapa-control-${claseCss}`)
  }
}
