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

Es recomendable el clonado del repositorio dentro de la carpeta correspondiente a su servidor local. Este ejemplo utiliza xampp, y la ubicación del repositorio está en _htdocs_.

Para utilizar este api es **crucial tenerla habilitada** en el proyecto que va a enlazarla. ![](img/api-habilitada.png)

Hay dos formas de instalación para esta api en su proyecto:
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

Es necesario datos como el ID del proyecto, API KEY...etc, que se pueden obtener en [la consola de google](http://developers.google.com/console)

Después, seleccione el proyecto que desea conectar con la api y en la barra de menú lateral izquierda, ir a **Credenciales** [](img/credenciales.png) 

Ahí veremos las _Claves de API_ (API KEY) y los IDs de cliente de OAuth 2.0 ![img1](img/ClientSecret.png)

Seleccionamos en IDs de cliente de OAuth 2.0 el ID mostrado. Una vez seleccionado, en la parte superior central veremos la opción **DESCARGAR JSON** ![img2](img/oauth.png)

Este JSON contiene la información vital para acceder a cualquier API que queramos utilizar. Recuerde, en este caso es el _google-php-api-client_.

## Lo padre: el código

Ahora con la información anterior, podrá utilizar el api correctamente. Una vez que hayamos clonado el repositorio del _google-php-api-client_ eliminamos el composer.json ubicado en la carpeta raíz del mismo. Esto es necesario para que composer opere con las dependencias que tenga instaladas en el sistema, de lo contrario al ejecutar el código ejemplo, marcará errores.

Ahora debe ubicarse en la **carpeta examples** y desde la línea de comandos deberá ejecutar:

~~~bash
composer require google/apiclient:^2.0
~~~

Esto crea el archivo composer.json con las dependencias de su sistema.

Lo que resta por hacer es abrir el archivo _large-file-upload.php_ y modificarlo un poco. Este código se encarga de la carga de un archivo en el Google Drive de la cuenta autenticada a través de una pantalla de oAuth, la cual deberá registrar en su lista de IDs de cliente de OAuth 2.0 del proyecto, pero antes de ir hacia esa parte, procederemos a cambiar un poco el código de _large-file-upload.php_:

~~~php
<?php
/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

include_once __DIR__ . '/vendor/autoload.php';
include_once "templates/base.php";

echo pageHeader("File Upload - Uploading a large file");

/*************************************************
 * Ensure you've downloaded your oauth credentials
 ************************************************/
if (!$oauth_credentials = getOAuthCredentialsFile()) {
  echo missingOAuth2CredentialsWarning();
  return;
}

/************************************************
 * The redirect URI is to the current page, e.g:
 * http://localhost:8080/large-file-upload.php
 ************************************************/
$redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];

$client = new Google_Client();
$client->setAuthConfig($oauth_credentials);
$client->setRedirectUri($redirect_uri);
$client->addScope("https://www.googleapis.com/auth/drive");
$service = new Google_Service_Drive($client);

// add "?logout" to the URL to remove a token from the session
if (isset($_REQUEST['logout'])) {
  unset($_SESSION['upload_token']);
}

/************************************************
 * If we have a code back from the OAuth 2.0 flow,
 * we need to exchange that with the
 * Google_Client::fetchAccessTokenWithAuthCode()
 * function. We store the resultant access token
 * bundle in the session, and redirect to ourself.
 ************************************************/
if (isset($_GET['code'])) {
  $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
  $client->setAccessToken($token);

  // store in the session also
  $_SESSION['upload_token'] = $token;

  // redirect back to the example
  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

// set the access token as part of the client
if (!empty($_SESSION['upload_token'])) {
  $client->setAccessToken($_SESSION['upload_token']);
  if ($client->isAccessTokenExpired()) {
    unset($_SESSION['upload_token']);
  }
} else {
  $authUrl = $client->createAuthUrl();
}

/************************************************
 * If we're signed in then lets try to upload our
 * file.
 ************************************************/
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken()) {
  /************************************************
   * We'll setup an empty 20MB file to upload.
   ************************************************/
  DEFINE("TESTFILE", 'testfile.txt');
  if (!file_exists(TESTFILE)) {
    $fh = fopen(TESTFILE, 'w');
    fseek($fh, 1024*1024*20);
    fwrite($fh, "!", 1);
    fclose($fh);
  }

  $file = new Google_Service_Drive_DriveFile();
  $file->name = "Big File";
  $chunkSizeBytes = 1 * 1024 * 1024;

  // Call the API with the media upload, defer so it doesn't immediately return.
  $client->setDefer(true);
  //$request = $service->files->create($file);
  // En lugar de crearlo, insertar el archivo deseado
  $request = $service->files->create($file);


  // Create a media file upload to represent our upload process.
  // ESTA CLASE HACE TODO EL REQUEST POR TI
  $media = new Google_Http_MediaFileUpload(
      $client,
      $request,
      'text/plain',
      null,
      true,
      $chunkSizeBytes
  );
  // Manda el archivo de 20MB que está creando 
  //$media->setFileSize(filesize(TESTFILE));
  // Envía el archivo en una ruta específica
  $media->setFileSize(filesize("D:/Users/rrlopez/Downloads/ATC Test 413MB.csv"));

  /*
  // Upload the various chunks. $status will be false until the process is
  // complete.
  $status = false;
  $handle = fopen(TESTFILE, "rb");
  while (!$status && !feof($handle)) {
    // read until you get $chunkSizeBytes from TESTFILE
    // fread will never return more than 8192 bytes if the stream is read buffered and it does not represent a plain file
    // An example of a read buffered file is when reading from a URL
    $chunk = readVideoChunk($handle, $chunkSizeBytes);
    $status = $media->nextChunk($chunk);
  }
  */

  //Subir el archivo en la ruta especificada
$status = false;
$handle = fopen("D:/Users/rrlopez/Downloads/ATC Test 413MB.csv", "rb");
while (!$status && !feof($handle)) {
  $chunk = fread($handle, $chunkSizeBytes);
  $status = $media->nextChunk($chunk);
 }

  // The final value of $status will be the data from the API for the object
  // that has been uploaded.
  $result = false;
  if ($status != false) {
    $result = $status;
  }

  fclose($handle);
  // Reset to the client to execute requests immediately in the future.
  $client->setDefer(false);
}

