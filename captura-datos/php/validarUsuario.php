<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");
include("conexion.php");

      $con=conectar();
        if (!$con)
        {
          die (" No se puede usar la base de datos " . mysqli_error($con));
        }
        else 
        { 
            $resultado=mysqli_query($con,"SELECT correo,password,nombre FROM usr WHERE correo='" . $_GET['correo'] . "' AND password='". $_GET['password'] . "' AND estatus=1");
            if(!$resultado){
					$data="Error";
			}
			else{
				$row = mysqli_fetch_row($resultado);
if(!$row){
$data="Error";

}
                else{
                    $array= array("nombre"=>$row[2]);
                    $data=json_encode($array);
                }
        }
            mysqli_close($con);
            echo json_encode($data);
        }

?>