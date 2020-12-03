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
    $titulo = "Seleccione uno";
    if(isset ($_GET['id'])){
        /* Solo saber si se selecciono algún id */ /* echo "Si - " . $_GET['id']; */
        $id_proy = $_GET['id'];
        /* echo "Si - " . $id_proy; */
        $proy = obtenerNombre($id_proy);
        foreach($proy as $nom){

            /* echo "<pre>";
                var_dump($nom);
            echo "</pre>"; */
            $titulo = $nom["proy_Nombre"];
        }
    }

?>


<div class="contenedor">
    <?php
         include 'inc/templates/sidebar.php';
    ?>

    <main class="contenido-principal">
        <h1> Proyecto Actual: 

            <span> <?php echo $titulo; ?> </span>

        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="<?php echo $id_proy; ?>" value="id_proyecto">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        
 

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
                                <!-- Agregar el id al elemento de la BD proyecto -->
                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>  
            </ul>
        </div>
    </main>
</div><!--.contenedor-->


<?php include 'inc/templates/footer.php'; ?>