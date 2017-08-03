import uniqueXFunction from 'ml-arrayxy-uniquex';

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
export function parseXY(text, options = {}) {
    const {
        normalize = false,
        uniqueX = false,
        arrayType = 'xyxy',
        xColumn = 0,
        yColumn = 1,
        maxNumberColumns = Math.max(xColumn, yColumn) + 1,
        minNumberColumns = Math.max(xColumn, yColumn) + 1
    } = options;

    var lines = text.split(/[\r\n]+/);
    var maxY = Number.MIN_VALUE;

    var counter = 0;
    var xxyy = (arrayType === 'xxyy');
    var result;
    if (xxyy) {
        result = [
            new Array(lines.length),
            new Array(lines.length)
        ];
    } else {
        result = new Array(lines.length);
    }
    for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        // we will consider only lines that contains only numbers
        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t-]+$/)) {
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
            for (var j = 0; j < counter; j++) {
                result[j][1] /= maxY;
            }
        }

    }

    if (uniqueX) {
        if (!xxyy) throw new Error('can only make unique X for xxyy format');
        uniqueXFunction(result[0], result[1]);
    }

    return result;
}
