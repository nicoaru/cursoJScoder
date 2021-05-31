    //funciones
function chequearDatosPersonalesyMostrar() {
    if(sessionStorage.getItem('consultanteSesion') != null) {
        $('#conDatosPersonales').show();
        $('#sinDatosPersonales').hide();
    
        $('#conDatosPersonales #datoNombre .dato').empty();
        $('#conDatosPersonales #datoNombre .dato').append(`${JSON.parse(sessionStorage.getItem('consultanteSesion')).nombre} ${JSON.parse(sessionStorage.getItem('consultanteSesion')).apellido}`);
        $('#conDatosPersonales #datoTelefono .dato').empty();
        $('#conDatosPersonales #datoTelefono .dato').append(`${JSON.parse(sessionStorage.getItem('consultanteSesion')).telefono}`);
        $('#conDatosPersonales #datoEmail .dato').empty();    
        $('#conDatosPersonales #datoEmail .dato').append(`${JSON.parse(sessionStorage.getItem('consultanteSesion')).email}`);
    }
    else {
        $('#conDatosPersonales').hide();
        $('#sinDatosPersonales').show();
    }
};

function chequaerTurnosyMostrar() {
    if((sessionStorage.getItem('consultanteSesion') == null) || ((JSON.parse(sessionStorage.getItem('consultanteSesion'))).turnosAsignados.length == 0)) {
        $('#conTurnos').hide();
        $('#sinTurnos').show();
    }
    else {
        $('#conTurnos').show();
        $('#sinTurnos').hide();
    
        $('#turnosMostrados').empty();

        let turnosReservados = JSON.parse(sessionStorage.getItem('consultanteSesion')).turnosAsignados;
        
        for (let turno of turnosReservados) {
            let tipoConsulta;
            switch (turno.tipoConsulta) {
                case "natal": 
                    tipoConsulta = "Carta natal";
                break;
                case "compuesta":
                    tipoConsulta = "Carta compuesta y sinastria";
                break;
                case "solar":
                    tipoConsulta = "Revolucion solar, transitos y progresiones";
                break;
                case "constelaciones":
                    tipoConsulta = "Constelaciones familiares";
                break;
            };

            $('#turnosMostrados').append(`<div id="${turno.id}" class="turnoaMostrar row">            
            <div class="col-10">    
                <div><span class="negrita">Consultora:</span> ${turno.consultora}</div>
                <div><span class="negrita">Fecha:</span> ${turno.dia} de ${turno.mes} de ${turno.año}</div>
                <div><span class="negrita">Hora:</span> ${turno.hora} hs</div>
                <div><span class="negrita">Tipo de consulta:</span> ${tipoConsulta}</div>
            </div>
            <div class="col-2 align-self-center"><img src="../recursos/closePop.png" class="btnDeleteTurno" alt="" width="25px" height="25px"></div>
            </div>`
            );            
        }; 
    }
};

/* BAJO DATOS BACKEND Y LOS GUARDO EN sessionStorage --> listaTurnosStorage SOLO SI NO HAY DATOS ALLI GUARDADOS.
ACTUALIZO DATOS DE listaTurnosSesion bajados del sessionStorage */
   if(sessionStorage.getItem('listaTurnosStorage') == null) {
  
    getAjaxTurnos(urlListaTurnos, 'listaTurnosStorage');
 }
else {
    listaTurnosSesion = getSessionStorage('listaTurnosStorage');
};



    // ---------------------------------- //



    // SECCION 'MIS DATOS'
    
    // QUÉ SE MUESTRA AL CARGAR LA PAGINA
chequearDatosPersonalesyMostrar();

    // EVENTO click --> btn "modificar datos" --> salta el popup
$('#btnModificarDatosPersonales').on('click', function() {
    $('#containerPopUpDatos').show()
    $('#nombre').attr('value', `${JSON.parse(sessionStorage.getItem('consultanteSesion')).nombre}`);
    $('#apellido').attr('value', `${JSON.parse(sessionStorage.getItem('consultanteSesion')).apellido}`);
    $('#telefono').attr('value', `${JSON.parse(sessionStorage.getItem('consultanteSesion')).telefono}`);
    $('#email').attr('value', `${JSON.parse(sessionStorage.getItem('consultanteSesion')).email}`);
});

    // EVENTO click --> btn "cargar mis datos!" --> salta el popup
$('#btnCargarDatosPersonales').on('click', function() {
    $('#containerPopUpDatos').show()
});

    // EVENTO submit --> btn "actualizar datos" dentro del popup de modificar datos
$('#formularioDatosPersonalesPopUp').on('submit', function(e) {
    e.preventDefault();
    // recupero los nuevos datos del usuario y los guardo en sessionStorage
    if (sessionStorage.getItem('consultanteSesion') == null) {
        let storage = {
            nombre: $('#nombre').val(), 
            apellido: $('#apellido').val(),
            telefono: $('#telefono').val(),
            email: $('#email').val(),
            turnosAsignados: [],
        };
        sessionStorage.setItem('consultanteSesion', JSON.stringify(storage));
    }
    else {
        let consultanteSesionStorage = JSON.parse(sessionStorage.getItem('consultanteSesion'));
        consultanteSesionStorage.nombre = $('#nombre').val();
        consultanteSesionStorage.apellido = $('#apellido').val();
        consultanteSesionStorage.telefono = $('#telefono').val();
        consultanteSesionStorage.email = $('#email').val();
        sessionStorage.setItem('consultanteSesion', JSON.stringify(consultanteSesionStorage));
    };

    // actualizo los datos que se muestran en "Mis datos"
    chequearDatosPersonalesyMostrar();
    $('#containerPopUpDatos').hide()
});


//------------------------------------//

