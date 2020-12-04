<?php

$accion = $_POST['accion'];
if($accion === 'crear') {
    $id = (int) $_POST['id'];
    $nombre = $_POST['tarea'];

    /* Incluir la conexión */
    include ('../funciones/conexion.php');

    try {

        $stmt = $conn -> prepare(" INSERT INTO tareas (Tar_Nombre, Tar_ProyId) VALUES (?, ?)");
        $stmt -> bind_param('si', $nombre, $id);
        $stmt -> execute();

        if($stmt -> affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'success',
                'id_insertado' => $stmt -> insert_id,
                'accion' => $accion,
                'title' => 'Tarea Creada',
                'tarea' => $nombre
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error',
                'accion' => $accion,
                'title' => 'Tarea no creado',
                'proyecto' => $nombre
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


    echo json_encode($respuesta);
}

if($accion === 'modificar') {

}

?>