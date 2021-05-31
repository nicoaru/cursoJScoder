// DECLARACION DE VARIABLES

let listaTurnosSesion = [];

const urlListaTurnos = "../js/backend/listaTurnosBackend.json";
const urlListaConsultoras = "../js/backend/listaConsultorasBackend.json";

// DECLARACION DE FUNCIONES

function getSessionStorage(keyname) {
    return JSON.parse(sessionStorage.getItem(keyname));
    };
function pushSessionStorage(keyname, variable) {
    sessionStorage.setItem(keyname, JSON.stringify(variable));
};

function getAjaxTurnos(urlAjax, sessionStorageKey) {
    $.ajax({
        method: 'GET',
        url: urlAjax,
    })
    .done(function(data) {
        let variableParaStorage = data;
        pushSessionStorage(sessionStorageKey, variableParaStorage);
        listaTurnosSesion = getSessionStorage(sessionStorageKey);
        
    }) 
    .fail(function(jqXHR, textStatus){
        console.log(jqXHR);
        console.log(`La carga de la lista de turnos mediante ajax, fallo: ${textStatus}`);
    })
};

function getAjaxConsultoras(urlAjax, callbackDone, parCallback, callbackFail) {
    $.ajax({
        method: 'GET',
        url: urlAjax,
    })
    .done(function(data) {
        console.log(data);
        callbackDone(parCallback, data);         
    }) 
    .fail(function(jqXHR, textStatus){
        console.log(jqXHR);
        console.log(`La carga de la lista de consultoras mediante ajax, fallo: ${textStatus}`);
        callbackFail();
    })
};
 
function postAjax(turno, callbackDone, callbackFail) {
    $.ajax({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: JSON.stringify(listaTurnosSesion),
    })
    .done(function() {
        console.log(`La reserva del ${turno} fue exitosa`);
        callbackDone();
    })
    .fail(function() {
        console.log(`La reserva del ${turno} fallo`)
        callbackFail();
    })
}





/* function getListaTurnos() {
    getAjax(urlListaTurnos, listaTurnosSesion);
};

function getListaConsultoras() {
    getAjax(urlListaConsultoras, listaConsultorasSesion);
};
 */
/* function getListaTurnos() {
    $.ajax({
        method: 'GET',
        url: "../js/backend/listaTurnosBackend.json",
    })
    .done(function(data, textStatus) {
        listaTurnosSesion = JSON.parse(data);
        console.log(listaTurnosSesion)
        console.log(textStatus);
    }) 
    .fail(function(jqXHR, textStatus){
        console.log(jqXHR);
        console.log(`La carga de la lista de turno mediante ajax, fallo: ${textStatus}`);
    })
}; */