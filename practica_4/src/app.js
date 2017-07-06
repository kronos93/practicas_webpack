/*import css from './style.css';
import scss from './style.scss';*/


/*async function getTemplate() {
    try {
        let a = await
        import ("dt-config.js");
        let b = await
        import ("datatables/example-dt.js");
    } catch (err) {
        console.error("template error");
        return new Error(err);
    }
}*/
/*function loadModules(name) {
    return import ("./" + name);
}*/


if ($('#example-dt').length > 0) {
    import ( /* webpackChunkName: "dt-example" */ './datatables/example-dt.js').then(
        module => {}
    ).catch(
        error => { console.log("Valio barriga señor"); }
    );
}
if ($('#example2-dt').length > 0) {
    import ( /* webpackChunkName: "dt-example2" */ './datatables/example2-dt.js').then(
        module => {}
    ).catch(
        error => { console.log("Valio barriga señor"); }
    );
}
if ($('#example3-dt').length > 0) {

}
if ($('#example4-dt').length > 0) {

}
console.log('Hola mundo');