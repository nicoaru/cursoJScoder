//DECLARACION DE CONSTRUCTORES
class usuario {
    constructor(nombre, apellido, edad, email, telefono, pais) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = parseInt(edad);
        this.email = email;
        this.telefono = telefono;
        this.pais = pais;
    }
};

class turno {
    constructor(numeroTurno, profesional, dia, mes, año, hora, ocupado) {
        this.idTurno = ('Turno'+numeroTurno);
        this.profesional = profesional;
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

function solicitarDatosyPushear() {
nombre = prompt('Ingresa tu nombre');
apellido = prompt('Ingresa tu apellido');
edad = prompt('Ingresa tu edad');
email = prompt('Ingresa tu email');
telefono = prompt('Ingresa tu telefono');
pais = prompt('Ingresa tu pais');
listaUsuarios.push(new usuario(nombre, apellido, edad, email, telefono, pais));
console.log(listaUsuarios[0]);
}


function reservarTurno(turnoR) {
    turnoR.reservar();
} 

//DECLARACION DE VARIABLES
let nombre;
let apellido;
let edad;
let email;
let telefono;
let pais;

let usuarioIngresado;
let turnoaReservar;

const listaUsuarios = [];
const listaTurnos = [];
const arrayIdTurnos = [];

//TURNOS

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

solicitarDatosyPushear();
turnoaReservar = prompt('Estos son los turnos disponibles: '+arrayIdTurnos.join(", ")+'. Selecciona uno de ellos');
alert('Elegiste el turno: '+turnoaReservar);

for (let turno of listaTurnos) {
    if (turnoaReservar === (turno.idTurno)) {
        turno.reservar();
        alert('El '+turno.idTurno+' fue reservado: '+turno.ocupado);
        console.log(turno.idTurno+' ocupado: '+turno.ocupado);
        break;
    }
    else if (turno.idTurno === ((listaTurnos[listaTurnos.length - 1]).idTurno)) {
        alert('No seleccionaste ningun turno valido');
        break;
    }
        
    else {
        continue;
    }
};