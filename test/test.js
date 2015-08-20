'use strict';

var XYParser = require('..');
var fs = require('fs');

/*
describe('text1', function () {
    var filename="text1.txt";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();
    var result=XYParser.parse(data);

    it('Check array and length', function () {
        result.should.be.instanceof(Array).and.have.length(13);
    });
    it('Check first value', function () {
        result.should.have.property("0",[ 1999.81047, 17.3564 ]);
    });

});
*/

describe('text2', function () {
    var filename="text2.txt";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();
    var result=XYParser.parse(data);

    it('Check array and length', function () {
        result.should.be.instanceof(Array).and.have.length(18);
    });


});

