var nombre = prompt("Buen dia, como te llamas?")
var profesional = prompt("Por favor indica el nombre del profesional con el que queres agendar un encuentro");
var bandaHoraria = prompt("Indica si te queda mejor por la mañana o por la tarde");

function confirmar() {
    alert("Hola "+nombre+". Elegiste agendar un encuentro con "+profesional+", en el horario "+bandaHoraria+". Pronto nos pondremos en contacto con vos. Muchas gracias!");
};

confirmar();
