console.log('hola mundo');
console.log('hola mundo');
console.log('hola mundo');
console.log('hola mundo');
console.log('hola mundo');

let saludo = document.getElementById('saludo');
saludo.style.background = "black";
saludo.style.color = "white";
saludo.style.padding = "10px";
saludo.style.textAlign = "right";
if (!PRODUCTION) {

    if (module.hot) {

        module.hot.accept();
    }
}