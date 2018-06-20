import { parseXY } from '..';

import { readFileSync } from 'fs';

const path = `${__dirname}/../../testFiles/`;

test('ir.asc', () => {
  var filename = 'ir.asc';
  var data = readFileSync(path + filename).toString();

  var result = parseXY(data);
  expect(result).toBeInstanceOf(Array);
  expect(result).toHaveLength(3401);
});

test('ir2.asc', () => {
  var filename = 'ir2.asc';
  var data = readFileSync(path + filename).toString();

  var result = parseXY(data);

  var min = Number.MAX_VALUE;
  var max = Number.MIN_VALUE;
  for (var i = 0; i < result.length; i++) {
    if (result[i][1] < min) min = result[i][1];
    if (result[i][1] > max) max = result[i][1];
  }

  expect(min).toBeCloseTo(5.604768, 3);
  expect(max).toBeCloseTo(516.448984, 3);
  expect(result).toBeInstanceOf(Array);
  expect(result).toHaveLength(3551);
});

