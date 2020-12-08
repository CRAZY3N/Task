<!-- Header -->
<?php
    include 'inc/funciones/secciones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
    //Comprobar los datos cuando se loguea
    /* echo '<pre>';
    var_dump($_SESSION);
    echo '</pre>'; */

    /* Comprobar si estámos en un proyecto con el id */
    $titulo = "";
    $proye = "Seleccione uno";
    if(isset ($_GET['id'])){
        /* Solo saber si se selecciono algún id */ /* echo "Si - " . $_GET['id']; */
        $id_proy = $_GET['id'];
        /* echo "Si - " . $id_proy; */
        $proy = obtenerNombre($id_proy);
        foreach($proy as $nom){

            /* echo "<pre>";
                var_dump($nom);
            echo "</pre>"; */
            $titulo = "Proyecto Actual:";
            $proye = $nom["proy_Nombre"];
        }
    }

?>


<div class="contenedor">
    <?php
         include 'inc/templates/sidebar.php';
    ?>

    <main class="contenido-principal">
        <h1> <?php echo $titulo; ?> 

            <span> <?php echo $proye; ?> </span>

        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proy" value="<?php echo $id_proy; ?>" value="id_proyecto">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        
 

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
                <!-- Agregar el id al elemento de la BD proyecto -->
                <?php
                    if(isset($id_proy)){
                        $tareas = obtenerTareasProy($id_proy);
                        /* echo '<pre>'; */
                        if($tareas -> num_rows > 0) {
                            foreach($tareas as $tarea){
                            /* var_dump($tarea); */ ?>
                            <li id="<?php echo 't:' . $tarea['Tar_Id']; ?>" class="tarea">
                                <p><?php echo $tarea['Tar_Nombre']; ?></p>
                                <div class="acciones">
                                    <i class="far fa-check-circle <?php echo ($tarea['Tar_Estado'] === '1' ? 'completo' : '') ?>"></i>
                                    <i class="fas fa-trash"></i>
                                </div>
                            </li>
                            
             <?php          }
                        } else {
                            echo '<p>No tiene tareas </p>';
                        }
                    /* echo '</pre>'; */
                    }
                ?>
                <!-- Agregar el id al elemento de la BD proyecto -->
                    <!-- <li id="tarea" class="tarea">
                        <p>Cambiar el Logotipo</p>
                        <div class="acciones">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-trash"></i>
                    </div>
                    </li> -->  
                
            </ul>
        </div>

        <div class="avance">
            <h2>Avance del Proyecto</h2>
            <div class="barra-avance" id="barra-avance">
                <div class="porcentaje" id="porcentaje"></div>
            </div>
        </div>

    </main>
</div><!--.contenedor-->


<?php include 'inc/templates/footer.php'; ?>