function readVideoChunk ($handle, $chunkSize)
{
    $byteCount = 0;
    $giantChunk = "";
    while (!feof($handle)) {
        // fread will never return more than 8192 bytes if the stream is read buffered and it does not represent a plain file
        $chunk = fread($handle, 8192);
        $byteCount += strlen($chunk);
        $giantChunk .= $chunk;
        if ($byteCount >= $chunkSize)
        {
            return $giantChunk;
        }
    }
    return $giantChunk;
}
?>

<div class="box">
<?php if (isset($authUrl)): ?>
  <div class="request">
    <a class='login' href='<?= $authUrl ?>'>Connect Me!</a>
  </div>
<?php elseif($_SERVER['REQUEST_METHOD'] == 'POST'): ?>
  <div class="shortened">
    <p>Your call was successful! Check your drive for this file:</p>
    <p><a href="https://drive.google.com/open?id=<?= $result->id ?>" target="_blank"><?= $result->name ?></a></p>
    <p>Now try <a href="/large-file-download.php">downloading a large file from Drive</a>.
  </div>
<?php else: ?>
  <form method="POST">
    <input type="submit" value="Click here to upload a large file" />
  </form>
<?php endif ?>
</div>

<?= pageFooter(__FILE__) ?>
~~~

Nótese que se envía una ruta de un archivo (D:/Users/rrlopez/Downloads/ATC Test 413MB.csv), la cual deberá cambiar de acuerdo a la ruta deseada de un archivo para que funcione el ejemplo. El nombre de archivo que subirá a la cuenta de Google Drive es "Big File". Una vez hechos los cambios en el código, registrará la URL de oAauth para guardar el archivo en la cuenta de Google Drive que inició una sesión.

1. Ejecutar desde la línea de comandos en la carpeta raíz del repositorio:

~~~bash
php -S localhost:8000 -t examples/
~~~

Navegue a localhost:8000. Verá la lista siguiente: ![](img/lista.png). Si no puede ver esta página de manera correcta, deberá añadir el json con la información de su id de proyecto mostrado anteriormente y renombrarlo "oauth-credentials.json".

Elija _An example of a large file upload_. Observará la siguiente pantalla y dará clic en _Connect Me!_, que subirá el archivo de la ruta indicada anteriormente en el código ![](img/connect.png)

La página desplegará un error 400, como en el ejemplo a continuación: ![ejemplo](img/ejemplo.png):

La URL mostrada, en este caso "http://localhost:8000/large-file-upload.php/" es la que deberá registrar en la lista oAuth, en la sección de **URIs de redirección autorizados**, la cual se muestra al dar clic en **ID de Cliente de Web** del menú Credenciales.

Una vez clic en _Guardar_, actualice la página del navegador donde desplegó la lista de ejemplos (localhost:8000). Vuelva a ejecutar la opción _An example of a large file upload_. Si la página fue autorizada correctamente, su proyecto le solicitará que inicie sesión en su cuenta de Google para enviar el archivo a su Google Drive.

Una vez que la carga se realice con éxito, podrá ver la confirmación a continuación: ![](img/salida.png)

Vaya al Google Drive para verificar la carga del archivo ![](img/success.png)

## Configuración para subir archivos mayores a 32 MB
En el php.ini del servidor local deberá cambiar los siguientes parámetros, para evitar experimentar errores relacionados con el tiempo de respuesta y el tamaño límite del archivo a enviar. ![](img/error1.png)

~~~php
;el valor numérico representa segundos. Ajuste para 20 mins
max_execution_time = 1200
; Maximum amount of memory a script may consume (128MB)
; http://php.net/memory-limit
memory_limit=700M
~~~

# Trabajo futuro
Realizar el deploy de la aplicación mediante el uso de PHP standard || flexible environment. Se busca que esta funcionalidad de carga de archivos se integre con Angular y php

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

