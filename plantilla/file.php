<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>Subiendo archivo de tamaño máximo a 500 MB</h1>
    
    <!-- El tipo de codificación de datos, enctype, DEBE especificarse como sigue -->
    <form uploadType=resumable action="http://localhost:8082/subirArchivos/subirGDrive.php" method="POST" enctype="multipart/form-data">
        <!-- MAX_FILE_SIZE debe preceder al campo de entrada del fichero, equivalente a 0.5GB/500M -->
        <input type="hidden" name="MAX_FILE_SIZE" value="500000000" />
        <!-- El nombre del elemento de entrada determina el nombre en el array $_FILES -->
        Enviar este fichero:
        <input type="file" id="bigCsvFile" name="bigCsvFile"/>
        <input type="submit" value="Enviar documento" />
    </form>



</body>

</html>