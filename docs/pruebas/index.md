# Pruebas básicas de sisdai-mapas

<prueba />

```html
<SisdaiMapa
  tema="algun-tema"
  :extension="mapa.extension"
>
  <SisdaiMapaEncabezado>
    Contenido HTML, Titulos, Controles, uso de leyenda, etc
  </SisdaiMapaEncabezado>

  <SisdaiMapaIzquierda>
    Contenido HTML, Controles, uso de leyenda, scrolables, etc
  </SisdaiMapaIzquierda>

  <SisdaiMapaCapas>
    <SisdaiCapaGeojson
      :datos="geojson.edos"
      :zIndex="geojson.zIndex"
    />

    <SisdaiCapaXyzOsm :zIndex="osm.zIndex" />
  </SisdaiMapaCapas>

  <SisdaiMapaDerecha>
    Contenido HTML, Controles, uso de leyenda, scrolables, etc
  </SisdaiMapaDerecha>

  <SisdaiMapaPie>
    Contenido HTML, Referencias, Controles, uso de leyenda, etc
  </SisdaiMapaPie>
</SisdaiMapa>
```

- <small>vuepress, lint config: 32 vulnerabilities (10 moderate, 22 high)</small>
