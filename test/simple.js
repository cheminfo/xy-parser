'use strict';

var XYParser = require('..');
var fs = require('fs');


describe('simple test', function () {
    var filename="simple.txt";
    var data=fs.readFileSync(__dirname + "/data/"+filename).toString();
    var result1=XYParser.parse(data);

    it('Check array and length without options', function () {
        result1.should.be.instanceof(Array).and.have.length(4);
        result1[0].should.be.instanceof(Array).and.have.length(2);
        result1[0].should.be.eql([1,2]);
        result1[3].should.be.eql([7,8]);
    });


    var result2=XYParser.parse(data, {normalize:true});

    it('Check array and length with options normalize:true', function () {
        result2.should.be.instanceof(Array).and.have.length(4);
        result2[0].should.be.instanceof(Array).and.have.length(2);
        result2[0].should.be.eql([1,0.25]);
        result2[3].should.be.eql([7,1]);
    });

    var result3=XYParser.parse(data, {arrayType:'xxyy'});

    it('Check array and length with option arrayType:xxyy', function () {
        result3.should.be.instanceof(Array).and.have.length(2);
        result3[0].should.be.instanceof(Array).and.have.length(4);
        result3[0].should.be.eql([1,3,5,7]);
        result3[1].should.be.eql([2,4,6,8]);
    });

    var result4=XYParser.parse(data, {arrayType: 'xxyy', normalize:true});

    it('Check array and length with options arrayType:xxyy and normalize:true', function () {
        result4.should.be.instanceof(Array).and.have.length(2);
        result4[0].should.be.instanceof(Array).and.have.length(4);
        result4[0].should.be.eql([1,3,5,7]);
        result4[1].should.be.eql([0.25, 0.50, 0.75,1]);
    });

});

