require('../css/app.scss');
import $ from 'jquery';

require('bootstrap/dist/js/bootstrap.min.js');
class Persona {
    saludo() {
        console.log('Hola! Soy una persona, saludandote.');
    }
}
let miDiv = document.createElement('div');
console.log("Loggin into webpack 2.0");
console.log("Apps");
let persona = new Persona();
persona.saludo();


if (!PRODUCTION) {
    console.log("Producción es: " + PRODUCTION);
    console.log(module.hot);
    if (module.hot) {
        module.hot.accept();
    }
}