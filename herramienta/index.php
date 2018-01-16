<?php
session_start();
if(isset($_SESSION)){
    if(isset($_SESSION["adminAutentico"])){
        echo "<script>alert('Su sesión continúa activa')
        self.location = 'herramientaAdmin.php' </script>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Admin</title>
    <style type="text/css">
        /*Estilo externo. Pertenece sólo a esta página*/
        .col-md-6 {
            background-color: white;
            margin-top: 30pt;
            padding-top: 10pt;
            padding-bottom: 10pt;
            box-shadow: 5pt 10pt 10pt rgb(213, 218, 229);
            margin-bottom: 40pt;
        }

        p {
            font-family: Arial, Helvetica, sans-serif;
            color: rgb(31, 63, 121);
            text-align: center;
            font-size: 24pt;
        }

        h5 {
            text-align: left;
            font-family: Arial, Helvetica, sans-serif;
            color: rgb(31, 63, 121);
            font-size: 14pt;
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


    </style>
</head>

<body>
    <header>
        <div class="primer-contenedor">
            <img class="logo" src="img/gnPicono.png" alt="GNPlogo">
            <div id="vertical-bar"></div>
        </div>

        <label>Administrador de Proveedores GNP</label>

        <div class="cerrar-sesion" id="cerrar-sesion" hidden>
            <img class="sesionL" src="img/cerrarSesioN.png"> Cerrar sesión
        </div>
        <div class="linea" id="linea" hidden>
        </div>
    </header>

    <div class="container">
        <div class="row">
            <div class="col-md-3">
            </div>

            <div class="col-md-6">
                <p>Inicio de sesión</p>
                
                <div align="center" class="col-md-lg-4">
                    <form name="authAdmin" action="php/ctrlAcceso.php" method="post" validate>
                    <?php
                    error_reporting(E_ALL^E_NOTICE);
                    if($_GET["error"]=="si"){
                        echo "<span>Verifica tus datos</span>";
                    }else{
                        echo "Introduce tus datos";
                    }   
                    ?>
                        <div class="form-group" >
                            <h5>Usuario</h5>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <input type="email" class="form-control" name="admiName" placeholder="Administrador" autocomplete="off" required/>
                            </div>
                            <div class="help-block">El correo es requerido</div>
                        </div>

                        <div class="form-group" >
                            <h5>Contraseña</h5>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-key" aria-hidden="true"></i>
                                </div>
                                <input type="password" class="form-control" name="adminPass" placeholder="Contraseña" required/>
                            </div>
                            <div class="help-block">La contraseña es requerida</div>
                        </div>
                        <br>
                        <div>
                            <button type="submit" class="btn propio" id="login">
                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            </button>
                        </div>                        
                    </form>
                    <form name="remindPass" action="recuperar.php" >
                        <div>
                            <br>
                            <br>
                            <button type="submit" class="btn btn-primary" id="recordarPass" >
                                Recuperar contraseña
                            </button>
                        </div>
                    </form>
                </div>
                <br>
            </div>

            <div class="col-md-3">
            </div>

        </div>
    </div>
    <div class="texto">Consulta nuestro aviso de privacidad en www.gnp.com.mx</div>
    <footer>
        <img class="footer-logo" src="img/slogan.png" alt="Vivir es increíble">
        <img class="express-logo" src="img/iconoDe2.png" alt="logoExpress">
    </footer>

    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</body>
</html>