/**
 * xy-parser - Parse a text-file and convert it to an array of XY points
 * @version v3.0.0
 * @link https://github.com/cheminfo-js/xy-parser#readme
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.xyParser = {}));
}(this, function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var lib = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, '__esModule', {
	    value: true
	  });
	  /**
	   * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
	   * @param {object} [points={}] : Object of points contains property x (an array) and y (an array)
	   * @return points
	   */

	  function uniqueX() {
	    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    const {
	      x,
	      y
	    } = points;
	    if (x.length < 2) return;

	    if (x.length !== y.length) {
	      throw new Error('The X and Y arrays mush have the same length');
	    }

	    let current = x[0];
	    let counter = 0;

	    for (let i = 1; i < x.length; i++) {
	      if (current !== x[i]) {
	        counter++;
	        current = x[i];
	        x[counter] = x[i];

	        if (i !== counter) {
	          y[counter] = 0;
	        }
	      }

	      if (i !== counter) {
	        y[counter] += y[i];
	      }
	    }

	    x.length = counter + 1;
	    y.length = counter + 1;
	  }
	  /**
	   * Parse a text-file and convert it to an array of XY points
	   * @param {string} text - csv or tsv strings
	   * @param {object} [options={}]
	   * @param {boolean} [options.rescale = false] - will set the maximum value to 1
	   * @param {boolean} [options.uniqueX = false] - Make the X values unique (works only with 'xxyy' format). If the X value is repeated the sum of Y is done.
	   * @param {number} [options.xColumn = 0] - A number that specifies the x column
	   * @param {number} [options.yColumn = 1] - A number that specifies the y column
	   * @param {number} [options.maxNumberColumns = (Math.max(xColumn, yColumn)+1)] - A number that specifies the maximum number of y columns
	   * @param {number} [options.minNumberColumns = (Math.min(xColumn, yColumn)+1)] - A number that specifies the minimum number of y columns
	   * @param {boolean} [options.keepInfo = false] - shoud we keep the non numeric lines. In this case the system will return an object {data, info}
	   * @return {object{x:<Array<number>>,y:<Array<number>>}
	   */


	  function parseXY(text) {
	    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    let {
	      rescale = false,
	      uniqueX: uniqueX$1 = false,
	      xColumn = 0,
	      yColumn = 1,
	      keepInfo = false,
	      maxNumberColumns = Number.MAX_SAFE_INTEGER,
	      minNumberColumns = 2
	    } = options;
	    maxNumberColumns = Math.max(maxNumberColumns, xColumn + 1, yColumn + 1);
	    minNumberColumns = Math.max(xColumn + 1, yColumn + 1, minNumberColumns);
	    let lines = text.split(/[\r\n]+/);
	    let maxY = Number.MIN_VALUE;
	    let result = {
	      x: [],
	      y: []
	    };
	    let info = [];

	    for (let l = 0; l < lines.length; l++) {
	      let line = lines[l].trim(); // we will consider only lines that contains only numbers

	      if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t+-]+$/)) {
	        let fields = line.split(/,[; \t]+|[; \t]+/);

	        if (fields.length === 1) {
	          fields = line.split(/[,; \t]+/);
	        }

	        if (fields && fields.length >= minNumberColumns && fields.length <= maxNumberColumns) {
	          let x = parseFloat(fields[xColumn].replace(',', '.'));
	          let y = parseFloat(fields[yColumn].replace(',', '.'));
	          if (y > maxY) maxY = y;
	          result.x.push(x);
	          result.y.push(y);
	        }
	      } else if (line) {
	        info.push({
	          position: result.x.length,
	          value: line
	        });
	      }
	    }

	    if (uniqueX$1) {
	      uniqueX(result);
	    }

	    if (rescale) {
	      for (let i = 0; i < result.y.length; i++) {
	        result.y[i] /= maxY;
	      }
	    }

	    if (!keepInfo) return result;
	    return {
	      info,
	      data: result
	    };
	  }

	  exports.parseXY = parseXY;
	});
	var index = unwrapExports(lib);
	var lib_1 = lib.parseXY;

	exports.default = index;
	exports.parseXY = lib_1;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=xy-parser.js.map
