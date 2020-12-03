<?php

$conn = new mysqli('localhost','root','','uptask');

if($conn -> connect_error){
    echo $conn -> connect_error;
}

$conn -> set_charset('utf8'); /* Recibir los caracteres utf8 */

/* Formar de comprobar la conexión */
/* echo "<pre>";
var_dump($conn);
echo "</pre>"; */ /* Obtener detalles de la conexión ["connect_error"]=> NULL, existe conexión*/

/* echo "<pre>";
var_dump($conn->ping());
echo "</pre>"; */ /* SI regresa un bool(true), existe conexión */
?>