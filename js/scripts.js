'use strict';
/* Variables Globales */
var listaProyectos = document.querySelector('ul#proyectos');
/* console.log(listaProyectos); */

/* Escuchas los eventos */
eventListener();

/* Declarar los eventos que escuchara */
function eventListener() {
    //Botón para crear proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
    
}

/* Crear proyecto */
function nuevoProyecto(e){
    e.preventDefault();
    /* console.log('Presionaste nuevo proyecto'); */
    /* Crea un input, para el nombre del nuevo proyecto */
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.append(nuevoProyecto);

    //Seleccionar el ID con el nuevo proyecto 
     var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');
     /* console.log(inputNuevoProyecto); */

     //Al presionar enter, crear un nuevo proyecto
     inputNuevoProyecto.addEventListener('keypress', function(e) {
        var tecla = e.which || e.keyCode; /* Identificar la tecla presionada */
        if( tecla === 13) {  /* Cuando el usuario le de enter */
        /* console.log('Presionaste Enter'); */
            guardarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
    }
    });
    

}

/* Guardar proyecto en la DB */
function guardarProyectoDB(nombreProyecto){
    /* console.log("Guardando " + nombreProyecto); */

    //Llamado Ajax
    var xhr = new XMLHttpRequest();
      //Enviar datos por formdata
      var datos = new FormData();
      datos.append('proyecto', nombreProyecto);
      datos.append('accion', 'crear');
    //Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelos-proyecto.php', true);
    /* Carga */
    xhr.onload = function() {
        if(this.status === 200) {
            /* console.log(JSON.parse(xhr.responseText)); */
            var respuesta = JSON.parse(xhr.responseText),
                tipo = respuesta.respuesta,
                title = respuesta.title,
                proyecto = respuesta.proyecto,
                accion = respuesta.accion;
            if(tipo === 'success') {
                var id = respuesta.id_insertado;
                /* Exitoso */
                if(accion === 'crear'){
                    /* Agregar proyecto a la pagina */
                    agregarProyecto(proyecto, id);
                    Swal.fire({
                        type: tipo,
                        title: title,
                        text: 'EL proyecto: ' + proyecto + ' - Creado'
                        /* footer: '<a href>Why do I have this issue?</a>' */ 
                 })
                 .then(resultado => {
                    if(resultado.value){
                        window.location.href = 'index.php?id=' + id;
                    }
                })

                } else if(accion === 'actualizar') {
                    console.log("Actualizar");
                }
                
            } else {
                /* Hubo un error */
                Swal.fire({
                    type: tipo,
                    title: title,
                    text: proyecto + ' - No fue creado'
                    /* footer: '<a href>Why do I have this issue?</a>' */ 
                 })
            }
        }
    };
    //Enviar el request
    xhr.send(datos);
}

function agregarProyecto(nombre, id){
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML =  `
        <a href="index.php?id=${id}" id="${id}">
        ${nombre}
        </a>
    `;
    listaProyectos.appendChild(nuevoProyecto);
}