import {parseXY} from '..';
import {readFileSync} from 'fs';

const path = __dirname + '/../../testFiles/';

test('text1', () => {
    var filename = 'text1.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(13);
});

test('text2', () => {
    var filename = 'text2.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(18);
});

test('text3', () => {
    var filename = 'text3.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data, {
        uniqueX: true,
        arrayType: 'xxyy'
    });

    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([[1, 2, 3], [3, 3, 9]]);
});

test('Test with some spaces', () => {
    var filename = 'text4.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data, {
        uniqueX: true,
        arrayType: 'xxyy'
    });

    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([[1, 2, 3], [3, 3, 9]]);
});

test('Test with some spaces and taking second and third column', () => {
    var filename = 'text5.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data, {
        arrayType: 'xxyy',
        xColumn: 1,
        yColumn: 2
    });
    expect(result).toEqual([[1, 3, 5], [4, 6, 8]]);
});

test('Test with some non numeric lines', () => {
    var filename = 'text6.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data, {
        arrayType: 'xxyy'
    });
    expect(result).toEqual([[1, 3, 5], [4, 6, 8]]);
});

test('Test with some non numeric lines and keeping info', () => {
    var filename = 'text6.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data, {
        arrayType: 'xxyy',
        keepInfo: true
    });
    expect(result).toEqual({
        data: [[1, 3, 5], [4, 6, 8]],
        info: [
            {position: 0, value: 'This file as some header'},
            {position: 0, value: 'and we should skip it'},
            {position: 3, value: 'The end'}
        ]
    });
});

test('Test with comma as decimal delimiter', () => {
    var filename = 'text7.txt';
    var data = readFileSync(path + filename).toString();
    var result = parseXY(data, {
        arrayType: 'xxyy'
    });
    expect(result).toEqual([[1.1, 2.2, 3.3], [1, 2, 3]]);
});

test('Errors', () => {
    var filename = 'text1.txt';
    var data = readFileSync(path + filename).toString();
    expect(() => parseXY(data, {arrayType: 'bla'})).toThrow(
        'unsupported arrayType (bla)'
    );
});
