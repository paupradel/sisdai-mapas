# SisdaiCapaWms

```html
<SisdaiCapaWms
  :id="wms.id"
  :nombre="wms.nombre"
  :parametros="wms.parametros"
  :url="wms.url"
  :verCargador="true"
  :visible="wms.visible"
  :zIndex="wms.zIndex"
  @alIniciarCarga="tipo => alIniciarCarga('wms', tipo)"
  @alFinalizarCarga="tipo => alFinalizarCarga('wms', tipo)"
/>
```
