# sisdai-mapas

Componentes de software libre para el Sistema de Diseño y Accesibilidad para
la Investigación (Sisdai).

> **_Limitación de responsabilidad_**
> 
> El presente es un proyecto en construcción, por tanto ni el equipo del Sisdai 
> ni el de Salsa son responsables del uso y contenido del presente recurso, 
> toda vez que se trata de una versión en su modalidad prueba, y no de una 
> versión pública, por lo que una vez que sea lanzada la versión final, 
> se invita a la persona usuaria a consultarla y validar sus requisitos.

## Como empezar a usar el componente en un proyecto de Vue.js

### Instalación

Instalación y descarga de la biblioteca desde GitHub:

```bash
npm i github:salsa-community/sisdai-mapas#version-a-instalar
```

### Importación y registro

En el archivo que se desee utilizar el componente:

```javascript
import Vue from 'vue'
import SisdaiMapas from 'sisdai-mapas'

Vue.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda
registrar el componente en el archivo `src/main.js` del proyecto.

### Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa
la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y
directivas que necesites:

```html
<SisdaiMapa
  :zoom="2"
  :centro="0,0"
>
  <SisdaiCapaXyzOsm />
</SisdaiMapa>
```

Para un uso avanzado revisa la documentación.

## Documentación en local

Para revisar la documentación en local primero clona este repositorio y accede a
la carpeta del proyecto con:

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

## Licencia

**SOFTWARE LIBRE Y ESTÁNDARES ABIERTOS**

Sisdai está alineado a las disposiciones establecidas por la Coordinación de Estrategia Digital Nacional (DOF: 06/09/2021) en donde se estipula que las "políticas y disposiciones tienen como objetivo fortalecer el uso del software libre y los estándares abiertos, fomentar el desarrollo de aplicaciones institucionales con utilidad pública, lograr la autonomía, soberanía e independencia tecnológicas dentro de la APF". En el artículo 63 se explicita que "cuando se trate de desarrollos basados en software libre, se respetarán las condiciones de su licenciamiento original [...]", en este sentido este proyecto está alineado a lo que se define desde [SALSA](https://salsa.crip.conacyt.mx/).

## Contribuir

Para contribuir al proyecto, se pide que se haga por medio de los lineamientos de contribución de SALSA que se
pueden consultar [aquí](https://salsa.crip.conacyt.mx/guidelines/contribute/).

\*En los lineamientos de contribución se lista la rama _master_ como principal, sin embargo en este proyecto, dicha rama es _main_.
