var numeroPensado = 8;
var numeroIngresado = prompt('Hola, adivina que numero estoy pensando, del 1 al 10');

while (parseInt(numeroIngresado) !== numeroPensado) {
    if (numeroIngresado === "") {
        alert('Dale, pone un numero... Si no queres jugar toca CANCEL');
        numeroIngresado = prompt('Hola, adivina que numero estoy pensando, del 1 al 10');
    }

    else if (numeroIngresado === null) {
        break;
    }

    else if (isNaN(numeroIngresado))
        numeroIngresado = prompt('Ingresa solo numeros por favor');

    else if ((parseInt(numeroIngresado) < 1) || (parseInt(numeroIngresado) > 10)) {
        alert('El numero que dijiste ni siquiera este entre el 1 y el 10!');
        numeroIngresado = prompt('Intenta nuevamente');
    }
    else {
        numeroIngresado = prompt('Lo siento, intenta nuevamente');
    }
};

if (parseInt(numeroIngresado) === numeroPensado) {
    alert('Felicitaciones, acertaste! El numero era '+numeroPensado);
}


