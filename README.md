# Automatización FrontEnd Gulp Bower
Aprende buenas prácticas y cómo automatizar tareas en tus desarrollos Frontend, empleando Gulp y Bower como gestor de tareas.
### Estructura de directorios y Ficheros
```
project/
    app/
    dist/
    package.json
    bower.json
    README.md
    .gitignore
    .editorconfig
    .jshintrc
```

* `project` es la carpeta raiz de nuestro proyecto web y tenemos 2
subdirectorios por debajo de él.

* `app` contiene todo el código fuente completo de nuestra aplicación
web, sin minificar ni optimizar, solamente el código de desarrollo.

* `dist` tendremos todo el proyecto minificado y optimizado para
ser desplegado en producción.

* `package.json` contiene la información de nuestro proyecto así
como el nombre y las versiones de las dependencias que utilizaremos
para desarrollo.

* `bower.json` es similar a `package.json` para manejar las
dependencias que usaremos en el Frontend, como pueden ser las
librerías de Angular, Jquery CSS, etc...

* `README` es el fichero que usamos como documentación del
proyecto y un poco la información acerca de la aplicación que
estamos desarrollando.

* `.gitignore` nos sirve para indicar a Git qué archivos no
queremos que se suban al repositorio (por ejemplo, claves, ficheros
de configuraciones, etc.)

* `.editorconfig` nos permite configurar nuestro editor de texto
para que todos los desarrolladores del mismo proyecto, que lo
utilicen, tengan en el código el mismo espaciado, tabulación, etc...
documentación de su página web:
[http://editorconfig.org/](http://editorconfig.org/)

* `.jshintrc` es un fichero JSON que nos permite comprobar
errores tanto de código como de sintaxis, uso de variables, o estilo en
nuestro código JavaScript según guardamos los archivos. Combinado
con un gestor de tareas, como Gulp, que usaremos más adelante, nos
permite un desarrollo ágil de nuestros proyectos.
Puedes ver que propiedades añadir en la página web de su documentación:
[http://jshint.com/docs/options/](http://jshint.com/docs/options/)


Antes de nada, debemos instalar [Node.js](https://nodejs.org/), necesitamos para poder instalar
[Bower](http://bower.io/), [Gulp](http://gulpjs.com/) y ejecutar las tareas que especifiquemos en el
Gulpfile.js

Para instalar Node puedes dirigirte a su página web
[http://nodejs.org/download/](http://nodejs.org/download/)

 **Gulp** es un lanzador de tareas que corre bajo Node.js, nos permite
automatizar tareas que hagamos a menudo.

**Bower** un gestor de paquetes que nos permite instalar librerías de una manera fácil.

## Uso

### Install global
```
$ npm install -g gulp
$ npm install -g bower
```
### Development mode
```
$ gulp
```
Escuchara en el puerto 5000

 ```
 Server started http://localhost:5000
 ```

### Production mode
```
$ gulp production
$ gulp csscompress
```
Para probar si nuestro proyecto funciona en modo Producción
````
$ gulp production-server
 Server started http://localhost:5000
```

