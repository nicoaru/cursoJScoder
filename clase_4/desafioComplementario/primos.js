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




