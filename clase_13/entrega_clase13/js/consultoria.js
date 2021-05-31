//  BLA BLA BLA  //

//DECLARACION DE CONSTRUCTORES

class consultoras {
    constructor(nombre, natal, compuesta, solar, constelaciones) {
        this.nombre = nombre;
        this.natal = natal;
        this.compuesta = compuesta;
        this.solar = solar;
        this.constelaciones= constelaciones;
    }
};

class turno {
    constructor(numeroTurno, consultora, dia, mes, año, hora) {
        this.id = ('turno'+numeroTurno);
        this.consultora = consultora;
        this.dia = parseInt(dia);
        this.mes = mes;
        this.año = parseInt(año);
        this.hora = hora;
        this.reservado = false;
        this.consultanteAsignado = null;
    }
}

//DECLARACION OBJETO CONSULTANTE


/* const turnoAsignado = {
    id : null,
    consultora : null,
    dia : null,
    mes : null,
    año : null,
    hora : null,
    reservado : null,
} */



//DECLARACION DE VARIABLES

let listaConsultoras = [];
let listaConsultorasJSON = JSON.stringify(listaConsultoras);
let listaTurnos = [];
let listaTurnosJSON = JSON.stringify(listaTurnos);


//CREACION DE TURNOS 

listaTurnos.push(new turno(1, 'Lucia', 6, 'Mayo', 2021, '10:00'));
listaTurnos.push(new turno(2, 'Lucia', 6, 'Mayo', 2021, '12:00'));
listaTurnos.push(new turno(3, 'Lucia', 6, 'Mayo', 2021, '15:00'));
listaTurnos.push(new turno(4, 'Lucia', 6, 'Mayo', 2021, '17:00'));
listaTurnos.push(new turno(5, 'Lucia', 6, 'Mayo', 2021, '19:00'));
listaTurnos.push(new turno(6, 'Flavia', 6, 'Mayo', 2021, '10:30'));
listaTurnos.push(new turno(7, 'Flavia', 6, 'Mayo', 2021, '12:30'));
listaTurnos.push(new turno(8, 'Flavia', 6, 'Mayo', 2021, '15:30'));
listaTurnos.push(new turno(9, 'Flavia', 6, 'Mayo', 2021, '17:30'));
listaTurnos.push(new turno(10, 'Flavia', 6, 'Mayo', 2021, '19:30'));
    //JSON
    listaTurnosJSON = JSON.stringify(listaTurnos);

//CREACION PERFILES CONSULTORAS
listaConsultoras.push(new consultoras('Lucia', true, true, true, true));
listaConsultoras.push(new consultoras('Flavia', true, false, true, false));
    //JSON
    listaConsultorasJSON = JSON.stringify(listaConsultoras);


// DECLARACION DE FUNCIONES

function getSessionSt(keyname) {
return JSON.parse(sessionStorage.getItem(keyname));
};
function pushSessionSt(keyname, variable) {
    sessionStorage.setItem(keyname, JSON.stringify(variable));
};

//////////////////////////////////////////////////////////////////////


//VARIABLES

let listaTurnosSession;

//BAJO LOS DATOS DE LOS ARCHIVOS JSON Y LOS PARSEO
listaTurnos = JSON.parse(listaTurnosJSON);
listaConsultoras = JSON.parse(listaConsultorasJSON);
//GUARDO listaTurnos EN STORAGE SOLO SI LA LISTA EN STORAGE ESTA VACIA (si tiene datos, no los toco)
if(sessionStorage.getItem('listaTurnosStorage') == null) {
    pushSessionSt('listaTurnosStorage', listaTurnos)
};
//ACTUALIZO listaTurnosSession
listaTurnosSession = getSessionSt('listaTurnosStorage');



//let consultanteSession = JSON.parse(sessionStorage.getItem('consultanteSession'));

