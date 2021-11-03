import { readFileSync } from "fs";

import { DataXY, parseXY } from "../index";

const path = `${__dirname}/../../testFiles/`;

test("ir.asc", () => {
  let filename = "ir.asc";
  let data = readFileSync(path + filename).toString();

  let result = parseXY(data) as DataXY;
  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(3401);
  expect(result.y).toHaveLength(3401);
});

test("ir2.asc", () => {
  let filename = "ir2.asc";
  let data = readFileSync(path + filename).toString();

  let result = parseXY(data) as DataXY;

  let min = Math.min(...result.y);
  let max = Math.max(...result.y);

  expect(min).toBeCloseTo(5.604768, 3);
  expect(max).toBeCloseTo(516.448984, 3);
  expect(result.x).toBeInstanceOf(Array);
  expect(result.y).toBeInstanceOf(Array);
  expect(result.x).toHaveLength(3551);
  expect(result.y).toHaveLength(3551);
});
