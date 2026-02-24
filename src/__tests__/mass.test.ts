import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { parseXY } from '../index.ts';

const testFilesPath = join(import.meta.dirname, '../../testFiles');

test('mass1.txt', () => {
  const data = readFileSync(join(testFilesPath, 'mass1.txt')).toString();

  const result = parseXY(data);

  expect(result.x).toHaveLength(20);
  expect(result.y).toHaveLength(20);
  expect(result.x[0]).toBe(165.4746);
  expect(result.y[0]).toBe(451);

  const result2 = parseXY(data, { bestGuess: true });

  expect(result2.x).toHaveLength(20);
  expect(result2.y).toHaveLength(20);
  expect(result2.x[0]).toBe(165.4746);
  expect(result2.y[0]).toBe(451);
});

test('mass2.csv', () => {
  const data = readFileSync(join(testFilesPath, 'mass2.csv')).toString();

  const result = parseXY(data, { xColumn: 1, yColumn: 2 });

  expect(result.x).toHaveLength(20);
  expect(result.y).toHaveLength(20);
  expect(result.x[1]).toBe(100.0045);
  expect(result.y[1]).toBe(0.772047996520996);

  const result2 = parseXY(data, { bestGuess: true });

  expect(result2.x).toHaveLength(20);
  expect(result2.y).toHaveLength(20);
  expect(result2.x[1]).toBe(100.0045);
  expect(result2.y[1]).toBe(0.772047996520996);
});

test('mass3.asc', () => {
  const data = readFileSync(join(testFilesPath, 'mass3.asc')).toString();

  const result = parseXY(data);

  expect(result.x).toHaveLength(20);
  expect(result.y).toHaveLength(20);
  expect(result.x[1]).toBe(89.01926);
  expect(result.y[1]).toBe(755580);

  const result2 = parseXY(data, { bestGuess: true });

  expect(result2.x).toHaveLength(20);
  expect(result2.y).toHaveLength(20);
  expect(result2.x[1]).toBe(89.01926);
  expect(result2.y[1]).toBe(755580);
});

test('mass4.spectrum', () => {
  const data = readFileSync(join(testFilesPath, 'mass4.spectrum')).toString();
  const result = parseXY(data, { numberColumns: 2 });

  expect(result.x).toHaveLength(34);
  expect(result.y).toHaveLength(34);
  expect(result.x[0]).toBe(88.20765);
  expect(result.y[1]).toBe(13);

  const result2 = parseXY(data, { bestGuess: true });

  expect(result2.x).toHaveLength(34);
  expect(result2.y).toHaveLength(34);
  expect(result2.x[0]).toBe(88.20765);
  expect(result2.y[1]).toBe(13);
});
