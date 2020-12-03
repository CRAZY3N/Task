<?PHP
    /* Comprobar que los datos que se están enviando son los correcto die(json_encode($respuesta));  */

    /* Variables */
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    $accion = $_POST['accion'];


    /* Código para login */
    if($accion === 'login'){

        /* Importar conexión */
        include ('../funciones/conexion.php');

        try{
            //Seleccionar código que loguee a los admin
            $stmt = $conn -> prepare("SELECT usu_id, usu_nombre, usu_password FROM usuarios WHERE usu_nombre = ? ");
            $stmt -> bind_param('s', $usuario);
            $stmt -> execute();
            //Loguear al usuario, /* Obteniendo los registros de la consulta */
            $stmt -> bind_result($id_usuario, $nombre_usuario, $pass_usuario); 
            $stmt -> fetch();
            if($nombre_usuario){
                /* Existe usuario */
                if(password_verify($password, $pass_usuario)){
                    /* Iniciar sección */
                    session_start();
                    $_SESSION['nombre'] = $nombre_usuario;
                    $_SESSION['id'] = $id_usuario;
                    $_SESSION['login'] = true;
                    /* Login correcto */
                    $respuesta = array(
                        'tipo' => $accion,
                        'respuesta' => 'correcto',
                        'mensaje' => 'Login correcto',
                        /* 'id' => $id_usuario, */
                        'nombre' => $nombre_usuario
                        /*'password' => $pass_usuario,
                        'columna' => $stmt -> affected_rows */
                    );
                    
                } else{
                    /* Login incorrecto */
                    $respuesta = array(
                        'tipo' => 'login',
                        'respuesta' => 'Incorrecto',
                        'mensaje' => 'Password incorrecto'
                    );
                }
            } else {
                $respuesta = array(
                    'respuesta' => 'error',
                    'mensaje' => 'Usuario no encontrado'
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

        die(json_encode($respuesta));
    }
    

    /* Código para creer */
    if($accion === 'crear'){
        /* Hashear password */
        $opciones = array(  /* Mientras mayor sea el cost, más seguro sera la contraseña, pero más recursos tomara del servidor */
            'cost' => 12
        );
        /* Método */
        $has_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

        /* Importar conexión */
        include ('../funciones/conexion.php');
        
        try{
            //Consulta a la DB
            $stmt = $conn -> prepare("INSERT INTO usuarios (usu_nombre, usu_password) VALUES (?, ?)");
            $stmt -> bind_param('ss', $usuario, $has_password);
            $stmt -> execute();
            if($stmt -> affected_rows){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt -> insert_id,
                    'tipo' => $accion
                    /* 'mensaje1' => $stmt -> affected_rows  */ /* Saber lo que regresa el servidor */
                    /* 'pass' => $has_password */ /* Saber el password encriptado */
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
    die(json_encode($respuesta));
?>