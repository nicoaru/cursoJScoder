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
        this.numeroTurno = ('Turno'+numeroTurno);
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

//DECLARACION DE FUNCIONES
function solicitarDatos() {
nombre = prompt('Ingresa tu nombre');
apellido = prompt('Ingresa tu apellido');
edad = prompt('Ingresa tu edad');
email = prompt('Ingresa tu email');
telefono = prompt('Ingresa tu telefono');
pais = prompt('Ingresa tu pais');
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

//

solicitarDatos();

const usuario1 = new usuario(nombre, apellido, edad, email, telefono, pais);

//usuarioIngresado = prompt('Ingrea tu usuario (usuario1)');
turnoaReservar = prompt('Estos son los turnos disponibles: turno1, turno2, turno3, turno4, turno5, turno6, turno7, turno8, turno9, turno10. Selecciona uno de ellos');
alert('Elegiste el turno: '+turnoaReservar);
//alert('Ingresaste el usuario: '+usuarioIngresado);

switch (turnoaReservar) {
    case "turno1":
        turno1.reservar();
        alert('El turno 1 fue reservado');
        console.log(turno1.ocupado);
        break;
    case "turno2":
        turno2.reservar();
        alert('El turno 2 fue reservado');
        break;
    case "turno3":
        turno3.reservar();
        alert('El turno 3 fue reservado');
        break
    case "turno4":
        turno4.reservar();
        alert('El turno 4 fue reservado');
        break;
    case "turno5":
        turno5.reservar();
        alert('El turno 5 fue reservado');
        break;
    case "turno6":
        turno6.reservar();
        alert('El turno 6 fue reservado');
        break;
    case "turno7":
        turno7.reservar();
        alert('El turno 7 fue reservado');
        break;
    case "turno8":
        turno8.reservar();
        alert('El turno 8 fue reservado');
        break
    case "turno9":
        turno9.reservar();
        alert('El turno 9 fue reservado');
        break;
    case "turno10":
        turno10.reservar();
        alert('El turno 10 fue reservado');
        break;
    default:
        alert("Ese turno no existe")
        break;
}



