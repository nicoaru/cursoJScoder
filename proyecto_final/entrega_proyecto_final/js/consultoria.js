
/* BAJO DATOS BACKEND Y LOS GUARDO EN sessionStorage --> listaTurnosStorage SOLO SI NO HAY DATOS ALLI GUARDADOS.
   ACTUALIZO DATOS DE listaTurnosSesion bajados del sessionStorage */
if(sessionStorage.getItem('listaTurnosStorage') == null) {
  
    getAjaxTurnos(urlListaTurnos, 'listaTurnosStorage');
 }
else {
    listaTurnosSesion = getSessionStorage('listaTurnosStorage');
};






//DEFINO QUE INSTANCIA DEL FORMULARIO SE VA A MOSTRAR
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

    tipoConsulta = $("#tipoConsulta :selected").val();
    
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
        $formSelectConsultora.append($("<option>").text("Disculpa! Hubo un error y no pudimos cargar las consultoras disponibles.").attr('selected', 'true').prop('disabled', true));
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
                tipoConsulta: tipoConsulta,
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
    postAjax([turnoAsignado.id, turnoAsignado.consultanteAsignado], callbakcPostAjaxExitoso, callbakcPostAjaxFallido);
    
    //FUNCION CALLBACK EXITOSA
    function callbakcPostAjaxExitoso() {
        console.log(`La reserva del ${turnoAsignado.id} fue exitosa`);
        for (let turno of listaTurnosSesion) {
            if (turnoAsignado.id == turno.id) {
                //CAMBIO ESTADO DE RESERVA DEL TURNO Y LE ASIGNO CONSULTANTE EN listaTurnosSesion
                turno.reservado = turnoAsignado.reservado;
                turno.consultanteAsignado = turnoAsignado.consultanteAsignado;
                //LO GUARDO EN EL STORAGE
                pushSessionStorage('listaTurnosStorage', listaTurnosSesion);                           
                //SE LO ASIGNO AL CONSULTANTE en el sessionStorage
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
        let titulo = `<h3 class="subtituloSeccion col-12">Confirmacion de reserva de turno</h3>`;
        $('#pantallaConfirmacionTurno').append(titulo);
        let fecha = `<div class='col-12'><h4 class='d-inline'>Fecha: </h4><p class='d-inline'>${turnoAsignado.dia} de ${turnoAsignado.mes} de ${turnoAsignado.año}</p></div>`;
        let hora = `<div class='col-12'><h4 class='d-inline'>Hora: </h4><p class='d-inline'>${turnoAsignado.hora}</p></div>`;
        let consultora = `<div class='col-12'><h4 class='d-inline'>Consultora: </h4><p class='d-inline'>${turnoAsignado.consultora}</p></div>`;
        let btnReservarNuevo = '<div class="col-6 mt-4 text-center boton" id="reservarNuevo">Reservar nuevo turno</div>'
        let btnMisTurnos = '<div class="col-6 mt-4 text-center boton"><a href="mis_turnos.html">Ver mis turnos</a></div>';
        $('#pantallaConfirmacionTurno').append(fecha, hora, consultora, btnReservarNuevo, btnMisTurnos);

    };

    //FUNCION CALLBACK FALLIDA
    function callbakcPostAjaxFallido() {
        console.log(`La reserva del ${turnoAsignado.id} fallo`)
        //DEFINO QUE SE MUESTRE LA PANTALLA DE CONFIRMACION DE TURNO
        $('#formularioDatosPersonales').hide();
        $('#formularioReserva').slideUp('slow', function() {
            $('#pantallaConfirmacionTurno').slideDown('slow');        
        });
        //MUESTRO EN PANTALLA MENSAJE DE ERROR
        $('#pantallaConfirmacionTurno').empty();
        let titulo = `<h3 class="subtituloSeccion col-12">Por el momento no podemos procesar tu reserva de manera correcta, por favor intenta nuevamente en unos minutos</h3>`;
        $('#pantallaConfirmacionTurno').append(titulo);
        let btnReservarNuevo = '<div class="mt-4 text-center boton col-6" id="reservarNuevo">Reservar nuevo turno</div>'
        let btnMisTurnos = '<div class="mt-4 text-center boton col-6"><a href="mis_turnos.html">Ver mis turnos</a></div>';
        $('#pantallaConfirmacionTurno').append(btnReservarNuevo, btnMisTurnos);
    };

});
// FIN EVENTO SUBMIT

/* EVENTO. AL DAR CLICK EN BOTON 'RESERVAR NUEVO TURNO'
   DEFINO QUE SE MUESTRE LA SEGUNDA INSTANCIA DEL FORMULARIO DE RESERVA NUEVAMENTE */
$('#pantallaConfirmacionTurno').on('click', '#reservarNuevo', function() {
    $('#turnosaMostrar').empty();
    $('#formularioDatosPersonales').hide();
    $('#pantallaConfirmacionTurno').slideUp('slow', function() {
        $('#tipoConsulta').empty();
        $('#tipoConsulta').append(`
        <option selected="true" disabled="disabled">Que tipo de consulta queres?</option>
        <option value="natal">Carta natal</option>
        <option value="compuesta">Carta compuesta y Sinastria</option>
        <option value="solar">Revolucion solar, Transitos y Progresiones</option>
        <option value="constelaciones">Constelaciones Familiares</option>`);
        $('#formSelectConsultora').empty();
        $('#formSelectConsultora').append(`<option value="" selected='true' disabled='true'>Elegir consultora</option>`);
        $('#formularioReserva').slideDown('slow');            
    });        
});


