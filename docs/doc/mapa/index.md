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

#### `vista`

- Tipo: `Object`
- Valor por defecto: `{ centro: [0, 0], zoom: 1.5 }`
- Interactivo: ✅

#### `extensionPorCapasVisibles`

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ✅

Define si al presionar el botón que ajusta la vista, se aplicará el zoom a las capas visibles que tengan una extensión definida.

#### `proyeccion`

- Tipo: `String`
- Valor por defecto: `EPSG:4326`
- Interactivo: ❌

Código de identificación SRS que define la proyección de la vista.

> ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.

### Controles

#### `escalaGrafica`

- Tipo: `Boolean`
- Valor por defecto: `true`
- Interactivo: ✅

Define si se agrega la escala grafica en el mapa.

## Funciones

#### `exportarImagen`

## Ejemplo

<mapa-Mapa />
