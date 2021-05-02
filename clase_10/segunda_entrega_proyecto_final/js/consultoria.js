//DECLARACION DE CONSTRUCTORES
class consultante {
    constructor(id, nombre, apellido, telefono, email, turno) {
        this.id = (id);
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.turnoAsignado = turno;
    }
};

class consultora {
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
        this.ocupado = false;
        this.consultanteAsignado = null;
    }
    reservar() {
        this.ocupado = true;
    }
}


// DECLARACION DE FUNCIONES



//DECLARACION DE VARIABLES
let nombre;
let apellido;
let edad;
let email;
let telefono;
let pais;

let usuarioIngresado;
let turnoaReservar;

let listaConsultantes = [];
let listaConsultantesJSON;
let listaConsultoras = [];
let listaConsultorasJSON;
let listaTurnos = [];
let listaTurnosJSON;

listaConsultantesJSON = JSON.stringify(listaConsultantes);

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

listaTurnosJSON = JSON.stringify(listaTurnos);

//CREACION PERFILES CONSULTORAS
listaConsultoras.push(new consultora('Lucia', true, true, true, true));
listaConsultoras.push(new consultora('Flavia', true, false, true, false));

listaConsultorasJSON = JSON.stringify(listaConsultoras);


//OFREZCO TURNOS PARA QUE ELIJA Y RESERVO EL ELEGIDO
// turnoaReservar = prompt('Estos son los turnos disponibles: '+arrayids.join(", ")+'. Selecciona uno de ellos');
// alert('Elegiste el turno: '+turnoaReservar);

// for (let turno of listaTurnos) {
//     if (turnoaReservar === (turno.id)) {
//         turno.reservar();
//         alert('El '+turno.id+' fue reservado: '+turno.ocupado);
//         console.log(turno.id+' ocupado: '+turno.ocupado);
//         break;
//     }
//     else if (turno.id === ((listaTurnos[listaTurnos.length - 1]).id)) {
//         alert('No seleccionaste ningun turno valido');
//         break;
//     }
//     else {
//         continue;
//     }
// };



// EVENTO CUANDO EL USUARIO ELIGE EL TIPO DE CONSULTA
// MUESTRO LAS CONSULTORAS DISPONIBLES PARA EL TIPO DE CONSULTA ELEGIDO

document.querySelector("#tipoConsulta").addEventListener("change", function() {

    document.querySelector("#consultoraElegida").innerHTML = '';

    let tipoConsulta = document.querySelector("#tipoConsulta").options[document.querySelector("#tipoConsulta").selectedIndex].value;
    
    (function (tipoTurno) {
        let optionDefault = document.createElement("option");
        optionDefault.selected = 'true';
        optionDefault.disabled = 'disabled';
        document.querySelector("#consultoraElegida").appendChild(optionDefault);
        
        let consultoras = (JSON.parse(listaConsultorasJSON)).filter(elemento => elemento[tipoTurno] == true);
        for (let consultora of consultoras) {
            let optionaMostrar = document.createElement("option");
            optionaMostrar.text = `${consultora.nombre}`;
            optionaMostrar.value = `${consultora.nombre}`;
            document.querySelector("#consultoraElegida").appendChild(optionaMostrar);
        };
    }) (tipoConsulta);

    document.querySelector("#consultoraElegida").classList.replace('d-none', 'd-block');
});


// EVENTO CUANDO EL USUARIO ELIGE LA CONSULTORA
// MUESTRO LOS TURNOS DISPONIBLES DE ESA CONSULTORA

const contenedorTurnosaMostrar = document.createElement("div");

