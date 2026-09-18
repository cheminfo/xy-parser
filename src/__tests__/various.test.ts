import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { parseXY, parseXYAndKeepInfo } from '../index.ts';

const testFilesPath = join(import.meta.dirname, 'data');

test('binary', () => {
  const data = readFileSync(join(testFilesPath, 'text1.txt'));
  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(13);
  expect(result.y).toHaveLength(13);
});

test('text1', () => {
  const data = readFileSync(join(testFilesPath, 'text1.txt')).toString();
  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(13);
  expect(result.y).toHaveLength(13);
});

test('text2', () => {
  const data = readFileSync(join(testFilesPath, 'text2.txt')).toString();
  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(18);
  expect(result.y).toHaveLength(18);
});

test('text3', () => {
  const data = readFileSync(join(testFilesPath, 'text3.txt')).toString();
  const result = parseXY(data, {
    uniqueX: true,
  });

  expect(result.x).toBeInstanceOf(Array);
  expect(result).toStrictEqual({ x: [1, 2, 3], y: [3, 3, 9] });
});

test('with some spaces', () => {
  const data = readFileSync(join(testFilesPath, 'text4.txt')).toString();
  const result = parseXY(data, {
    uniqueX: true,
  });

  expect(result.x).toBeInstanceOf(Array);
  expect(result).toStrictEqual({ x: [1, 2, 3], y: [3, 3, 9] });
});

test('with some spaces and taking second and third column', () => {
  const data = readFileSync(join(testFilesPath, 'text5.txt')).toString();
  const result = parseXY(data, {
    xColumn: 1,
    yColumn: 2,
  });

  expect(result).toStrictEqual({ x: [1, 3, 5], y: [4, 6, 8] });
});

test('with some non numeric lines', () => {
  const data = readFileSync(join(testFilesPath, 'text6.txt')).toString();
  const result = parseXY(data, {});

  expect(result).toStrictEqual({ x: [1, 3, 5], y: [4, 6, 8] });
});

test('with some non numeric lines and keeping info', () => {
  const data = readFileSync(join(testFilesPath, 'text6.txt')).toString();
  const result = parseXYAndKeepInfo(data);

  expect(result).toStrictEqual({
    data: { x: [1, 3, 5], y: [4, 6, 8] },
    info: [
      { position: 0, value: 'This file as some header' },
      { position: 0, value: 'and we should skip it' },
      { position: 3, value: 'The end' },
    ],
  });
});

test('with comma as decimal delimiter', () => {
  const data = readFileSync(join(testFilesPath, 'text7.txt')).toString();
  const result = parseXY(data, {});

  expect(result).toStrictEqual({ x: [1.1, 2.2, 3.3], y: [1, 2, 3] });
});

test('with comma as decimal delimiter and tab as column delimiter', () => {
  const data = readFileSync(join(testFilesPath, 'comma_tab.txt'));
  const result = parseXYAndKeepInfo(data);

  expect(result.info).toStrictEqual([
    { position: 0, value: '##TITLE=No Description' },
    { position: 0, value: '##DATA TYPE=INFRARED SPECTRUM' },
    { position: 0, value: '##XUNITS=1/CM' },
    { position: 0, value: '##YUNITS=%T' },
  ]);
  expect(result.data.x).toHaveLength(1868);
  expect(result.data.y).toHaveLength(1868);
  expect(result.data.x.slice(0, 2)).toStrictEqual([399.264912, 401.193728]);
  expect(result.data.y.slice(0, 2)).toStrictEqual([60.840887, 62.774824]);
  expect(result.data.x.at(-1)).toBe(4000.364384);
  expect(result.data.y.at(-1)).toBe(84.820001);
});

test('should not use keepInfo', () => {
  expect(() => {
    // @ts-expect-error we are testing an old option property
    parseXY('', { keepInfo: true });
  }).toThrow(
    'keepInfo has been deprecated, please use the new method parseXYAndKeepInfo',
  );
});

test('with scientific notation', () => {
  const data = readFileSync(join(testFilesPath, 'text8.txt')).toString();
  const result = parseXYAndKeepInfo(data);

  expect(result).toStrictEqual({
    data: { x: [0.11, -11, 0.11], y: [0.22, -22, 0.22] },
    info: [{ position: 0, value: 'Ewe/V <I>/mA' }],
  });
});

test('large IV scientific notation file', () => {
  const data = readFileSync(join(testFilesPath, 'text9.txt')).toString();
  const result = parseXY(data, {});

  expect(result.x).toHaveLength(6472);
  expect(result.y).toHaveLength(6472);
});
