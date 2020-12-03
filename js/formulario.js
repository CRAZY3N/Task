'use strict'

addEventListener();

function addEventListener(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}



/* Funciones */
function validarRegistro(e){
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;
        

        /* Validar */
        if(usuario === '' || password === ''){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Falto llenar uno o los dos campos!'
                /* footer: '<a href>Why do I have this issue?</a>' */ 
            })
        } else {
            /* Ambos campos */
            var datos = new FormData();
            datos.append('usuario', usuario);
            datos.append('password', password);
            datos.append('accion', tipo);
            /* console.log(datos); */ /* Comprobar que se creo correctamente el forData */ /*obtener algún campo console.log(datos.get('usuario')); */
            
            /* LLamado de ajax */
            /* Crear objeto */
            var xhr = new XMLHttpRequest();
            /* Abrir conexión */
            xhr.open('POST', 'inc/modelos/modelo-admin.php', true);
            /* Leer respuesta */
            xhr.onload = function(){
                if (this.status === 200){
                    console.log(JSON.parse(xhr.responseText));
                    var respuesta = JSON.parse(xhr.responseText);
                    if (respuesta.respuesta === 'correcto'){
                        if (respuesta.tipo === 'crear'){
                            /* Alerta de usuario creado */
                            Swal.fire({
                                type: 'success',
                                title: 'Usuario creado',
                                text: 'Bienvenido ' + usuario + 'Por favor ingresa'
                                /* footer: '<a href>Why do I have this issue?</a>' */ 
                             })
                        } else if (respuesta.tipo === 'login') {
                            /* Login */
                            Swal.fire({
                                type: 'success',
                                title: 'Logeando',
                                text: respuesta.mensaje
                                /* footer: '<a href>Why do I have this issue?</a>' */ 
                             })
                             /* Hacer algo, después de mostrar la alerta */
                             .then(resultado => {
                                 if(resultado.value){
                                     window.location.href = 'index.php';
                                 }
                             })
                        }
                    }  else {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: respuesta.mensaje
                            /* footer: '<a href>Why do I have this issue?</a>' */ 
                         })
                    }
                }
            }
            /* Enviar datos */
            xhr.send(datos);
            /* ALerta de correcto */
            /* Swal.fire({
                type: 'success',
                title: 'Ok...',
                text: usuario + ' Hi!' */
                /* footer: '<a href>Why do I have this issue?</a>' */ 
            /* }) */
        }

}