document.querySelector("#consultoraElegida").addEventListener("change", function() {


    let consultoraElegida = document.querySelector("#consultoraElegida").options[document.querySelector("#consultoraElegida").selectedIndex].value;
    
    function mostrarTurnos(consultora) {

        contenedorTurnosaMostrar.innerHTML = `<legend>Turnos disponibles con ${consultora}</legend>`;
        document.querySelector("#turnosaMostrar").appendChild(contenedorTurnosaMostrar);

        for (let turno of (JSON.parse(listaTurnosJSON))) {
            if (consultora == turno.consultora) {
                contenedorTurnosaMostrar.insertAdjacentHTML('beforeend', `<input type="radio" name="turnoElegido" id="${turno.id}" value="${turno.id}"/>
                <div>${turno.dia} de ${turno.mes} de ${turno.año} a las ${turno.hora} hs</div>`);
                document.querySelector("#turnosaMostrar").appendChild(contenedorTurnosaMostrar);
            } 
            else {
                continue
            };
        };
    };
    mostrarTurnos(consultoraElegida);
});


// EVENTO SUBMIT
const contenedorConfirmacionReserva = document.createElement("div");

document.querySelector("#formularioReserva").addEventListener("submit", funcionSubmit);

function funcionSubmit(e) {
    e.preventDefault();
    let formulario = e.target;

    // GUARDA DATOS EN EL STORAGE
    sessionStorage.setItem("nombre", document.querySelector("#nombre").value);
    sessionStorage.setItem("apellido", document.querySelector("#apellido").value);
    sessionStorage.setItem("telefono", document.querySelector("#telefono").value);
    sessionStorage.setItem("email", document.querySelector("#email").value);
    sessionStorage.setItem("turnoElegido", document.querySelector("#formularioReserva").turnoElegido.value);
  
    // console logs
    console.log(document.querySelector("#nombre").value); 
    console.log(document.querySelector("#apellido").value); 
    console.log(document.querySelector("#telefono").value); 
    console.log(document.querySelector("#email").value); 
    console.log(document.querySelector("#formularioReserva").turnoElegido.value); 


    // RECUPERA DATOS DEL STORAGE, CREA CONSULTANTE, Y LO VINCULA CON EL TURNO

    listaTurnos = JSON.parse(listaTurnosJSON);
    listaConsultantes =JSON.parse(listaConsultantesJSON);
    let idConsultante; 

    // TRABAJA SOBRE EL CONSULTANTE
    (function () {
        listaConsultantes.push(new consultante(`${sessionStorage.getItem('nombre')} ${sessionStorage.getItem('apellido')}`, sessionStorage.getItem('nombre'), sessionStorage.getItem('apellido'), sessionStorage.getItem('telefono'), sessionStorage.getItem('email'), sessionStorage.getItem('turnoElegido')));
        console.log(listaConsultantes);

        for (let consultante of listaConsultantes) {
            if (consultante.turnoAsignado == sessionStorage.getItem('turnoElegido')) {
                idConsultante = consultante.id;
                console.log("El id del consultante que reservo es "+consultante.id)
                break;
            }
            else if (consultante.id == ((listaConsultantes[listaConsultantes.length - 1]).id)) {
                alert("Hubo un error aparentemente");
                break;
            }
            else {
                continue;
            }
        }

    }) ();

    // TRABAJA SOBRE EL TURNO
    (function () {
        for (let turno of listaTurnos) {
            if (turno.id == sessionStorage.getItem('turnoElegido')) {
                turno.ocupado = true;
                turno.consultanteAsignado = idConsultante;
                console.log(turno.id+' ocupado: '+turno.ocupado+". Fue asignado a "+turno.consultanteAsignado);
                break;
            }
            else if (turno.id === ((listaTurnos[listaTurnos.length - 1]).id)) {
                alert('No seleccionaste ningun turno valido');
                break;
            }
            else {
                continue;
            }
        };

    }) ();

    // ACTUALIZA LOS ARCHIVOS JSON
    listaConsultantesJSON = JSON.stringify(listaConsultantes);
    listaTurnosJSON = JSON.stringify(listaTurnos);

    contenedorConfirmacionReserva.innerHTML = `El ${sessionStorage.getItem('turnoElegido')} fue reservado a nombre de ${idConsultante}`;
    document.querySelector("#formularioReserva").appendChild(contenedorConfirmacionReserva);
};
// FIN EVENTO SUBMIT



