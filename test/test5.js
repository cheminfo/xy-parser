'use strict';

var XYParser = require('..');
var fs = require('fs');

describe('Test with some spaces and taking second and third column', function () {
    var filename="test5.txt";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();

    
    var result=XYParser.parse(data,
        {
            arrayType: 'xxyy',
            xColumn: 1,
            yColumn: 2
        });

    
    it('Check array and length', function () {
       
        result.should.be.instanceof(Array).and.have.length(2);
        result.should.be.eql([[1,3,5],[4,6,8]]);
    });


});

