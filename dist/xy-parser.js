/**
 * xy-parser - Parse a text-file and convert it to an array of XY points
 * @version v1.0.0
 * @link https://github.com/cheminfo-js/xy-parser
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.xyParser=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports.parse = function (text, options) {
    var options = options || {};
    var lines = text.split(/[\r\n]+/);

    var maxY = Number.MIN_VALUE;
    var result = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        // we will consider only lines that contains only numbers
        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;\. \t-]+$/)) {
            var fields = line.split(/[,; \t]+/);
            if (fields && fields.length == 2) {
                var x = parseFloat(fields[0]);
                var y = parseFloat(fields[1]);
                if (y > maxY) maxY = y;
                result.push([x, y]);
            }
        }
    }

    if (options.normalize) {
        maxY /= 100;
        for (var i = 0; i < result.length; i++) {
            result[i][1] /= maxY;
        }
    }

    return result;
};

},{}]},{},[1])(1)
});