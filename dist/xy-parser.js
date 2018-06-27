/**
 * xy-parser - Parse a text-file and convert it to an array of XY points
 * @version v2.2.2
 * @link https://github.com/cheminfo-js/xy-parser#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xyParser"] = factory();
	else
		root["xyParser"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
 * @param {boolean} [options.keepInfo = false] - shoud we keep the non numeric lines. In this case the system will return an object {data, info}
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
      _options$keepInfo = options.keepInfo,
      keepInfo = _options$keepInfo === undefined ? false : _options$keepInfo,
      _options$maxNumberCol = options.maxNumberColumns,
      maxNumberColumns = _options$maxNumberCol === undefined ? Math.max(xColumn, yColumn) + 1 : _options$maxNumberCol,
      _options$minNumberCol = options.minNumberColumns,
      minNumberColumns = _options$minNumberCol === undefined ? Math.max(xColumn, yColumn) + 1 : _options$minNumberCol;


  var lines = text.split(/[\r\n]+/);

  if (arrayType !== 'xxyy' && arrayType !== 'xyxy') {
    throw new Error(`unsupported arrayType (${arrayType})`);
  }

  var maxY = Number.MIN_VALUE;
  var result = [[], []];
  var info = [];
  for (var l = 0; l < lines.length; l++) {
    var line = lines[l].trim();
    // we will consider only lines that contains only numbers
    if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t+-]+$/)) {
      var fields = line.split(/,[; \t]+|[; \t]+/);
      if (fields.length === 1) {
        fields = line.split(/[,; \t]+/);
      }
      if (fields && fields.length >= minNumberColumns && fields.length <= maxNumberColumns) {
        var x = parseFloat(fields[xColumn].replace(',', '.'));
        var y = parseFloat(fields[yColumn].replace(',', '.'));

        if (y > maxY) maxY = y;
        result[0].push(x);
        result[1].push(y);
      }
    } else if (line) {
      info.push({ position: result[0].length, value: line });
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

  if (arrayType === 'xyxy') {
    var newResult = [];
    for (var _i = 0; _i < result[0].length; _i++) {
      newResult.push([result[0][_i], result[1][_i]]);
    }
    result = newResult;
  }

  if (!keepInfo) return result;

  return {
    info,
    data: result
  };
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
//# sourceMappingURL=xy-parser.js.map