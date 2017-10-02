import '../css/styles.scss';
class Persona {
  saludo() {
    console.log("Hola");
  }
}

let p = new Persona();
p.saludo();

function hola() {
  console.log("hola");
}

if (module.hot) {
  module.hot.accept();
}
