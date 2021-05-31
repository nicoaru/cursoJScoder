$('body').prepend("<div class='btn btn-primary' id='reservar'>RESERVAR LOS TURNOS DE LUCIA</div>");
$('body').prepend("<div class='btn btn-primary' id='enviar'>ENVIAR LOS CAMBIOS</div>");

let datosBackend = [];

function callAjax() {
    $.ajax({
        method: 'GET',
        url: "../js/backend/listaTurnosBackend.json",
    })
    .done(function(data) {
        console.log(data);
        datosBackend = data;
        console.log(datosBackend);
        console.log(typeof datosBackend);
    })
    .fail(function(jqXHR, textStatus) {
        console.log(jqXHR);
        console.log(textStatus);
        alert('Hubo un error con el ajax')
    })
};
callAjax();

function reservarTurnosLucia() {
    for (let turno of datosBackend) {
        if (turno.consultora == "Lucia") {
            turno.reservado = true;
        };
    };
    console.log(datosBackend);
};
$('#reservar').on('click', reservarTurnosLucia);


function callAjaxPost() {
    $.ajax({
        method: 'POST',
        url: "https://jsonplaceholder.typicode.com/posts",
        data: JSON.stringify(datosBackend),
        contentType: "application/json",
    })
    .done(function() {
        alert("Dstos enviados");
        console.log("Datos enviados");
    })
    .fail(function() {
        console.log(jqXHR);
        console.log(textStatus);
        alert('Algo salio mal al enviar los datos')
    })
};

$('#enviar').on('click', callAjaxPost);
