webpackHotUpdate(0,{

/***/ "./node_modules/imports-loader/index.js!./src/script1.js":
/***/ (function(module, exports) {

throw new Error("Module parse failed: C:\\xampp\\htdocs\\debug\\js\\webpack\\webpack1\\node_modules\\imports-loader\\index.js!C:\\xampp\\htdocs\\debug\\js\\webpack\\webpack1\\node_modules\\babel-loader\\lib\\index.js!C:\\xampp\\htdocs\\debug\\js\\webpack\\webpack1\\src\\script1.js Unexpected token (2:5)\nYou may need an appropriate loader to handle this file type.\n| /*** IMPORTS FROM imports-loader ***/\n| var  = require(\"\");\n| \n| function saludo1() {");

/***/ }),

/***/ "./node_modules/imports-loader/index.js?saludo1!./src/script1.js":
false,

/***/ "./src/script2.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/imports-loader/index.js!./src/script1.js");

function saludo2() {
    console.log('saludos 2');
}
saludo2();
saludo1();

/***/ })

})