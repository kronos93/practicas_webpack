import $ from 'jquery';
import dt from 'datatables.net';
import dt_r from 'datatables.net-responsive';
import dt_buttons from 'datatables.net-buttons';
import dt_button_print from 'datatables.net-buttons/js/buttons.print.js';
import dt_button_html5 from 'datatables.net-buttons/js/buttons.html5.js';
import dt_button_flash from 'datatables.net-buttons/js/buttons.flash.js';

dt(window, $);
dt_r(window, $);
dt_buttons(window, $);
dt_button_print(window, $);
dt_button_html5(window, $);
dt_button_flash(window, $);

//Preconfiguración de los datatable
$.extend(true, $.fn.dataTable.defaults, {
    "pagingType": "full_numbers",
    "language": {
        "url": "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
        "decimal": ".",
        "thousands": ","
    },
    "responsive": true,
    "deferRender": true,
    "pageLength": 25,
    autoWidth: false,
});