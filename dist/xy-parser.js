(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xyParser"] = factory();
	else
		root["xyParser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param xs
 * @param ys
 */

function uniqueX(xs, ys) {
    if (xs.length < 2) return;

    var current = xs[0];
    var counter = 0;

    for (var i = 1; i < xs.length; i++) {
        if (current !== xs[i]) {
            counter++;
            current = xs[i];
            xs[counter] = xs[i];
            if (i !== counter) {
                ys[counter] = 0;
            }
        }
        if (i !== counter) {
            ys[counter] += ys[i];
        }

    }

    xs.length = counter + 1;
    ys.length = counter + 1;
}

module.exports = uniqueX;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uniqueXFunction = __webpack_require__(0);

/**
 *
 * @param text
 * @param options
 * @param options.arrayType xxyy or xyxy
 * @param {boolean} options.normalize=false
 * @param {boolean} options.uniqueX
 * @param {number} [options.xColumn=0] - A number that specifies the xColumn
 * @param {number} [options.yColumn=1] - A number that specifies the yColumn
 * @param {number} [options.maxNumberColumns=(Math.max(xColumn, yColumn)+1 || 2)] - A number that specifies the yColumn
 * @param {number} [options.minNumberColumns=(Math.max(xColumn, yColumn)+1 || 2)] - A number that specifies the yColumn
 * @returns {*[]|Array}
 */

function parseXY(text, options = {}) {
    var _options$normalize = options.normalize;
    let normalize = _options$normalize === undefined ? false : _options$normalize;
    var _options$uniqueX = options.uniqueX;
    let uniqueX = _options$uniqueX === undefined ? false : _options$uniqueX;
    var _options$arrayType = options.arrayType;
    let arrayType = _options$arrayType === undefined ? 'xyxy' : _options$arrayType;
    var _options$xColumn = options.xColumn;
    let xColumn = _options$xColumn === undefined ? 0 : _options$xColumn;
    var _options$yColumn = options.yColumn;
    let yColumn = _options$yColumn === undefined ? 1 : _options$yColumn,
        maxNumberColumns = options.maxNumberColumns,
        minNumberColumns = options.minNumberColumns;

    if (!maxNumberColumns) maxNumberColumns = Math.max(xColumn, yColumn) + 1 || 2;
    if (!minNumberColumns) minNumberColumns = Math.max(xColumn, yColumn) + 1 || 2;
    var lines = text.split(/[\r\n]+/);

    var maxY = Number.MIN_VALUE;

    var counter = 0;
    var xxyy = arrayType === 'xxyy' ? true : false;
    if (xxyy) {
        var result = [new Array(lines.length), new Array(lines.length)];
    } else {
        var result = new Array(lines.length);
    }
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        // we will consider only lines that contains only numbers
        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;\. \t-]+$/)) {
            line = line.trim();
            var fields = line.split(/[,; \t]+/);
            if (fields && fields.length >= minNumberColumns && fields.length <= maxNumberColumns) {
                let x = parseFloat(fields[xColumn]);
                let y = parseFloat(fields[yColumn]);

                if (y > maxY) maxY = y;
                if (xxyy) {
                    result[0][counter] = x;
                    result[1][counter++] = y;
                } else {
                    result[counter++] = [x, y];
                }
            }
        }
    }

    if (xxyy) {
        result[0].length = counter;
        result[1].length = counter;
    } else {
        result.length = counter;
    }

    if (normalize) {
        if (xxyy) {
            for (var i = 0; i < counter; i++) {
                result[1][i] /= maxY;
            }
        } else {
            for (var i = 0; i < counter; i++) {
                result[i][1] /= maxY;
            }
        }
    }

    if (uniqueX) {
        if (!xxyy) throw new Error('Can only make unique X for xxyy format');
        uniqueXFunction(result[0], result[1]);
    }

    return result;
};

parseXY.parse = parseXY; // keep compatibility
module.exports = parseXY; // direct export

/***/ })
/******/ ]);
});