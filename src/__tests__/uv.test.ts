import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { parseXY } from '../index.ts';

const testFilesPath = join(import.meta.dirname, '../../testFiles');

test('uv.csv', () => {
  const data = readFileSync(join(testFilesPath, 'uv.csv')).toString();

  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(301);
  expect(result.y).toHaveLength(301);
});
