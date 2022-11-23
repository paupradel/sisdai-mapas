# Generalidades

## Propiedades

#### id

- Tipo: `String`
- Obligatorio: ✅
- Interactivo: ❌

Identificador unico de la capa. Si no es detectado, se asignará un identificador random.

#### nombre

- Tipo: `String`
- Valor por defecto: `Nombre no asignado`
- Interactivo: ✅

Nombre de la capa que aparecerá en el control de la leyenda.

#### verCargador

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ❌

Esta propiedad le comunica a la vista del mapa si se desea sobreponer la vista que indica el proceso de carga de una capa.

#### visible

- Tipo: `Boolean`
- Valor por defecto: `true`
- Interactivo: ✅

Visibilidad de la capa.

#### zIndex

- Tipo: `Number`
- Valor por defecto: [trabajando...]
- Interactivo: ✅ [trabajando...]

Indica la posicion respecto a otras capas, cuando se define un z-index mas alto respecto a las demas capas, esa capa se posicionara enfrente de ellas.

## Eventos

#### @alCambiarVisibilidad

Evento ejecutado cuando se detecta el cambio de visibilidad de la capa desde las propiedades reactivas o desde los controles del componente como el control de leyenda.

Parámetros esperados:
- visibilidad: `Boolean` Visibilidad final al ejecutarse este evento.

#### @alIniciarCarga

Evento ejecutado cuando se detecta que se inicia con la carga de la información visible en el mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la consulta de los features; En el caso de capas raster (WMS) cuando inicia la consulta de la imágen; En el caso de las capas por conjunto de teselas (XYZ, OSM) cuando inicia la consulta de un grupo de teselas.

Sin parámetros esperados

#### @alFinalizarCarga

Evento ejecutado cuando se detecta que la carga de la información visible en el mapa ha finalizado. En el caso de capas vectoriales (GeoJSON) cuando finaliza la consulta de los features; En el caso de capas raster (WMS) cuando finaliza la consulta de la imágen; En el caso de las capas por conjunto de teselas (XYZ, OSM) cuando finaliza la consulta de un grupo de teselas.

Parámetros esperados:
- cargaExitosa: `Boolean` Indica si la carga no ha presentado error.