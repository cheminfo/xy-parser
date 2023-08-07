import { readFileSync } from 'fs';

import { parseXY } from '..';

const path = `${__dirname}/../../testFiles/`;

test('uv.csv', () => {
  const filename = 'uv.csv';
  const data = readFileSync(path + filename).toString();

  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(301);
  expect(result.y).toHaveLength(301);
});
