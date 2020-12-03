<aside class="contenedor-proyectos">
        <div class="panel crear-proyecto">
            <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
        </div>
    
        <div class="panel lista-proyectos">
            <h2>Proyectos</h2>
            <ul id="proyectos">
                <?php
                    /* Llamamos la función */
                    $proyectos = obtenerProyectos();
                    /* Comprobar que tengamos algo en la consulta */
                    if($proyectos){
                        foreach($proyectos as $proyecto){
                            /* Ver los valores que regres */
                            /* echo "<pre>";
                                var_dump($proyecto);
                            echo "</pre>"; */
                            echo "<li>";
                            echo '<a href="index.php?id=' . $proyecto["proy_Id"] . '">' . $proyecto["proy_Nombre"] . '</a>';
                            echo '</li>'; 
                        }
                    }
                ?>
                <!-- <li>
                    <a href="#">
                        Diseño Página Web
                    </a>
                </li>
                <li>
                    <a href="#">
                        Nuevo Sitio en wordPress
                    </a>
                </li> -->
            </ul>
        </div>
    </aside>