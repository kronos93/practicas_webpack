webpackHotUpdate(0,{

/***/ "./node_modules/imports-loader/index.js?saludo1=saludo1!./src/script1.js":
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var saludo1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"saludo1\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

function saludo1() {
    console.log('saludo1');
}


/***/ }),

/***/ "./src/script2.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/imports-loader/index.js?saludo1=saludo1!./src/script1.js");

function saludo2() {
    console.log('saludos 2');
}
saludo2();
saludo1();

/***/ })

})