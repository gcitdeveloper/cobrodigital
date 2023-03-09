<?php
//Procesador llamado desde ajax
//Se incluye archivo de funciones
require_once("funciones.php");

//Verifica que la variable exista, si existe llama a la funcion para obtener los datos
if(isset($_REQUEST["tipo"])){
datos($_REQUEST["tipo"]);
}
?>