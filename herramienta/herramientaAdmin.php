<?php
include('php/sesion.php');
// imprimir nombre del admin
$autentico = $_SESSION["nombreAdmin"];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/jquery.dataTables.min.css">
    <title>Admin login</title>
    <style type="text/css">
        /*Estilos de la página*/
        .container {
            margin-top: 30pt;
            padding-top: 30pt;
            padding-left: 3%;
            padding-bottom: 30pt;
            padding-right: 3%;
            line-height: 16pt;
            background-color: white;
            box-shadow: 5pt 10pt 10pt rgb(213, 218, 229);
        }

        .titulo {
            font-family: Arial, Helvetica, sans-serif;
            color: rgb(23, 36, 52);
            font-size: 16pt;
            text-align: justify;
        }

        .subtitulo {
            color: rgb(23, 36, 52);
            text-align: justify;
            margin-bottom: 2%;
        }

        .colorcito{
            background-color: white; 
            border-color: rgb(201,201,217);
            padding: 5px 8px;
        }

        .colorcito:hover{
            background-color: #fcd4c6ce;
            border-color: #fcd4c6ce;
        }

        .colorcito:select{
            border-color: rgb(249,250,252);
        }

        .colorcito:focus {
            outline: 0;
            background-color: #fff;
            box-shadow: 0 0 0 0.2rem #ff570a;
            color: white;
            
        }

        .propio {
            border-radius: 50px;
            width: 50px;
            height: 50px;
            color: #fff;
        }

        .propio:focus {
            color: #fff;
            border: 0;
            outline: 0 none;
        }

        .add-header-color{
            color: #fff;
            text-align: center;
            background-color: ;
        }
        
    </style>
</head>

<body class="body-tool">
    <header>
        <div class="primer-contenedor">
            <img class="logo" src="img/gnPicono.png" alt="GNPlogo">
            <div id="vertical-bar"></div>
        </div>

        <label>Administrador de Proveedores GNP</label>

        <div class="cerrar-sesion" id="cerrar-sesion">
            <a title="Cerrar sesion" href="php/salir.php"><img class="sesionL" src="img/cerrarSesioN.png" alt="Cerrar sesion" /><?php echo "    $autentico" ?></a>
        </div>

        <div class="linea" id="linea" hidden>
        </div>
    </header>

    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="titulo">
                    Lista de Usuarios
                </div>
                <div class="subtitulo">Administrador de archivos</div>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-3">
                <button class="btn btn-primary" id="agregar" >Agregar usuario</button>
            </div>
        </div>
        <br>
        <table id="datos" class="table">
            <thead>
                <tr>
                    <th style="text-align: center">RFC</th>
                    <th style="text-align: center">Nombre</th>
                    <th style="text-align: center">Proveedor</th>
                    <th style="text-align: center">Correo</th>
                    <th style="text-align: center">Password</th>
                    <th style="text-align: center">Activo</th>
                    <th style="text-align: center">Acciones</th>
                    <th style="text-align: center">Permisos</th>
                </tr>
            </thead>
            <tbody id="editar" style="text-align: center">
                <?php
                include_once 'php/consultaUsuarios.php';
                ?>
            </tbody>
            </table>
        
    </div>
    <div class="texto">Consulta nuestro aviso de privacidad en www.gnp.com.mx</div>
    <footer>
        <img class="footer-logo" src="img/slogan.png" alt="Vivir es increíble">
        <img class="express-logo" src="img/iconoDe2.png" alt="logoExpress">
    </footer>
    
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <script src="js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="js/herramienta.js"></script>
</body>
</html>