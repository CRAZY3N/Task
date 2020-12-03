<?php

/* Revisar que esté loqueado el usuario */
function usuario_autenticado(){
    if(!revisar_usuario() ){
        header('location:login.php');
        exit();
    }
}

function revisar_usuario(){

    return isset($_SESSION['nombre']);
}

session_start();
usuario_autenticado();

?>