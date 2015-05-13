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
