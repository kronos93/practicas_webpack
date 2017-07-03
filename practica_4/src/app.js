import css from './style.css';
import scss from './style.scss';

/*import './dt-config';

import '';
import './require_2';*/
if ($('#example-dt').length > 0) {
    /*require.ensure(['', './require_1'], function(require) {});*/
    import ('./dt-config').then(() => {
        $('#example-dt').DataTable();
    });
}
if ($('#example2-dt').length > 0) {
    import ('./dt-config').then(() => {
        $('#example2-dt').DataTable();
    });
}
if ($('#example3-dt').length > 0) {
    /*require.ensure(['', './require_1'], function(require) {});*/
    import ('./dt-config').then(() => {
        $('#example3-dt').DataTable();
    });
}
if ($('#example4-dt').length > 0) {
    import ('./dt-config').then(() => {
        $('#example4-dt').DataTable();
    });
}
console.log('Hola mundo');