<?php 
    /* Saber en que pagina estamos */
    function obtenerPaginaActual(){ /* Saber en que pagina estamos */
        $archivo = basename($_SERVER['PHP_SELF']);
        $pagina =str_replace(".php","",$archivo);
        return $pagina;
    }

    /* Obtener consultas */

    /* Todos los proyectos */
    function obtenerProyectos(){
        /* Conexión a la BD */
        include 'conexion.php';
        try {

            return $conn -> query('SELECT proy_Id, proy_Nombre FROM proyectos');
            /* $conn -> close(); */
        } catch (Exception $e){
            echo "Error! " . $e -> getMessage();
            return false;
        }
    }

    /* Obtener el nombre del Proyecto*/
    function obtenerNombre($pId = null) {
        /* Conexión a la BD */
        include 'conexion.php';
        try {

            return $conn -> query("SELECT proy_Nombre FROM proyectos WHERE proy_Id = {$pId}");
            /* $conn -> close(); */
        } catch (Exception $e){
            echo "Error! " . $e -> getMessage();
            return false;
        }
    }


?>