import ( /* webpackChunkName: "DtConfig" */ '../DtConfig').then(
    module => {
        let dtconfig = new module.DtConfig();
        $('#example2-dt').DataTable({

        });
    }
).catch(
    error => { console.log(error); }
);