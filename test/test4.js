'use strict';

var XYParser = require('..');
var fs = require('fs');

describe('Test with some spaces', function () {
    var filename="test4.txt";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();

    
    var result=XYParser.parse(data,
        {
            uniqueX: true,
            arrayType: 'xxyy'
        });

    
    it('Check array and length', function () {
       
        result.should.be.instanceof(Array).and.have.length(2);
        result.should.be.eql([[1,2,3],[3,3,9]]);
    });


});

