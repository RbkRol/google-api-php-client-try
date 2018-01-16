<?php
include("conexion.php");

      $con=conectar();
        if (!$con)
        {
          die (" No se puede usar la base de datos " . mysqli_error($con));
        }
        else 
        { 
            $resultado=mysqli_query($con,"SELECT correo,password FROM usr");
            if(!$resultado){
				echo "Error"; 
			}
			else{
				while($row = mysqli_fetch_row($resultado)) 
					$array[] = $row;
				$json = json_encode($array);
				echo($json);
			
			}
			mysqli_close($con);
        }
?>