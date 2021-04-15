// for (let i = 1; i <= 10; i++) {
//     //Si la variable i es igual 5 interrumpo el for. 
//     if(i == 5){
//         break;
//     }
//     alert(i);
// }



var numeroChequear = parseFloat(prompt('Introduci el numero que quieras chequear si es primo'));
//var numeroParseado = parseFloat(numeroChequear);
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