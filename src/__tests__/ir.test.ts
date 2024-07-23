import { readFileSync } from 'node:fs';

import { parseXY } from '../index';

const path = `${__dirname}/../../testFiles/`;

test('ir.asc', () => {
  const filename = 'ir.asc';
  const data = readFileSync(path + filename).toString();

  const result = parseXY(data);
  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(3401);
  expect(result.y).toHaveLength(3401);
});

test('ir2.asc', () => {
  const filename = 'ir2.asc';
  const data = readFileSync(path + filename).toString();

  const result = parseXY(data);

  const min = Math.min(...result.y);
  const max = Math.max(...result.y);

  expect(min).toBeCloseTo(5.604768, 3);
  expect(max).toBeCloseTo(516.448984, 3);
  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(3551);
  expect(result.y).toHaveLength(3551);
});
