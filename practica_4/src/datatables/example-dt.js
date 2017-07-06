import ( /* webpackChunkName: "dt-config" */ '../dt-config').then(
    module => {
        $('#example-dt').DataTable();
    }
).catch(
    error => { console.log("Valio barriga señor"); }
);