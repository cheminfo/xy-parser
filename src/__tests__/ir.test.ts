import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { parseXY } from '../index.ts';

const testFilesPath = join(import.meta.dirname, '../../testFiles');

test('ir.asc', () => {
  const data = readFileSync(join(testFilesPath, 'ir.asc')).toString();

  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(3401);
  expect(result.y).toHaveLength(3401);
});

test('ir2.asc', () => {
  const data = readFileSync(join(testFilesPath, 'ir2.asc')).toString();

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
