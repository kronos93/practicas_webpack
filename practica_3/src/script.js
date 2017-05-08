console.log('hola mundo');
console.log('hola mundo');
console.log('hola mundo');
if (!PRODUCTION) {

    if (module.hot) {
        console.log("Detect hot");
        module.hot.accept();
    }
}