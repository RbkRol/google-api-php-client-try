[Tuto para markdown](https://docs.gitlab.com/ee/user/markdown.html)

# Integrar Bootstrap en Angular

Primero ir a la carpeta de la aplicación y ejecutar desde la terminal de node.js ejecutar:

>>npm install --save bootstrap

>>npm install popper.js

Después de la instalación de bootsrap y de [Popper.js](https://github.com/FezVrasta/popper.js#installation), vamos a la carpeta raíz de nuestro proyecto en Angular y buscamos el archivo angular-cli.json y dentro de este archivo añadimos a bootstrap de la siguiente manera: 

```json
"styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css"
      ]
```
Eso es todo.

[Fuente](https://stackoverflow.com/questions/43557321/angular-4-how-to-include-bootstrap)

# Empaquetar código para producción

Esto se hace con la finalidad de que la aplicación funcione en el servidor y sea distribuida. Con esto, se crea el bundle o los paquetes donde los archivos necesarios para ejecutar Angular estarán presentes. Simplemente en la carpeta de la aplicación ejecutamos:

>> ng build --env=dev --prod --aot

Con esto, tendremos una carpeta dist, de la cual sacaremos el contenido para no tener conflictos al ejecutar el index.html, ya que intentará buscar rutas en la raíz de la aplicación.

Para ventanas emergentes instalar en el proyecto

>> npm install --save @angular/material @angular/cdk

>> npm install --save @angular/animations