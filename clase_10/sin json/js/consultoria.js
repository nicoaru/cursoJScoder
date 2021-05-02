//DECLARACION DE CONSTRUCTORES
class usuario {
    constructor(nombre, edad, telefono, turno) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = parseInt(edad);
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
        this.idTurno = ('Turno'+numeroTurno);
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


const listaConsultoras = [];
let listaConsultorasJSON;
const listaTurnos = [];
let listaTurnosJSON;


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
// turnoaReservar = prompt('Estos son los turnos disponibles: '+arrayIdTurnos.join(", ")+'. Selecciona uno de ellos');
// alert('Elegiste el turno: '+turnoaReservar);

// for (let turno of listaTurnos) {
//     if (turnoaReservar === (turno.idTurno)) {
//         turno.reservar();
//         alert('El '+turno.idTurno+' fue reservado: '+turno.ocupado);
//         console.log(turno.idTurno+' ocupado: '+turno.ocupado);
//         break;
//     }
//     else if (turno.idTurno === ((listaTurnos[listaTurnos.length - 1]).idTurno)) {
//         alert('No seleccionaste ningun turno valido');
//         break;
//     }
//     else {
//         continue;
//     }
// };



//MUESTRO LISTA DE TURNOS DISPONIBLES A TRAVES DEL FORMULARIO DE RESERVA


document.querySelector("#tipoConsulta").addEventListener("change", function() {

    document.querySelector("#consultoraElegida").innerHTML = '';

    let tipoConsulta = document.querySelector("#tipoConsulta").options[document.querySelector("#tipoConsulta").selectedIndex].value;
    
    (function (tipoTurno) {
        let optionDefault = document.createElement("option");
        optionDefault.selected = 'true';
        optionDefault.disabled = 'disabled';
        document.querySelector("#consultoraElegida").appendChild(optionDefault);
        
        let consultoras = listaConsultoras.filter(elemento => elemento[tipoTurno] == true);
        for (let consultora of consultoras) {
            let optionaMostrar = document.createElement("option");
            optionaMostrar.text = `${consultora.nombre}`;
            optionaMostrar.value = `${consultora.nombre}`;
            document.querySelector("#consultoraElegida").appendChild(optionaMostrar);
        };
    }) (tipoConsulta);

    document.querySelector("#consultoraElegida").classList.replace('d-none', 'd-block');
});





const contenedorTurnosaMostrar = document.createElement("div");

document.querySelector("#consultoraElegida").addEventListener("change", function() {


    let consultoraElegida = document.querySelector("#consultoraElegida").options[document.querySelector("#consultoraElegida").selectedIndex].value;
    
    function mostrarTurnos(consultora) {

        contenedorTurnosaMostrar.innerHTML = `<legend>Turnos disponibles con ${consultora}</legend>`;
        document.querySelector("#turnosaMostrar").appendChild(contenedorTurnosaMostrar);

        for (let turno of listaTurnos) {
            if (consultora == turno.consultora) {
                contenedorTurnosaMostrar.insertAdjacentHTML('beforeend', `<input type="radio" name="turnoElegido" value="${turno.idTurno}"/>
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


