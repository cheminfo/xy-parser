import uniqueXFunction from 'ml-arrayxy-uniquex';

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
export function parseXY(text, options = {}) {
  let {
    rescale = false,
    uniqueX = false,
    xColumn = 0,
    yColumn = 1,
    keepInfo = false,
    maxNumberColumns = Number.MAX_SAFE_INTEGER,
    minNumberColumns = 2,
  } = options;

  maxNumberColumns = Math.max(maxNumberColumns, xColumn + 1, yColumn + 1);
  minNumberColumns = Math.max(xColumn + 1, yColumn + 1, minNumberColumns);

  let lines = text.split(/[\r\n]+/);

  let maxY = Number.MIN_VALUE;
  let result = { x: [], y: [] };
  let info = [];
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
        fields.length >= minNumberColumns &&
        fields.length <= maxNumberColumns
      ) {
        let x = parseFloat(fields[xColumn].replace(',', '.'));
        let y = parseFloat(fields[yColumn].replace(',', '.'));

        if (y > maxY) maxY = y;
        result.x.push(x);
        result.y.push(y);
      }
    } else if (line) {
      info.push({ position: result.x.length, value: line });
    }
  }

  if (uniqueX) {
    uniqueXFunction(result);
  }

  if (rescale) {
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
