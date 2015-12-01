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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	function parseXY (text, options) {
	    var options = options || {};
	    var lines = text.split(/[\r\n]+/);

	    var maxY = Number.MIN_VALUE;

	    var counter=0;
	    var xxyy= (options.arrayType==='xxyy') ? true : false;
	    if (xxyy) {
	        var result = [
	            new Array(lines.length),
	            new Array(lines.length)
	        ];
	    } else {
	        var result = new Array(lines.length);
	    }

	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        // we will consider only lines that contains only numbers
	        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;\. \t-]+$/)) {
	            line=line.trim();
	            var fields = line.split(/[,; \t]+/);
	            if (fields && fields.length == 2) {
	                var x = parseFloat(fields[0]);
	                var y = parseFloat(fields[1]);

	                if (y > maxY) maxY = y;
	                if (xxyy) {
	                    result[0][counter]=x;
	                    result[1][counter++]=y;
	                } else {
	                    result[counter++]=[x, y];
	                }
	            }
	        }
	    }

	    if (xxyy) {
	        result[0].length=counter;
	        result[1].length=counter;
	    } else {
	        result.length=counter;
	    }

	    if (options.normalize) {
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

	    return result;
	};


	parseXY.parse = parseXY; // keep compatibility
	module.exports = parseXY; // direct export

/***/ }
/******/ ])
});
;