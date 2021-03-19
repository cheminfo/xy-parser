import mlArrayMax from 'ml-array-max';
import uniqueXFunction from 'ml-arrayxy-uniquex';
import { xIsMonotone } from 'ml-spectra-processing';
/**
 * Parse a text-file and convert it to an array of XY points
 * @param {string} text - csv or tsv strings
 * @param {object} [options={}]
 * @param {boolean} [options.rescale = false] - will set the maximum value to 1
 * @param {boolean} [options.uniqueX = false] - Make the X values unique (works only with 'xxyy' format). If the X value is repeated the sum of Y is done.
 * @param {number} [options.xColumn = 0] - A number that specifies the x column
 * @param {number} [options.yColumn = 1] - A number that specifies the y column
 * @param {boolean} [options.bestGuess=false] Will try to guess which columns are the best
 * @param {number} [options.numberColumns=Number.MAX_SAFE_INTEGER] If the file has 10 columns and you specify here 2 it will reflow the file
 * @param {number} [options.maxNumberColumns = (Math.max(xColumn, yColumn)+1)] - A number that specifies the maximum number of y columns
 * @param {number} [options.minNumberColumns = (Math.min(xColumn, yColumn)+1)] - A number that specifies the minimum number of y columns
 * @param {boolean} [options.keepInfo = false] - shoud we keep the non numeric lines. In this case the system will return an object {data, info}
 * @return {object{x:<Array<number>>,y:<Array<number>>}
 */
export function parseXY(text, options = {}) {
  let {
    rescale = false,
    uniqueX = false,
    xColumn = 0,
    yColumn = 1,
    keepInfo = false,
    bestGuess = false,
    numberColumns = Number.MAX_SAFE_INTEGER,
    maxNumberColumns = Number.MAX_SAFE_INTEGER,
    minNumberColumns = 2,
  } = options;

  maxNumberColumns = Math.max(maxNumberColumns, xColumn + 1, yColumn + 1);
  minNumberColumns = Math.max(xColumn + 1, yColumn + 1, minNumberColumns);

  let lines = text.split(/[\r\n]+/);

  let matrix = [];
  let info = [];
  let position = 0;
  for (let l = 0; l < lines.length; l++) {
    let line = lines[l].trim();
    // we will consider only lines that contains only numbers
    if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t+-]+$/)) {
      let fields = line.split(/,[; \t]+|[; \t]+/);
      if (fields.length === 1) {
        fields = line.split(/[,; \t]+/);
      }
      if (
        fields &&
        fields.length >= minNumberColumns && // we filter lines that have not enough or too many columns
        fields.length <= maxNumberColumns
      ) {
        matrix.push(fields.map((value) => parseFloat(value.replace(',', '.'))));
        position++;
      }
    } else if (line) {
      info.push({ position, value: line });
    }
  }

  if (bestGuess) {
    if (
      matrix[0] &&
      matrix[0].length === 3 &&
      options.xColumn === undefined &&
      options.yColumn === undefined
    ) {
      // is the first column a seuqnetial number ?
      let skipFirstColumn = true;
      for (let i = 0; i < matrix.length - 1; i++) {
        if (Math.abs(matrix[i][0] - matrix[i + 1][0]) !== 1) {
          skipFirstColumn = false;
        }
      }
      if (skipFirstColumn) {
        xColumn = 1;
        yColumn = 2;
      }
    }
    if (matrix[0] && matrix[0].length > 3) {
      let xs = [];
      for (let row of matrix) {
        for (let i = xColumn; i < row.length; i += 2) {
          xs.push(row[i]);
        }
      }
      if (xIsMonotone(xs)) {
        numberColumns = 2;
      }
    }
  }

  if (numberColumns) {
    const newMatrix = [];
    for (const row of matrix) {
      for (let i = 0; i < row.length; i += numberColumns) {
        newMatrix.push(row.slice(i, i + numberColumns));
      }
    }
    matrix = newMatrix;
  }
  const result = {
    x: matrix.map((row) => row[xColumn]),
    y: matrix.map((row) => row[yColumn]),
  };

  if (uniqueX) {
    uniqueXFunction(result);
  }

  if (rescale) {
    let maxY = mlArrayMax(result.y);
    for (let i = 0; i < result.y.length; i++) {
      result.y[i] /= maxY;
    }
  }

  if (!keepInfo) return result;

  return {
    info,
    data: result,
  };
}
