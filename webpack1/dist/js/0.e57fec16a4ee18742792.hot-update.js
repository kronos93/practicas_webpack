webpackHotUpdate(0,{

/***/ "./src/script1.js":
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: C:/xampp/htdocs/debug/js/webpack/webpack1/src/script1.js: Unexpected token, expected { (1:7)\n\n> 1 | export saludo1;\n    |        ^\n  2 | function saludo1() {\n  3 |     console.log('saludo1');\n  4 | }\n");

/***/ }),

/***/ "./src/script2.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__script1_js__ = __webpack_require__("./src/script1.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__script1_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__script1_js__);


function saludo2() {
    console.log('saludos 2');
}
saludo2();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__script1_js__["saludo1"])();

/***/ })

})