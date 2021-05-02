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

const consultanteSession = {
    nombre: null,
    apellido: null,
    telefono: null,
    email: null,
    turnosAsignados: [],
};

const turnoAsignado = {
    id : null,
    consultora : null,
    dia : null,
    mes : null,
    año : null,
    hora : null,
    reservado : null,
}


// DECLARACION DE FUNCIONES


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





//////////////////////////////////////////////////////////////////////





//BAJO LOS DATOS DE LOS ARCHIVOS JSON Y LOS PARSEO
listaTurnos = JSON.parse(listaTurnosJSON);
listaConsultoras = JSON.parse(listaConsultorasJSON);

//VARIABLES



//TRABAJO SOBRE FORMULARIO DATOS PERSONALES



/* EVENTO CUANDO EL USUARIO ELIGE EL TIPO DE CONSULTA
MUESTRO LAS CONSULTORAS DISPONIBLES PARA EL TIPO DE CONSULTA ELEGIDO*/

const $formSelectConsultora = $("#formSelectConsultora");

$("#tipoConsulta").on("change", function() {
    $formSelectConsultora.empty();
    $('#turnosaMostrar').empty();

    let tipoConsulta = $("#tipoConsulta :selected").val();
    
    (function (tipoTurno) {

        $formSelectConsultora.append($("<option>").text("Elegir consultora").attr('selected', 'true').prop('disabled', true));
        
        let consultoras = (JSON.parse(listaConsultorasJSON)).filter(elemento => elemento[tipoTurno] == true);
        for (let consultora of consultoras) {
            $formSelectConsultora.append($('<option>').text(consultora.nombre).val(consultora.nombre));
            
        };
    }) (tipoConsulta);

    $formSelectConsultora.prop('disabled', false);
});


// EVENTO CUANDO EL USUARIO ELIGE LA CONSULTORA
// MUESTRO LOS TURNOS DISPONIBLES DE ESA CONSULTORA


$formSelectConsultora.on("change", function() {
    let consultoraElegida = $('#formSelectConsultora :selected').val();
    $('#turnosaMostrar').empty();
    
    (function (consultora) {
        $('#turnosaMostrar').append(`<legend>Turnos disponibles con ${consultora}</legend>`);

        for (let turno of listaTurnos) {
            if (consultora == turno.consultora) {
                $('#turnosaMostrar').append($('<input/>').attr({'type': 'radio', 'name': 'turnoElegido', 'id': turno.id, 'value': turno.id}).addClass('d-none'), $('<label></label>').attr('for', turno.id).text(`${turno.dia} de ${turno.mes} de ${turno.año} a las ${turno.hora} hs`).addClass('labelTurno d-block'));
            } 
            else {
                continue
            };
        };
    }) (consultoraElegida);
});


// EVENTO SUBMIT

document.querySelector("#formularioReserva").addEventListener("submit", function(e) {

    e.preventDefault();

    let turnoElegidoEnFormulario;
    turnoElegidoEnFormulario = $('#turnosaMostrar :checked').val();

    //RECUPERO LOS DATOS DEL TURNO ELEGIDO, COMO OBJETO
    //
    for (let turno of listaTurnos) {
        if (turnoElegidoEnFormulario == turno.id) {
            turno.reservado = true;
            turno.consultanteAsignado = consultanteSession;
            turnoAsignado.id = turno.id;
            turnoAsignado.consultora = turno.consultora;
            turnoAsignado.dia = turno.dia;
            turnoAsignado.mes = turno.mes;
            turnoAsignado.año = turno.año;
            turnoAsignado.hora = turno.hora;
            turnoAsignado.reservado = turno.reservado;
            break;
        }
        else { 
            continue;
        }
    }
    console.log(turnoAsignado);
    console.log(listaTurnos);


    //RECUPERO LOS DATOS DEL USUARIO, LOS GUARDO COMO OBJETO Y LE ASIGNO EL TURNO
    consultanteSession.nombre = $('#nombre').val();
    consultanteSession.apellido = $('#apellido').val();
    consultanteSession.telefono = $('#telefono').val();
    consultanteSession.email = $('#email').val();
    consultanteSession.turnosAsignados.push(turnoAsignado);

 

    console.log(consultanteSession);
    console.log(listaTurnos);

    // GUARDA DATOS DE USUARIO (objeto consultanteSession) EN EL SESSION STORAGE
    sessionStorage.setItem('consultanteSession', JSON.stringify(consultanteSession));

    // ACTUALIZA ARCHIVO JSON
    listaTurnosJSON = JSON.stringify(listaTurnos);

});


// FIN EVENTO SUBMIT



