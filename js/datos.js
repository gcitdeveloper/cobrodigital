// Función para obtener datos de las transacciones
function datos(tipo){

//Muestra mensaje de carga mientras se procesa la petición
document.getElementById("data").innerHTML = "Cargando, aguarde por favor...";

    //Crea el objeto XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();
    
    //Se define la funcion que será llamada cuando readystate cambie
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

       //Se inicia la variable datos con la respuesta obtenida del archivo procesador
       var datos = JSON.parse(this.responseText);

       //Obtiene el total de registros mostrados el cual debe coincidir con el footer del archivo
       var total = datos.linea.length;

       //Calcula el total del monto cobrado el cual debe coincidir con el monto indicado en el footer del archivo
       let totalcobrado = datos.linea.reduce((acumulador, actual) => acumulador + parseFloat(actual.monto), 0);

       if(tipo == "Pluspagos"){
       var tituloidentificador="Identificador";
       }else{
       var tituloidentificador="ID Cliente";
       }
       var tabla ='<h2>Registros: '+total+' - Importe '+totalcobrado+'</h2>'+
        '<table><tr><th>Transacción</th><th>'+tituloidentificador+'</th><th>Monto</th><th>Fecha</th><th>Medio de pago</th></tr>'; 

           //Bucle para crear líneas de la tabla con los resultados obtenidos 
          for (i = 0; i < total; i++){
           tabla = tabla + '<tr>' + 
           '<td>' + datos.linea[i].ref + '</td>'+
           '<td>' + datos.linea[i].identificador + '</td>'+
           '<td>' + datos.linea[i].monto + '</td>'+
           '<td>' + datos.linea[i].fecha + '</td>'+
           '<td>' + datos.linea[i].medio + '</td>'+'</tr>';
          }

          //Vuelca datos de la tabla en el elemento con id data
          document.getElementById("data").innerHTML = tabla + '</table>'; 
      }
    };

    //Inicializa el objeto para la petición http
    xmlhttp.open("GET", "php/procesador.php?tipo=" + tipo, true);

    //Abre la conexión y envía la solicitud
    xmlhttp.send();
}

//Inicia la funcion datos al finalizar la carga del sitio
window.addEventListener('load', function() {
    datos("0370");
});