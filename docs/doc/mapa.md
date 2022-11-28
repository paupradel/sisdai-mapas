# SisdaiMapa

El componente `SisdaiMapa` es el componente princial de esta librería. Dentro de el se pueden agregar componentes de capas, leyendas y contenedores.

## Uso

```html
<SisdaiMapa>
  <!-- 
    Aquí van las capas, leyendas y contenedores que
    quedarán dentro del mapa 
  -->
</SisdaiMapa>
```

## Propiedades

### Vista del mapa

#### `centro`

- Tipo: `Array`
- Valor por defecto: `[0, 0]`
- Interactivo: ✅

Coordenadas `[x, y]` del centro inicial de la vista.

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

#### `extension`

- Tipo: `Array`
- Valor por defecto: `[0, 0, 0, 0]`
- Interactivo: ✅

Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `zoom` serán ignoradas.

#### `proyeccion`

- Tipo: `String`
- Valor por defecto: `EPSG:4326`
- Interactivo: ❌

Código de identificación SRS que define la proyección de la vista.

> ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.

#### `zoom`

- Tipo: `Number`
- Valor por defecto: `1`
- Interactivo: ✅

Nivel de zoom utilizado para calcular la resolución inicial de la vista.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

### Controles

#### `escalaGrafica`

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ✅

Define si se agrega la escala grafica en el mapa.

## Ejemplo

<mapa-PropiedadesInteractivas />

```html
<template>
  <SisdaiMapa
    :centro="centros[mapa.centro]"
    :escalaGrafica="mapa.escalaGrafica"
    :zoom="mapa.zoom"
    :extension="extensiones[mapa.extension]"
  >
    <SisdaiCapaOsm />
  </SisdaiMapa>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const extensiones = {
    'República Mexicana': [-118.3651, 14.5321, -86.7104, 32.7187],
    Jalisco: [-105.6954, 18.9259, -101.5105, 22.7502],
    Yucatán: [-92.3263, 19.5512, -87.5331, 22.586],
  }

  const centros = {
    'República Mexicana': [-102, 24],
    'Baja California': [-115.0969, 30.5499],
  }

  const mapa = ref({
    centro: 'República Mexicana',
    escalaGrafica: true,
    extension: undefined,
    zoom: 4.5,
  })

  const vistaExtension = ref(false)
  watch(vistaExtension, () => {
    quitarExtension()
  })

  function quitarExtension() {
    if (!vistaExtension.value) {
      mapa.value.extension = undefined
    }
  }

  function cambiarZoom({ target }) {
    mapa.value.zoom = target.valueAsNumber
  }
</script>
```
