var nombreUsuario = prompt("Bienvenido! Ingresa tu nombre.")
var paisUsuario = prompt('Ingresa tu pais.')
var edadUsuario = prompt('Y ahora, por favor ingresa tu edad');
var edadParseada = parseInt(edadUsuario)

if (((paisUsuario == 'Brasil') || (paisUsuario == 'brasil') || (paisUsuario == 'Peru') || (paisUsuario == 'peru') || (paisUsuario == 'perú') || (paisUsuario == 'Perú') || (paisUsuario == 'Chile') || (paisUsuario == 'chile')) && (edadParseada < 21)) {
    alert('Lo siento! Debes ser mayor de edad para ingresar');
}
else if (edadParseada < 18) {
    alert('Lo siento! Debes ser mayor de edad para ingresar');
}
else {
    alert('Bienvenido '+nombreUsuario+'!')
}