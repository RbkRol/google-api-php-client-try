<?php
function conectar(){
	$user="root";
	$pass="naruto";
	$server="localhost";
	$db="proveedores";
	$con=mysqli_connect($server,$user,$pass) or die ("Error al conectar a la base de datos".mysqli_error());
	mysqli_select_db($con,$db);
	return $con;
}
?>