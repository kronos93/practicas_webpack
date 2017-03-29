webpackHotUpdate(0,{

/***/ "./node_modules/exports-loader/index.js?saludo1!./src/script1.js":
/***/ (function(module, exports) {

saludo1 = function saludo1() {
    console.log('saludos 1');
};

/*** EXPORTS FROM exports-loader ***/
module.exports = saludo1;

/***/ }),

/***/ "./src/script2.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/exports-loader/index.js?saludo1!./src/script1.js");

function saludo2() {
    console.log('saludos 2');
}
saludo2();
saludo1();

/***/ })

})