
/* BAJO DATOS BACKEND Y LOS GUARDO EN sessionStorage --> listaTurnosStorage SOLO SI NO HAY DATOS ALLI GUARDADOS.
   ACTUALIZO DATOS DE listaTurnosSesion bajados del sessionStorage */
if(sessionStorage.getItem('listaTurnosStorage') == null) {
  
    getAjaxTurnos(urlListaTurnos, 'listaTurnosStorage');
 }
else {
    listaTurnosSesion = getSessionStorage('listaTurnosStorage');
};
//ACTUALIZO listaTurnosSesion
//listaTurnosSesion = getSessionStorage('listaTurnosStorage');





//DEFINO QUE INSTNCIA DEL FORMULARIO SE VA A MOSTRAR
if (sessionStorage.getItem('consultanteSesion') == null) {
    $('#formularioDatosPersonales').show();
    $('#formularioReserva').hide();
    $('#pantallaConfirmacionTurno').hide();
}
else {
    $('#formularioDatosPersonales').hide();
    $('#formularioReserva').show();
    $('#pantallaConfirmacionTurno').hide();
};


//TRABAJO SOBRE FORMULARIO DATOS PERSONALES
const $formularioDatosPersonales = $("#formularioDatosPersonales")
//EVENTO SUBMIT
$formularioDatosPersonales.on("submit", function(e) {
    e.preventDefault();
    //RECUPERO LOS DATOS DEL USUARIO EN UN OBJETO Y LOS GUARDO DIRECTO EN EL SESSIONSTORAGE
    (function() {
        let storage = {
            nombre: $('#nombre').val(), 
            apellido: $('#apellido').val(),
            telefono: $('#telefono').val(),
            email: $('#email').val(),
            turnosAsignados: [],
        };
    sessionStorage.setItem('consultanteSesion', JSON.stringify(storage));
    }) ();

    //DEFINO QUE SE MUESTRE LA SEGUNDA INSTANCIA DEL FORMULARIO DE RESERVA
    $('#formularioDatosPersonales').slideUp('slow', function() {
        $('#formularioReserva').slideDown('slow');        
    });
    $('#pantallaConfirmacionTurno').hide();
});
//

//TRABAJO SOBRE FORMULARIO DE ELECCION DE TURNOS
const $formSelectConsultora = $("#formSelectConsultora");
/* EVENTO. CUANDO EL USUARIO ELIGE EL TIPO DE CONSULTA
   MUESTRO LAS CONSULTORAS DISPONIBLES PARA EL TIPO DE CONSULTA ELEGIDO*/
$("#tipoConsulta").on("change", function() {

    $formSelectConsultora.empty();
    $('#turnosaMostrar').empty();

    let tipoConsulta = $("#tipoConsulta :selected").val();
    
    // LLAMADA AJAX //
    getAjaxConsultoras(urlListaConsultoras, callBackAjaxConsultoraExitosa, tipoConsulta, callBackAjaxConsultoraFallida);

    function callBackAjaxConsultoraExitosa(tipoTurno, listaConsultoras) {
        $formSelectConsultora.append($("<option>").text("Elegir consultora").attr('selected', 'true').prop('disabled', true));

        let consultoras = listaConsultoras.filter(elemento => elemento[tipoTurno] == true);
        for (let consultora of consultoras) {
            $formSelectConsultora.append($('<option>').text(consultora.nombre).val(consultora.nombre));
        };
    $formSelectConsultora.prop('disabled', false);        
    };

    function callBackAjaxConsultoraFallida() {
        $formSelectConsultora.append($("<option>").text("Disculpa! Hubo un error y no pudimos cargar los turnos.").attr('selected', 'true').prop('disabled', true));
    };
});


/* EVENTO. CUANDO EL USUARIO ELIGE LA CONSULTORA
   MUESTRO LOS TURNOS DISPONIBLES DE ESA CONSULTORA */

$formSelectConsultora.on("change", function() {
    let consultoraElegida = $('#formSelectConsultora :selected').val();
    $('#turnosaMostrar').empty();
    
    (function (consultora) {
        $('#turnosaMostrar').append(`<legend>Turnos disponibles con ${consultora}</legend>`);

        for (let turno of listaTurnosSesion) {
            if ((consultora == turno.consultora) && (turno.reservado == false)) {
                $('#turnosaMostrar').append($('<input/>').attr({'type': 'radio', 'name': 'turnoElegido', 'id': turno.id, 'value': turno.id}).addClass('d-none'), $('<label></label>').attr('for', turno.id).text(`${turno.dia} de ${turno.mes} de ${turno.año} a las ${turno.hora} hs`).addClass('labelTurno d-block'));
            } 
            else {
                continue
            };
        };
        $("#turnosaMostrar input").first().prop("checked", true);
    }) (consultoraElegida);
});


// EVENTO SUBMIT

