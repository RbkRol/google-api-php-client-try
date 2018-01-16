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
            $resultado=mysqli_query($con,"SELECT rfc,nombre,proveedor,correo,password,estatus FROM usr");
            if(!$resultado){
				echo "Error"; 
			}
			else{
				while($row = mysqli_fetch_row($resultado)) 
					$array[] = array("rfc"=>$row[0],"nombre"=>$row[1],"proveedor"=>$row[2],"correo"=>$row[3],"password"=>$row[4]);
				$json = json_encode($array);
				echo($json);
			
			}
			mysqli_close($con);
        }
?>