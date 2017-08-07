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
                let x = parseFloat(fields[xColumn]);
                let y = parseFloat(fields[yColumn]);

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
                let x = parseFloat(fields[xColumn]);
                let y = parseFloat(fields[yColumn]);

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
