import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { parseXY } from '../index.ts';

const testFilesPath = join(import.meta.dirname, 'data');
const data = readFileSync(join(testFilesPath, 'simple.txt')).toString();

test('Check array and length without options', () => {
  const result1 = parseXY(data);

  expect(result1).toStrictEqual({ x: [1, 3, 5, 7], y: [2, 4, 6, 8] });
});

test('Check array and length with options normalize:true', () => {
  const result2 = parseXY(data, { rescale: true });

  expect(result2).toStrictEqual({ x: [1, 3, 5, 7], y: [0.25, 0.5, 0.75, 1] });
});
