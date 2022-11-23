# Generalidades

## Propiedades

##### id

- Tipo: `String`
- Obligatorio: ✅
- Interactivo: ❌

Identificador unico de la capa. Si no es detectado, se asignará un identificador random.

##### nombre

- Tipo: `String`
- Valor por defecto: `Nombre no asignado`
- Interactivo: ✅

Nombre de la capa que aparecerá en el control de la leyenda.

##### verCargador

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ❌

Esta propiedad le comunica a la vista del mapa si se desea sobreponer la vista que indica el proceso de carga de una capa.

##### visible

- Tipo: `Boolean`
- Valor por defecto: `true`
- Interactivo: ✅

Visibilidad de la capa.

##### zIndex

- Tipo: `Number`
- Valor por defecto: [trabajando...]
- Interactivo: ✅ [trabajando...]

Indica la posicion respecto a otras capas, cuando se define un z-index mas alto respecto a las demas capas, esa capa se posicionara enfrente de ellas.

## Eventos

##### alCambiarVisibilidad

Evento disparado cuando se detecta el cambio de visibilidad de la capa desde las propiedades reactivas o desde los controles del componente como el control de leyenda.

Parámetros recibidos:
- visibilidad: `Boolean` la visibilidad final al ejecutarse este evento.

##### alIniciarCarga
##### alFinalizarCarga