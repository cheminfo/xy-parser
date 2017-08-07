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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var uniqueXFunction = _interopDefault(__webpack_require__(1));

/**
 * Parse a text-file and convert it to an array of XY points
 * @param {string} text - csv or tsv strings
 * @param {object} [options]
 * @param {string} [options.arrayType = 'xyxy'] - xxyy or xyxy
 * * 'xxyy' `[[x1,x2,x3,...],[y1,y2,y2,...]]`
 * * 'xyxy' `[[x1,y1],[x2,y2],[x3,y3], ...]]`
 * @param {boolean} [options.normalize = false] - will set the maximum value to 1
 * @param {boolean} [options.uniqueX = false] - Make the X values unique (works only with 'xxyy' format). If the X value is repeated the sum of Y is done.
 * @param {number} [options.xColumn = 0] - A number that specifies the x column
 * @param {number} [options.yColumn = 1] - A number that specifies the y column
 * @param {number} [options.maxNumberColumns = (Math.max(xColumn, yColumn)+1)] - A number that specifies the maximum number of y columns
 * @param {number} [options.minNumberColumns = (Math.max(xColumn, yColumn)+1)] - A number that specifies the minimum number of y columns
 * @return {Array<Array<number>>} - check the 'arrayType' option
 */
function parseXY(text, options = {}) {
    var _options$normalize = options.normalize,
        normalize = _options$normalize === undefined ? false : _options$normalize,
        _options$uniqueX = options.uniqueX,
        uniqueX = _options$uniqueX === undefined ? false : _options$uniqueX,
        _options$arrayType = options.arrayType,
        arrayType = _options$arrayType === undefined ? 'xyxy' : _options$arrayType,
        _options$xColumn = options.xColumn,
        xColumn = _options$xColumn === undefined ? 0 : _options$xColumn,
        _options$yColumn = options.yColumn,
        yColumn = _options$yColumn === undefined ? 1 : _options$yColumn,
        _options$maxNumberCol = options.maxNumberColumns,
        maxNumberColumns = _options$maxNumberCol === undefined ? Math.max(xColumn, yColumn) + 1 : _options$maxNumberCol,
        _options$minNumberCol = options.minNumberColumns,
        minNumberColumns = _options$minNumberCol === undefined ? Math.max(xColumn, yColumn) + 1 : _options$minNumberCol;


    var lines = text.split(/[\r\n]+/);

    switch (arrayType) {
        case 'xxyy':
            return xxyy(lines, minNumberColumns, maxNumberColumns, xColumn, yColumn, normalize, uniqueX);
        case 'xyxy':
            return xyxy(lines, minNumberColumns, maxNumberColumns, xColumn, yColumn, normalize, uniqueX);
        default:
            throw new Error(`unsupported arrayType (${arrayType})`);
    }
}

function xxyy(lines, minNumberColumns, maxNumberColumns, xColumn, yColumn, normalize, uniqueX) {
    var maxY = Number.MIN_VALUE;
    var result = [[], []];
    for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        // we will consider only lines that contains only numbers
        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t-]+$/)) {
            line = line.trim();
            var fields = line.split(/[,; \t]+/);
            if (fields && fields.length >= minNumberColumns && fields.length <= maxNumberColumns) {
                var x = parseFloat(fields[xColumn]);
                var y = parseFloat(fields[yColumn]);

                if (y > maxY) maxY = y;
                result[0].push(x);
                result[1].push(y);
            }
        }
    }

    if (normalize) {
        for (var i = 0; i < result[0].length; i++) {
            result[1][i] /= maxY;
        }
    }

    if (uniqueX) {
        uniqueXFunction(result[0], result[1]);
    }

    return result;
}

function xyxy(lines, minNumberColumns, maxNumberColumns, xColumn, yColumn, normalize, uniqueX) {
    if (uniqueX) {
        throw new Error('can only make unique X for xxyy format');
    }

    var maxY = Number.MIN_VALUE;
    var result = [];
    for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        // we will consider only lines that contains only numbers
        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t-]+$/)) {
            line = line.trim();
            var fields = line.split(/[,; \t]+/);
            if (fields && fields.length >= minNumberColumns && fields.length <= maxNumberColumns) {
                var x = parseFloat(fields[xColumn]);
                var y = parseFloat(fields[yColumn]);

                if (y > maxY) maxY = y;
                result.push([x, y]);
            }
        }
    }

    if (normalize) {
        for (var j = 0; j < result.length; j++) {
            result[j][1] /= maxY;
        }
    }

    return result;
}

exports.parseXY = parseXY;

/***/ }),
/* 1 */
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

/***/ })
/******/ ]);
});