# SisdaiMapa

El componente `SisdaiMapa` es el componente princial de esta librería. Dentro de el se pueden agregar componentes de capas, leyendas y contenedores.

## Uso

```html
<SisdaiMapa>
  <!-- Aqui van las capas, leyendas y contenedores que quedarán dentro del mapa -->
</SisdaiMapa>
```

## Propiedades

### Vista del mapa

##### centro

- Tipo: `Array`
- Valor por defecto: `[0, 0]`
- Interactivo: ✅

Centro en coordenadas a las que el mapa se acercara. Es una array en formato `[x,y]`, en EPSG:4326, es decir `[longitud,latitud]`.

Tener en cuenta que si la propiedad `extension` se define, esta propiedad se igonora.

##### extension

- Tipo: `Array`
- Valor por defecto: `[0, 0, 0, 0]`
- Interactivo: ✅

##### proyeccion

- Tipo: `String`
- Valor por defecto: `EPSG:4326`
- Interactivo: ❌

##### zoom

- Tipo: `Number`
- Valor por defecto: `1`
- Interactivo: ✅

### Controles

##### escalaGrafica

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ✅

## Eventos

## Ejemplo

<mapa-basico />

```html
```
