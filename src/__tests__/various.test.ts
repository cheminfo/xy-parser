import { readFileSync } from "fs";

import { DataXY, parseXY } from "..";

const path = `${__dirname}/../../testFiles/`;

test("text1", () => {
  let filename = "text1.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data) as DataXY;

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(13);
  expect(result.y).toHaveLength(13);
});

test("text2", () => {
  let filename = "text2.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data) as DataXY;

  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(18);
  expect(result.y).toHaveLength(18);
});

test("text3", () => {
  let filename = "text3.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {
    uniqueX: true,
  }) as DataXY;

  expect(result.x).toBeInstanceOf(Array);
  expect(result).toStrictEqual({ x: [1, 2, 3], y: [3, 3, 9] });
});

test("with some spaces", () => {
  let filename = "text4.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {
    uniqueX: true,
  }) as DataXY;

  expect(result.x).toBeInstanceOf(Array);
  expect(result).toStrictEqual({ x: [1, 2, 3], y: [3, 3, 9] });
});

test("with some spaces and taking second and third column", () => {
  let filename = "text5.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {
    xColumn: 1,
    yColumn: 2,
  });
  expect(result).toStrictEqual({ x: [1, 3, 5], y: [4, 6, 8] });
});

test("with some non numeric lines", () => {
  let filename = "text6.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {});
  expect(result).toStrictEqual({ x: [1, 3, 5], y: [4, 6, 8] });
});

test("with some non numeric lines and keeping info", () => {
  let filename = "text6.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {
    keepInfo: true,
  });
  expect(result).toStrictEqual({
    data: { x: [1, 3, 5], y: [4, 6, 8] },
    info: [
      { position: 0, value: "This file as some header" },
      { position: 0, value: "and we should skip it" },
      { position: 3, value: "The end" },
    ],
  });
});

test("with comma as decimal delimiter", () => {
  let filename = "text7.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {});
  expect(result).toStrictEqual({ x: [1.1, 2.2, 3.3], y: [1, 2, 3] });
});

test("with scientific notation", () => {
  let filename = "text8.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {
    keepInfo: true,
  });
  expect(result).toStrictEqual({
    data: { x: [0.11, -11, 0.11], y: [0.22, -22, 0.22] },
    info: [{ position: 0, value: "Ewe/V <I>/mA" }],
  });
});

test("large IV scientific notation file", () => {
  let filename = "text9.txt";
  let data = readFileSync(path + filename).toString();
  let result = parseXY(data, {}) as DataXY;
  expect(result.x).toHaveLength(6472);
  expect(result.y).toHaveLength(6472);
});
