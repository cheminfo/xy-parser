import { readFileSync } from 'fs';

import { parseXY, parseXYAndKeepInfo } from '..';

const path = `${__dirname}/../../testFiles/`;

test('binary', () => {
  const filename = 'text1.txt';
  const data = readFileSync(path + filename);
  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(13);
  expect(result.y).toHaveLength(13);
});

test('text1', () => {
  const filename = 'text1.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(13);
  expect(result.y).toHaveLength(13);
});

test('text2', () => {
  const filename = 'text2.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data);

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(18);
  expect(result.y).toHaveLength(18);
});

test('text3', () => {
  const filename = 'text3.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data, {
    uniqueX: true,
  });

  expect(result.x).toBeInstanceOf(Array);
  expect(result).toStrictEqual({ x: [1, 2, 3], y: [3, 3, 9] });
});

test('with some spaces', () => {
  const filename = 'text4.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data, {
    uniqueX: true,
  });

  expect(result.x).toBeInstanceOf(Array);
  expect(result).toStrictEqual({ x: [1, 2, 3], y: [3, 3, 9] });
});

test('with some spaces and taking second and third column', () => {
  const filename = 'text5.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data, {
    xColumn: 1,
    yColumn: 2,
  });
  expect(result).toStrictEqual({ x: [1, 3, 5], y: [4, 6, 8] });
});

test('with some non numeric lines', () => {
  const filename = 'text6.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data, {});
  expect(result).toStrictEqual({ x: [1, 3, 5], y: [4, 6, 8] });
});

test('with some non numeric lines and keeping info', () => {
  const filename = 'text6.txt';
  const data = readFileSync(path + filename).toString();
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
  const filename = 'text7.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data, {});
  expect(result).toStrictEqual({ x: [1.1, 2.2, 3.3], y: [1, 2, 3] });
});

test('should not use keepInfo', () => {
  expect(() => {
    // @ts-expect-error we are testing an old option property
    parseXY('', { keepInfo: true });
  }).toThrow(
    'keepInfo has been deprecated, pelase use the new method parseXYAndKeepInfo',
  );
});

test('with scientific notation', () => {
  const filename = 'text8.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXYAndKeepInfo(data);
  expect(result).toStrictEqual({
    data: { x: [0.11, -11, 0.11], y: [0.22, -22, 0.22] },
    info: [{ position: 0, value: 'Ewe/V <I>/mA' }],
  });
});

test('large IV scientific notation file', () => {
  const filename = 'text9.txt';
  const data = readFileSync(path + filename).toString();
  const result = parseXY(data, {});
  expect(result.x).toHaveLength(6472);
  expect(result.y).toHaveLength(6472);
});
