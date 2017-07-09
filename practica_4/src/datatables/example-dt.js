import ( /* webpackChunkName: "DtConfig" */ '../DtConfig').then(
    module => {
        let dtconfig = new module.DtConfig();
        $('#example-dt').DataTable({

        });
    }
).catch(
    error => { console.log(error); }
);