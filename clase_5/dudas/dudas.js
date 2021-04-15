/*
HOLA CARLA, QUIERO CONSULTARTE UNA DUDA QUE TENGO
MI DUDA ES COMO LLAMAR A UN VALOR (PROPIEDAD O METODO)
DE UN OBJETO, USANDO UNA VARIABLE PARA TOMAR EL NOMBRE DEL OBJETO.
ACA DEJO UN PEQUENIO EJEMPLO.
POR FAVOR ASISAME SI SE ENTIENDE.
GRACIAS.
NICOLAS
*/

// CONSTRUCTOR:
class turno {
    constructor(numeroTurno, dia, mes, ocupado) {
        this.numeroTurno = ('Turno'+numeroTurno);
        this.dia = parseInt(dia);
        this.mes = mes;
        this.ocupado = ocupado;
    }
    reservar() {
        this.ocupado = true;
    }
}

//VARIABLE:
let turnoaReservar;

//FUNCION:
function reservarTurno(turnoR) {
    turnoR.reservar();
} 

//OBJETO:
const turno1 = new turno(1, 6, 'Mayo', false);

//DOY VALOR A LA VARIABLE POR MEDIO DE PROMPT:
turnoaReservar = prompt('Elegi un turno');


// Y ACA VIENE TODO LO QUE NO FUNCIONA:

// console.log('El turno elegido es el '+turnoaReservar.numeroTurno+'. Te lo vamos a reservar'); //ME TIRA UNDEFINED

// turnoaReservar.reservar();    //ME TIRA ERROR

// reservarTurno(turnoaReservar);   //ME TIRA ERROR


