//DECLARACION DE CONSTRUCTORES
class usuario {
    constructor(nombre, edad, telefono) {
        this.nombre = nombre;
        this.edad = parseInt(edad);
        this.telefono = telefono;
    }
};

class turno {
    constructor(numeroTurno, consultora, dia, mes, año, hora, ocupado) {
        this.idTurno = ('Turno'+numeroTurno);
        this.consultora = consultora;
        this.dia = parseInt(dia);
        this.mes = mes;
        this.año = parseInt(año);
        this.hora = hora;
        this.ocupado = ocupado;
    }
    reservar() {
        this.ocupado = true;
    }
}


// DECLARACION DE FUNCIONES

function solicitarDatos() {
    nombre = prompt('Ingresa tu nombre');
    edad = prompt('Ingresa tu edad');
    telefono = prompt('Ingresa tu telefono');
    }


function reservarTurno(turnoR) {
    turnoR.reservar();
} 

//DECLARACION DE VARIABLES
let nombre;
let edad;
let telefono;

let usuarioIngresado;
let turnoaReservar;


const listaTurnos = [];
const arrayIdTurnos = [];

//CREACION DE TURNOS 

const turno1 = new turno(1, 'Lucia', 6, 'Mayo', 2021, '10:00', false);
const turno2 = new turno(2, 'Lucia', 6, 'Mayo', 2021, '12:00', false);
const turno3 = new turno(3, 'Lucia', 6, 'Mayo', 2021, '15:00', false);
const turno4 = new turno(4, 'Lucia', 6, 'Mayo', 2021, '17:00', false);
const turno5 = new turno(5, 'Lucia', 6, 'Mayo', 2021, '19:00', false);

const turno6 = new turno(6, 'Flavia', 6, 'Mayo', 2021, '10:00', false);
const turno7 = new turno(7, 'Flavia', 6, 'Mayo', 2021, '12:00', false);
const turno8 = new turno(8, 'Flavia', 6, 'Mayo', 2021, '15:00', false);
const turno9 = new turno(9, 'Flavia', 6, 'Mayo', 2021, '17:00', false);
const turno10 = new turno(10, 'Flavia', 6, 'Mayo', 2021, '19:00', false);

listaTurnos.push(turno1, turno2, turno3, turno4, turno5, turno6, turno7, turno8, turno9, turno10);

for (let turno of listaTurnos) {
    let valor = (turno.idTurno);
    arrayIdTurnos.push(valor);
};

//SOLICITO DATOS Y CREO USUARIO
solicitarDatos();
const usuario1 = new usuario(nombre, edad, telefono);




//MUESTRO NOMBRE DE USUARIO ARRIBA A LA DERECHA
const contenedorUsuario = document.createElement("p");
contenedorUsuario.innerHTML = `${usuario1.nombre}`;
document.querySelector("#userDisplay").appendChild(contenedorUsuario);

