import {parseXY} from '..';
import {readFileSync} from 'fs';

const path = __dirname + '/../../testFiles/';
const filename = 'simple.txt';
var data = readFileSync(path + filename).toString();

describe('simple test', () => {
    it('Check array and length without options', () => {
        var result1 = parseXY(data);
        expect(result1).toEqual([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8]
        ]);
    });

    it('Check array and length with options normalize:true', () => {
        var result2 = parseXY(data, {normalize: true});
        expect(result2).toEqual([
            [1, 0.25],
            [3, 0.5],
            [5, 0.75],
            [7, 1]
        ]);
    });

    it('Check array and length with option arrayType:xxyy', () => {
        var result3 = parseXY(data, {arrayType: 'xxyy'});
        expect(result3).toEqual([
            [1, 3, 5, 7],
            [2, 4, 6, 8]
        ]);
    });

    it('Check array and length with options arrayType:xxyy and normalize:true', () => {
        var result4 = parseXY(data, {arrayType: 'xxyy', normalize: true});
        expect(result4).toEqual([
            [1, 3, 5, 7],
            [0.25, 0.5, 0.75, 1]
        ]);
    });
});

