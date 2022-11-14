# sisdai-mapas

Componentes reutilizables de mapas.

Si quieres contribuir al código de este componente revisa los [lineamientos de contribución establecidos por SALSA](https://salsa.crip.conacyt.mx/guidelines/contribute/)

## Como empezar a usar el componente en un proyecto de Vue.js

### Instalación

Instalación y descarga de la depencdencia desde GitHub:
```bash
npm i github:salsa-community/sisdai-mapas#version-a-instalar
```

### Importación y registro

En el archivo que se desee utilizar el componente:

```javascript
import Vue from 'vue'
import SisdaiMapas from "sisdai-mapas"
Vue.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda registrar el componente en el archivo `src/main.js` del proyecto.

### Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y directivas que necesites:

```html
<SisdaiMapa :zoom="2" :centro="0,0">
    <SisdaiCapaXyzOsm/>
</SisdaiMapa>
```

Para un uso avanzado revisa la documentación en local.

## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a la carpeta del proyecto con:
```bash
git clone https://github.com/salsa-community/sisdai-mapas
cd sisdai-mapas
```

Seguido de la instalación de las dependencias y ejecución de vuepress:
```bash
npm install
npm run docs:serve
```

Se habilitara en [localhost:8080](localhost:8080).
