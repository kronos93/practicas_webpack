webpackHotUpdate(0,{

/***/ "./src/script1.js":
/***/ (function(module, __webpack_exports__) {

"use strict";
exports.saludo1 = function() {
    console.log('saludos 1');
}

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