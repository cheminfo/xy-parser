import { readFileSync } from 'fs';

import { parseXY } from '..';

const path = `${__dirname}/../../testFiles/`;

test('uv.csv', () => {
  let filename = 'uv.csv';
  let data = readFileSync(path + filename).toString();

  let result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(301);
  expect(result.y).toHaveLength(301);
});
