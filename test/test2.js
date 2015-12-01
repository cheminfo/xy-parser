'use strict';

var XYParser = require('..');
var fs = require('fs');

describe('text2', function () {
    var filename="text2.txt";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();
    var result=XYParser.parse(data);

    it('Check array and length', function () {
        result.should.be.instanceof(Array).and.have.length(18);
    });


});

