<?php
//Archivo de funciones
function datos($tipo){
//Conexión a la DB
$conexion = new mysqli("localhost","root","agus2008","cobrodigital");
if (mysqli_connect_errno()) {
    printf("Error de conexión: %s\n", $conexion->connect_error);
    exit();
}

//Se inician variables
$where="";
$medio="";
$i=0;

//Crea objeto
$obj = new stdClass();

if($tipo=="0360" or $tipo=="0370" or $tipo=="0371"){
//Consulta para los tipo de registro de pago directo
$resultado = $conexion->query("select refunivoca, idcliente, valor1vto, fecha1vto, convert('D&#233;bito Autom&#225;tico' USING utf8) from pagodirecto where tiporeg = '$tipo'");
}elseif($tipo=="Pluspagos"){
//Consulta pluspagos
$resultado = $conexion->query("select transaccion, codservicio, importe, fecha1vto, (select a.descripcion from formapago as a where a.codigo=formapago) as medio from pluspagos");
}

//Bucle para volcar datos obtenidos
while ($fila = $resultado->fetch_row()) {
$obj->linea[$i] = array('ref' => $fila["0"], 'identificador' => $fila["1"], 'monto' => $fila["2"], 'fecha' => $fila["3"], 'medio' => $fila["4"]);
$i++;
}

//Convierte la salida en JSON y la imprime
echo json_encode($obj);

//Libera memoria
$resultado->free();

//Cierra conexión
$conexion->close();
}
?>