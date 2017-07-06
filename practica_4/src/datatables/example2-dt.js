import ( /* webpackChunkName: "dt-config" */ '../dt-config').then(
    module => {
        $('#example2-dt').DataTable();
    }
).catch(
    error => { console.log("Valio barriga señor"); }
);