import css from './style.css';
import scss from './style.scss';

//import './dt-config';
//import '';
//import './require_2';
if ($('#example-dt').length > 0) {
    require.ensure(['./dt-config.js'], function(d) {

    });
}
if ($('#example2-dt').length > 0) {

}
if ($('#example3-dt').length > 0) {

}
if ($('#example4-dt').length > 0) {

}
console.log('Hola mundo');