$('#formularioReserva').on("submit", function(e) {

    e.preventDefault();

    let turnoElegidoEnFormulario = $('input:radio[name=turnoElegido]:checked').val()
    let turnoAsignado;
    let consultanteAsignado;
    //ARMO NUEVO OBJETO CON DATOS DEL CONSULTANTE PARA ASIGNARLO AL TURNO ELEGIDO
    consultanteAsignado = {
        nombre: JSON.parse(sessionStorage.getItem('consultanteSesion')).nombre,
        apellido: JSON.parse(sessionStorage.getItem('consultanteSesion')).apellido,
        telefono: JSON.parse(sessionStorage.getItem('consultanteSesion')).telefono,
        email: JSON.parse(sessionStorage.getItem('consultanteSesion')).email,
    };               
    //ARMO NUEVO OBJETO turnoAsignado PARA MANDARLO AL BACKEND POR AJAX
    for (let turno of listaTurnosSesion) {
        if (turnoElegidoEnFormulario == turno.id) {
            turnoAsignado = {
                id: turno.id,
                consultora: turno.consultora,
                dia: turno.dia,
                mes: turno.mes,
                año: turno.año,
                hora: turno.hora,
                reservado: true,
                consultanteAsignado : consultanteAsignado,
            };
            break;
        }
        else { 
            continue;
        }
    };

    //LLAMADA AJAX
    postAjax(turnoAsignado.id, callbakcPostAjaxExitoso, callbakcPostAjaxFallido);
    
    //FUNCION CALLBACK EXITOSA
    function callbakcPostAjaxExitoso() {
        for (let turno of listaTurnosSesion) {
            if (turnoAsignado.id == turno.id) {
                //CAMBIO ESTADO DE RESERVA DEL TURNO Y LE ASIGNO CONSULTANTE EN listaTurnosSesion
                turno.reservado = turnoAsignado.reservado;
                turno.consultanteAsignado = turnoAsignado.consultanteAsignado;
                //LO GUARDO EN EL STORAGE
                pushSessionStorage('listaTurnosStorage', listaTurnosSesion);                           
                //SE LO ASIGNO AL CONSULTANTE
                (function() {
                    let storageConsultante = getSessionStorage('consultanteSesion');
                    storageConsultante.turnosAsignados.push(turnoAsignado);
                    pushSessionStorage('consultanteSesion', storageConsultante);
                }) ();
                break;
            }
            else { 
                continue;
            }
        };
        console.log(listaTurnosSesion);
        console.log(JSON.parse(sessionStorage.getItem('consultanteSesion')));
        //DEFINO QUE SE MUESTRE LA PANTALLA DE CONFIRMACION DE TURNO
        $('#formularioDatosPersonales').hide();
        $('#formularioReserva').slideUp('slow', function() {
            $('#pantallaConfirmacionTurno').slideDown('slow');        
        });
        //MUESTRO EN PANTALLA DATOS DEL TURNO RESERVADO
        $('#pantallaConfirmacionTurno').empty();
        let titulo = `<h3 class="subtituloSeccion">Confirmacion de reserva de turno</h3>`;
        $('#pantallaConfirmacionTurno').append(titulo);
        let fecha = `<div><h4 class='d-inline'>Fecha: </h4><p class='d-inline'>${turnoAsignado.dia} de ${turnoAsignado.mes} de ${turnoAsignado.año}</p></div>`;
        let hora = `<div><h4 class='d-inline'>Hora: </h4><p class='d-inline'>${turnoAsignado.hora}</p></div>`;
        let consultora = `<div><h4 class='d-inline'>Consultora: </h4><p class='d-inline'>${turnoAsignado.consultora}<p class='d-inline'></div>`;
        let boton = '<div class="mt-4 text-center boton" id="reservarNuevo">Reservar nuevo turno</div>'
        $('#pantallaConfirmacionTurno').append(fecha, hora, consultora, boton);
    };

    //FUNCION CALLBACK FALLIDA
    function callbakcPostAjaxFallido() {
        //DEFINO QUE SE MUESTRE LA PANTALLA DE CONFIRMACION DE TURNO
        $('#formularioDatosPersonales').hide();
        $('#formularioReserva').slideUp('slow', function() {
            $('#pantallaConfirmacionTurno').slideDown('slow');        
        });
        //MUESTRO EN PANTALLA DATOS DEL TURNO RESERVADO
        $('#pantallaConfirmacionTurno').empty();
        let titulo = `<h3 class="subtituloSeccion">Por el momento no podemos procesar tu reserva de manera correcta, por favor intenta nuevamente en unos minutos</h3>`;
        $('#pantallaConfirmacionTurno').append(titulo);
        let boton = '<div class="mt-4 text-center boton" id="reservarNuevo">Reservar nuevo turno</div>'
        $('#pantallaConfirmacionTurno').append(boton);
    };

});
// FIN EVENTO SUBMIT

/* EVENTO. AL DAR CLICK EN BOTON 'RESERVAR NUEVO TURNO'
   DEFINO QUE SE MUESTRE LA SEGUNDA INSTANCIA DEL FORMULARIO DE RESERVA NUEVAMENTE */
$('#pantallaConfirmacionTurno').on('click', '#reservarNuevo', function() {
    $('#turnosaMostrar').empty();
    $('#formularioDatosPersonales').hide();
    $('#pantallaConfirmacionTurno').slideUp('slow', function() {
        $('#formularioReserva').slideDown('slow');            
    });        
});