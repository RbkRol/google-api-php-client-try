# google-api-php-client-try
Realizando un ejemplo siguiendo documentación del uso de esta biblioteca

## Instalar composer (Windows)

Para usar la bibioteca google-api-php-client es necesario tener instalado composer. Recomiendo este camino porque al **instalar el _google-api-php-client_ en el proyecto** hay dos maneras de hacerlo: a través del shell de SDK de Google o colocar carpetas en sus respectivas ubicaciones, lo cual considero aún menos práctico que lo primero. 

Lo primero que hay que hacer es ir a la página de [descarga.](https://getcomposer.org/doc/00-intro.md#installation-windows) Puede hacerlo de la manera automática o manual. Recomendable usar la automática: al descargar y ejecutar el archivo **Compose-Setup.exe** agrega la variable PATH para llamar a Composer desde la línea de comandos de Windows. Una vez que se haya ejecutado la aplicación, se puede comprobar en prompt la versión instalada al ejecutar:

```bash
C:\Windows\System32>composer -V
Composer version 1.5.6 2017-12-18 12:09:18
```
Y listo. 
**Nota:** el directorio de ejecución mostrado es sólo un ejemplo. No debe ser la ruta obligatoria para ejecutarlo.

## Instalar el google-api-php-client

Lo siguiente describe lo que está documentado en el [github del api](https://github.com/google/google-api-php-client)

Hay dos formas de instalación para esta biblioteca:
1. Utilizando Composer
Este método es **altamente recomendable**. Una vez que haya instalado Composer, ejecute el siguiente comando **desde la carpeta raíz de su proyecto:**

~~~bash
composer require google/apiclient:^2.0
~~~

Y también debe incluir el archivo autoload:
~~~php
require_once '/path/to/your-project/vendor/autoload.php';
~~~

2. Descargando el **Release** actual
Para esto, seguir los siguientes pasos: [Download the Release](https://github.com/google/google-api-php-client#download-the-release)

## Tener las credenciales en json para autenticarse

Es necesario datos como el API KEY... etc, que se pueden obtener en [la consola de google](http://developers.google.com/console)

Después seleccionar el proyecto que se desea y en la barra lateral izquierda, ir a Credenciales [](img/credenciales.png) 

Donde veremos las API KEY y los ID de OAuth 2.0 [](img/ClientSecret.png)

Al dar clic en cada uno, se desplegará la información correspondiente para el API activado del proyecto:

1. Service Account Credentials JSON
2. OAuth2 Client Credentials JSON [](oauth.png)
Damos clic en **DESCARGAR JSON**

Estos JSON contienen la información vital para acceder al API que queramos utilizar, hablamos del api php client.

## Lo padre: el código

Ahora con la información anterior, podremos colocarla en los parámetros necesarios para comunicarnos correctamente.

## Fuentes

[Google API Client Libraries](https://developers.google.com/api-client-library/)

[Google API Client Libraries](https://developers.google.com/api-client-library/php/start/installation)

Github del [google-php-api-client](https://github.com/google/google-api-php-client)

El código para subir archivos de gran tamaño está en los ejemplos del [google-api-php-client](https://github.com/google/google-api-php-client/tree/master/examples), llamado **large-file-upload.php**

Este framework es para ejecutar los archivos de test en la carpeta _tests_ del mismo github: [PHPUnit](https://phpunit.de/getting-started-with-phpunit.html)

En lugar de usar el google-api-php-client, usar el api para Google Drive, como expica Eduardo Casas:
* Blog; [subiendo archivos a Google Drive con PHP](https://www.eduardocasas.com/es/blog/05-12-2012/subiendo-archivos-a-google-drive-con-php)
* [Github de su ejemplo para Google Drive](https://github.com/eduardocasas/Google-Drive-PHP-API-Simple-App-Example/tree/master/google-api-php-client)


Usando el **API Cloud Storage**
[Cloud Storage Client Libraries](https://cloud.google.com/storage/docs/reference/libraries)
[Install Cloud Storage Client Libraries](https://cloud.google.com/storage/docs/reference/libraries#client-libraries-install-php)