//DEFINO QUE INSTNCIA DEL FORMULARIO SE VA A MOSTRAR
if (sessionStorage.getItem('consultanteSession') == null) {
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

$formularioDatosPersonales.on("submit", function(e) {

    e.preventDefault();
    //RECUPERO LOS DATOS DEL USUARIO Y LOS GUARDO DIRECTO EN EL SESSIONSTORAGE
    (function() {
        let storage = {
            nombre: $('#nombre').val(), 
            apellido: $('#apellido').val(),
            telefono: $('#telefono').val(),
            email: $('#email').val(),
            turnosAsignados: [],
        };
    sessionStorage.setItem('consultanteSession', JSON.stringify(storage));

    }) ();

    //DEFINO QUE SE MUESTRE LA SEGUNDA INSTANCIA DEL FORMULARIO DE RESERVA
    $('#formularioDatosPersonales').slideUp('slow', function() {
        $('#formularioReserva').slideDown('slow');        
    });
    $('#pantallaConfirmacionTurno').hide();
});



//TRABAJO SOBRE FORMULARIO DE ELECCION DE TURNOS
const $formSelectConsultora = $("#formSelectConsultora");
    /* EVENTO CUANDO EL USUARIO ELIGE EL TIPO DE CONSULTA
    MUESTRO LAS CONSULTORAS DISPONIBLES PARA EL TIPO DE CONSULTA ELEGIDO*/
$("#tipoConsulta").on("change", function() {

    $formSelectConsultora.empty();
    $('#turnosaMostrar').empty();

    let tipoConsulta = $("#tipoConsulta :selected").val();
    
    (function (tipoTurno) {
        $formSelectConsultora.append($("<option>").text("Elegir consultora").attr('selected', 'true').prop('disabled', true));

        let consultoras = listaConsultoras.filter(elemento => elemento[tipoTurno] == true);
        for (let consultora of consultoras) {
            $formSelectConsultora.append($('<option>').text(consultora.nombre).val(consultora.nombre));
            
        };
    }) (tipoConsulta);

    $formSelectConsultora.prop('disabled', false);
});


    /* EVENTO CUANDO EL USUARIO ELIGE LA CONSULTORA
    MUESTRO LOS TURNOS DISPONIBLES DE ESA CONSULTORA*/

$formSelectConsultora.on("change", function() {
    let consultoraElegida = $('#formSelectConsultora :selected').val();
    $('#turnosaMostrar').empty();
    
    (function (consultora) {
        $('#turnosaMostrar').append(`<legend>Turnos disponibles con ${consultora}</legend>`);

        for (let turno of listaTurnosSession) {
            if ((consultora == turno.consultora) && (turno.reservado == false)) {
                $('#turnosaMostrar').append($('<input/>').attr({'type': 'radio', 'name': 'turnoElegido', 'id': turno.id, 'value': turno.id}).addClass('d-none'), $('<label></label>').attr('for', turno.id).text(`${turno.dia} de ${turno.mes} de ${turno.año} a las ${turno.hora} hs`).addClass('labelTurno d-block'));
            } 
            else {
                continue
            };
        };

    $('input:first-child').prop('required',true);
    }) (consultoraElegida);
});


// EVENTO SUBMIT

$('#formularioReserva').on("submit", function(e) {

    e.preventDefault();

    let turnoElegidoEnFormulario;

    turnoElegidoEnFormulario = $('input:radio[name=turnoElegido]:checked').val()
//  turnoElegidoEnFormulario = $('#turnosaMostrar :checked').val();
    
    let turnoAsignado;

    //RECUPERO LOS DATOS DEL TURNO ELEGIDO Y LO ASIGNO AL CONSULTANTE
    //CAMBIO EL ESTADO DE RESERVA DEL TURNO Y LE ASIGNO CONSULTANTE
    for (let turno of listaTurnosSession) {
        if (turnoElegidoEnFormulario == turno.id) {

            //ARMO NUEVO OBJETO CON DATOS DEL CONSULTANTE PARA ASIGNARLO AL TURNO ELEGIDO
            let consultanteAsignado = {
                nombre: JSON.parse(sessionStorage.getItem('consultanteSession')).nombre,
                apellido: JSON.parse(sessionStorage.getItem('consultanteSession')).apellido,
                telefono: JSON.parse(sessionStorage.getItem('consultanteSession')).telefono,
                email: JSON.parse(sessionStorage.getItem('consultanteSession')).email,
            };                
            //CAMBIO ESTADO DE RESERVA DEL TURNO Y LE ASIGNO CONSULTANTE 
            turno.reservado = true;
            turno.consultanteAsignado = consultanteAsignado;
            //LO GUARDO EN EL STORAGE
            pushSessionSt('listaTurnosStorage', listaTurnosSession);
                        
            //
            turnoAsignado = {
            id: turno.id,
            consultora: turno.consultora,
            dia: turno.dia,
            mes: turno.mes,
            año: turno.año,
            hora: turno.hora,
            reservado: turno.reservado,
            };
            (function() {
                let storageConsultante = getSessionSt('consultanteSession');
                storageConsultante.turnosAsignados.push(turnoAsignado);
                pushSessionSt('consultanteSession', storageConsultante);
            }) ();
            break;
        }

        else { 
            continue;
        }
    };
    console.log(listaTurnosSession);
    console.log(JSON.parse(sessionStorage.getItem('consultanteSession')));


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
    let boton = '<div class="mt-4 text-center boton">Reservar nuevo turno</div>'
    $('#pantallaConfirmacionTurno').append(titulo, fecha, hora, consultora, boton);
    
    //DEFINO QUE SE MUESTRE LA SEGUNDA INSTANCIA DEL FORMULARIO DE RESERVA
    $('#pantallaConfirmacionTurno').on('click', function() {
        $('#turnosaMostrar').empty();
        $('#formularioDatosPersonales').hide();
        $('#pantallaConfirmacionTurno').slideUp('slow', function() {
            $('#formularioReserva').slideDown('slow');            
        });        
    });



});
// FIN EVENTO SUBMIT