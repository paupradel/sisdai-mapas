# SisdaiMapaLeyenda

Este componente permite agregar, dentro de uno de los contenedores del mapa, una leyenda interactiva vinculada a las capas agregadas en el mapa.

## Uso

```html
<SisdaiMapa>
  <SisdaiMapaEncabezado>
    <SisdaiMapaLeyenda para="osmId" />
  </SisdaiMapaEncabezado>

  <SisdaiMapaCapas>
    <SisdaiCapaOsm
      id="osmId"
      nombre="Capa de OpenStreetMap"
    />
  </SisdaiMapaCapas>
</SisdaiMapa>
```

## Propiedades

#### para

- Tipo: `String`
- Obligatorio: ✅
- Interactivo: ❌

Identificador de la capa a la que se quiere vincular el control de leyenda.

## Ejemplo

<leyenda-Interactividad />
