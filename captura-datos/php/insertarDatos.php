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
	
	   $ejecutar=mysqli_query($con,"INSERT INTO `historico-proveedores`(correo,archivo) VALUES('" . $_POST['correo'] . "','" . $_POST['archivo'] . "')");
            if(!$ejecutar){
				$data= "Error"; 
			}
			else{
				 $resultado=mysqli_query($con,"SELECT folio FROM `historico-proveedores` WHERE correo='" . $_POST['correo'] . "' AND archivo='". $_POST['archivo'] . "' ORDER BY fecha DESC");
           $row = mysqli_fetch_row($resultado);
		    $array= array("folio"=>$row[0]);
			$data=json_encode($array);
			}
	
	
	
	
	
	
	/*
        $sql = "INSERT INTO historico-proveedores (correo, archivo) VALUES ('".$_POST['correo']."','".$_POST['archivo']."')";
            
           if($con->query($sql)){
            $data="Ok";
           }
           else{
            $data="Error";
           }*/
            
            mysqli_close($con);
            echo json_encode($data);
        }

?>