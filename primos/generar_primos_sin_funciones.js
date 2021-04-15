
alert('Bienvenido. Para saber cuales son los numeros primos existentes en una rango de numeros determinado te vamos a pedir que introduzcas el numero de inicio y el numero final de dicho rango');
var inicioRango = parseFloat(prompt('Introduci el numero de inicio del rango'));
var finRango = parseFloat(prompt('Introduci en numero final del rango'))

var primo

if (numeroChequear < 2) {
    primo = false;
}
else if (!Number.isInteger(numeroChequear)) {
    primo = false;
}
else {
for (let i = 2; i <= numeroChequear; i++) {
    var cociente = (numeroChequear / i);
    console.log(cociente);
    
    if (i == (numeroChequear)) {
        primo = true;
    }
    else if (Number.isInteger(cociente)) {
        primo = false;
        break;
    }
}
}

if (primo == false) {
    alert('El numero '+numeroChequear+' no es un numero primo');
}

else if (primo == true) {
    alert('El numero '+numeroChequear+' es un numero primo');
}