// SECCION 'MIS TURNOS'
    // QUÉ SE MUESTRA AL CARGAR LA PAGINA
    chequaerTurnosyMostrar();

    // EVENTOS "RESERVAR TURNO" y "RESERVAR NUEVO TURNO" click --> btnReservarTurno --> salta el pop-up
$('.btnReservarTurno').on('click', function() {
    if(sessionStorage.getItem('consultanteSesion') == null) {
        alert('Primeramente completa tus datos personales. Luego, podras reservar los turnos que desees!');
    }
    else {
        $('#containerPopUpTurnos').show();
        $('#formularioReservaPopUp').show();
        $('#confirmacionReservaPopUp').hide();
        //LIMPIO DATOS VIEJOS
        $('#turnosaMostrar').empty();
        $('#tipoConsulta').empty();
        $('#tipoConsulta').append(`
        <option selected="true" disabled="disabled">Que tipo de consulta queres?</option>
        <option value="natal">Carta natal</option>
        <option value="compuesta">Carta compuesta y Sinastria</option>
        <option value="solar">Revolucion solar, Transitos y Progresiones</option>
        <option value="constelaciones">Constelaciones Familiares</option>`);
        $('#formSelectConsultora').empty();
        $('#formSelectConsultora').append(`<option value="" selected='true' disabled='true'>Elegir consultora</option>`);
    };

});

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

$('#formularioReservaPopUp').on("submit", function(e) {

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
    //ARMO NUEVO OBJETO turnoAsignado PARA ASIGNARLO AL CONSULTANTE Y MANDAR DATOS POR AJAX AL BACKEND
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
    let datoAjax = [turnoAsignado.id, turnoAsignado.reservado, turnoAsignado.consultanteAsignado];
    postAjax(datoAjax, callbakcPostAjaxExitoso, callbakcPostAjaxFallido);
    
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
        //muestro pantalla confirmacion de turno
        $('#formularioReservaPopUp').hide();
        $('#confirmacionReservaPopUp').show();
        $('#confirmacionReservaPopUp').contents(':not(".close-pop")').remove();
        // $('#confirmacionReservaPopUp div').slice(1).remove();

        let titulo = `<h3 class="subtituloSeccion col-12">Tu turno se ha reservado con exito!</h3>`;
        $('#confirmacionReservaPopUp').append(titulo)
        // actualizo los turnos que se muestran en "Mis turnos"
        chequaerTurnosyMostrar();

    };

    //FUNCION CALLBACK FALLIDA
    function callbakcPostAjaxFallido() {
        console.log(`La reserva del ${turnoAsignado.id} fallo`)
        //muestro pantalla confirmacion de turno
        $('#formularioReservaPopUp').hide();
        $('#confirmacionReservaPopUp').show();
        $('#confirmacionReservaPopUp').contents(':not(".close-pop")').remove();
        let titulo = `<h3 class="subtituloSeccion col-12">Por el momento no podemos procesar tu reserva de manera correcta, por favor intenta nuevamente en unos minutos</h3>`;
        $('#confirmacionReservaPopUp').append(titulo)
        chequaerTurnosyMostrar();
    };

});
    // FIN EVENTO SUBMIT


    // EVENTO CANCELAR TURNO --> click boton "btnDeleteTurno" en cada turno --> elimina el turno
$('#turnosMostrados').on('click', '.btnDeleteTurno', function() {
    console.log("se disparo el evento cancelar turno");

    let idTurnoaEliminar = $(this).parent().parent().attr('id');

    // LLAMADA AJAX
    let datoAjax = [listaTurnosSesion[listaTurnosSesion.findIndex((element) => element.id == idTurnoaEliminar)].id, false, null];
    console.log('Se mando el siguiente dato al back-end ');
    console.log(datoAjax);
    postAjax(datoAjax, callbakcPostAjaxExitoso, callbakcPostAjaxFallido);
    
    //FUNCION CALLBACK EXITOSA
    function callbakcPostAjaxExitoso() {
        // CAMBIO ESTADO DE RESERVA DEL TURNO CANCELADO Y LO GUARDO EN EL STORAGE
        for (let turno of listaTurnosSesion) {
            if (turno.id == idTurnoaEliminar) {
                turno.reservado = false;
                console.log(`se cambio a false el estado del ${turno.id}`)            
                turno.consultanteAsignado = null;
                console.log(`se des-asigno consultante al ${turno.id}`);
                break;
            }
            else {
                continue;
            }
        };
        pushSessionStorage('listaTurnosStorage', listaTurnosSesion);         
        //QUITO TURNO AL CONSULTANTE Y LO ACTUALIZO EN EL STORAGE
        let consultanteStorage = JSON.parse(sessionStorage.getItem('consultanteSesion'));
        let indexTurnoaCancelar = consultanteStorage.turnosAsignados.findIndex((element) => element.id == idTurnoaEliminar);
        if (indexTurnoaCancelar != -1) {
            consultanteStorage.turnosAsignados.splice(indexTurnoaCancelar, 1);
        }
        else {
            alert('Si bien el turno se cancelo, hubo un error al intentar borrarlo de la pantalla "Mis Turnos"');
        }; 
        pushSessionStorage('consultanteSesion', consultanteStorage);
        // actualizo los turnos que se muestran en "Mis turnos"
        $(`#${idTurnoaEliminar}`).slideUp('slow', function() {
            chequaerTurnosyMostrar();
        });
    };  

    //FUNCION CALLBACK FALLIDA
    function callbakcPostAjaxFallido() {
        alert('Por el momento no podemos procesar la cancelacion del turno. Por favor intentalo nuevamente en unos minutos. Gracias');
    };
});


//


// EVENTOS GENERALES
    // EVENTO click --> btn close-pop
    $('.close-pop').on('click', function() {
        $('.close-pop').parents('.containerPopUp').hide();
    });