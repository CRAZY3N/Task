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

    //Botón para nueva tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    /* Botones para las acciones de las tareas */
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTarea);
    
}

/* Accines tareas */
/* Cambiando el estado de tareas o elimina */

function accionesTarea(e){
    /* console.log(e.target); */ /* Saber a que le estamos dando click */
    if(e.target.classList.contains('fa-check-circle')){
        if(e.target.classList.contains('completo')) {
            e.target.classList.remove('completo');
            cambiarEstadoTar(e.target, 0);
        } else {
            e.target.classList.add('completo');
            cambiarEstadoTar(e.target, 1);
        }
    } else if(e.target.classList.contains('fa-trash')) {
        console.log("Borrar");

    }
}

/* Cambiar estado de tarea */
function cambiarEstadoTar(tarea, estado){
    /* console.log(tarea.parentElement.parentElement.id.split(':')); */
    var idTarea = tarea.parentElement.parentElement.id.split(':')[1];
    /* console.log(idTarea); */

    /* Información */
    var datos = new FormData();
    datos.append('id', idTarea);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);

    let texto;
    if(estado === 1) {
        texto = "Tarea completada";
    } else {
        texto = "Tarea no completada";
    }

    /* Llamado Ajax */
    var xhr = new XMLHttpRequest();
    /* Abrir conexión */
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);
    /* Recibir estatus */
    xhr.onload = function() {
        if(this.status === 200) {
            let respuesta = JSON.parse(xhr.responseText);
            console.log(JSON.parse(xhr.responseText));
            if(respuesta.respuesta === 'success') {
                Swal.fire({
                    type: respuesta.respuesta,
                    title: respuesta.title,
                    text: texto
                    /* footer: '<a href>Why do I have this issue?</a>' */ 
                })
            }
        }
    }

    /* Envíar datos */
    xhr.send(datos);

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

/* Agregar proyecto a la pagina */ /* Función con guardarProyectoDB */
function agregarProyecto(nombre, id){
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML =  `
        <a href="index.php?id=${id}" id="${id}">
        ${nombre}
        </a>
    `;
    listaProyectos.appendChild(nuevoProyecto);
}


/* Agregar tarea a la pagina */ /* Función con agregarTarea */
function agregarTareaPagina(tarea, id){
    console.log("Agregando " + tarea);
    /* Construir el template */
    var nuevaTarea = document.createElement('li');
    /* agregamos ID */
    nuevaTarea.id = 'tarea:'+id;
    /* Agregar la clase */
    nuevaTarea.classList.add('tarea');
    /* Construir el li*/
    nuevaTarea.innerHTML = `
        <p> ${tarea} </p>
        <div class="acciones">
            <i class="far fa-check-circle"></i>
            <i class="fas fa-trash"></i>
        </div>
    `;

    /* Agregarlo al DOM */
    var listado = document.querySelector('.listado-pendientes ul');
    listado.append(nuevaTarea);

    /* Limpiar formulario */
    document.querySelector('.nombre-tarea').value = '';

}

/* Función para Agregar tarea */
function agregarTarea(e) {
    e.preventDefault();
    var tarea = document.querySelector('.nombre-tarea').value;
    /* console.log("Click en agregar " + tarea); */
    if(tarea === null || tarea === ''){
        Swal.fire({
            type: 'error',
            title: 'Campo vacío',
            text: 'Llenar campo'
            /* footer: '<a href>Why do I have this issue?</a>' */ 
         })
    } else {
        /* El campo tiene algo */
        /* Crear fonrmData */
        var id = document.querySelector('#id_proy').value;
        var datos = new FormData();
        datos.append('tarea', tarea);
        datos.append('accion','crear');
        datos.append('id', id);
        /* LLamado Ajax */
        /* Crear la llamada Ajax */
        var xhr = new XMLHttpRequest();
        /* Abrir la conexión */
        xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);
        /* Ejecutar y respuesta */
        xhr.onload = function(){
            if(this.status === 200) {
                var respuesta = JSON.parse(xhr.responseText);
                //Comprobar los datos que regresa /* console.log(respuesta); */
                var tarea = respuesta.tarea,
                    title = respuesta.title,
                    tipo = respuesta.respuesta,
                    id = respuesta.id_insertado;

                if(respuesta.accion === 'crear' && tipo === 'success') {
                    /* Función para agrega la tarea a la pagina */
                    agregarTareaPagina(tarea, id);

                    /* ALerta de que se guardo */
                    Swal.fire({
                        type: tipo,
                        title: title,
                        text: 'Tarea ' + tarea + ' - Agregada'
                        /* footer: '<a href>Why do I have this issue?</a>' */ 
                    
                    })
                }
            }
        }
        /* Enviar consulta */
        xhr.send(datos);

    }

    return false;
}