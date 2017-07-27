import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if ($('#example-dt').length > 0) {

    (async() => {
        await
        import ( /* webpackChunkName: "DtConfig" */ './DtConfig')
        .catch(error => { console.log("Sucedio un error al importar el módulo de DataTables"); });
        await
        import ( /* webpackChunkName: "dt-example" */ './datatables/example-dt')
        .catch(error => { console.log("Sucedio un error al importar el módulo de DataTables"); });
    })();
}
if ($('#example2-dt').length > 0) {
    (async() => {
        await
        import ( /* webpackChunkName: "DtConfig" */ './DtConfig')
        .catch(error => { console.log("Sucedio un error al importar el módulo de DataTables"); });
        await
        import ( /* webpackChunkName: "dt-example2" */ './datatables/example2-dt')
        .catch(error => { console.log("Sucedio un error al importar el módulo de DataTables"); });
    })();
}
if ($('#example3-dt').length > 0) {

}
if ($('#example4-dt').length > 0) {

}

if (module.hot) {

    module.hot.accept();
}
OfflinePluginRuntime.install();