import { readFileSync } from 'fs';

import { parseXY } from '..';

const path = `${__dirname}/../../testFiles/`;
const filename = 'simple.txt';
const data = readFileSync(path + filename).toString();

describe('simple test', () => {
  it('Check array and length without options', () => {
    const result1 = parseXY(data);
    expect(result1).toStrictEqual({ x: [1, 3, 5, 7], y: [2, 4, 6, 8] });
  });

  it('Check array and length with options normalize:true', () => {
    const result2 = parseXY(data, { rescale: true });
    expect(result2).toStrictEqual({ x: [1, 3, 5, 7], y: [0.25, 0.5, 0.75, 1] });
  });
});
