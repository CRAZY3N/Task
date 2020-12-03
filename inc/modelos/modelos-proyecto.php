<?php

$accion = $_POST['accion'];
$proyecto = $_POST['proyecto'];

/* Crear proyecto */
if($accion === 'crear'){

    /* Importar conexión */
    include ('../funciones/conexion.php');
    
    try{
        //Consulta a la DB
        $stmt = $conn -> prepare("INSERT INTO proyectos (proy_Nombre) VALUES (?)");
        $stmt -> bind_param('s', $proyecto);
        $stmt -> execute();
        if($stmt -> affected_rows){
            $respuesta = array(
                'respuesta' => 'success',
                'id_insertado' => $stmt -> insert_id,
                'accion' => $accion,
                'title' => 'Proyecto creado',
                'proyecto' => $proyecto
                /* 'mensaje1' => $stmt -> affected_rows  */ /* Saber lo que regresa el servidor */
                /* 'pass' => $has_password */ /* Saber el password encriptado */
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error',
                'accion' => $accion,
                'title' => 'Proyecto no creado',
                'proyecto' => $proyecto
            );
        }
        $stmt -> close();
        $conn -> close();

    } catch(Exception $e){
        $respuesta = array(
            'respuesta' => 'error',
            'mensaje' => $e.getMessage()
        );
    }
}
/* Respuesta */
echo json_encode($respuesta);

?>