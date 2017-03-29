const css = require('../css/app.scss');
class Persona {
    saludo() {
        console.log('Hola! Soy una persona');
    }
}
console.log("Loggin into webpack 2.0");
console.log("Apps");
let persona = new Persona();
persona.saludo();
if (module.hot) {
    module.hot.accept();
}