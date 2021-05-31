// DECLARACION DE VARIABLES

let listaTurnosSesion = [];
let tipoConsulta;

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
 
function postAjax(dato, callbackDone, callbackFail) {
    $.ajax({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: JSON.stringify(dato),
    })
    .done(function() {
        callbackDone();
    })
    .fail(function() {
        callbackFail();
    })
}



