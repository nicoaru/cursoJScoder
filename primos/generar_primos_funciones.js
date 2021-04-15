
alert('Bienvenido. Para saber cuales son los numeros primos existentes en una rango de numeros determinado te vamos a pedir que introduzcas el numero de inicio y el numero final de dicho rango');
var inicioRango = parseFloat(prompt('Introduci el numero de inicio del rango'));
var finRango = parseFloat(prompt('Introduci en numero final del rango'))



function chequearUniversoPrimos(numero) {
    if ((numero < 2) || (!Number.isInteger(numero))) {
        return false;
    }
    else {
        return true;
    }
}

function chequearNumeroPrimo (numero) {
    for (let i = 2; i <= numero; i++) {
        let cociente = (numero / i);
        console.log(cociente);
        
        if (i == (numero)) {
            return true;
            break;
        }
        else if (Number.isInteger(cociente)) {
            return false;
            break;
        }
    }
} 

function mensajeResultado (resultado) {
    alert('El numero '+numeroChequear+' '+resultado);
}



var numeroChequear = parseFloat(prompt('Introduci el numero que quieras chequear si es primo'));

if (!chequearUniversoPrimos(numeroChequear)) {
    mensajeResultado('no es un numero primo');
}

else if (!chequearNumeroPrimo(numeroChequear)) {
    mensajeResultado('no es un numero primo');
}

else if (chequearNumeroPrimo(numeroChequear)) {
    mensajeResultado('es un numero primo');
};
