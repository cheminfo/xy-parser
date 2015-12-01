'use strict';

var XYParser = require('..');
var fs = require('fs');


describe('ir2.asc', function () {
    var filename="ir2.asc";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();

    var result=XYParser.parse(data);

    var min=Number.MAX_VALUE;
    var max=Number.MIN_VALUE;
    console.log(result.length);
    for (var i=0; i<result.length; i++) {
        if (result[i][1]<min) min=result[i][1];
        if (result[i][1]>max) max=result[i][1];
    }
    console.log(min,max);


    it('Check array and length', function () {
        min.should.approximately(5.604768, 0.001);
        max.should.approximately(516.448984, 0.001);
        result.should.be.instanceof(Array).and.have.length(3551);
    });


});

