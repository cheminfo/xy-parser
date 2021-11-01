import { readFileSync } from "fs";

import { DataXY, parseXY } from "..";

const path = `${__dirname}/../../testFiles/`;

describe("Test mass spectra", () => {
  it("mass1.txt", () => {
    let filename = "mass1.txt";
    let data = readFileSync(path + filename).toString();

    let result = parseXY(data) as DataXY;
    expect(result.x).toHaveLength(20);
    expect(result.y).toHaveLength(20);
    expect(result.x[0]).toBe(165.4746);
    expect(result.y[0]).toBe(451);

    let result2 = parseXY(data, { bestGuess: true }) as DataXY;
    expect(result2.x).toHaveLength(20);
    expect(result2.y).toHaveLength(20);
    expect(result2.x[0]).toBe(165.4746);
    expect(result2.y[0]).toBe(451);
  });

  it("mass2.csv", () => {
    let filename = "mass2.csv";
    let data = readFileSync(path + filename).toString();

    let result = parseXY(data, { xColumn: 1, yColumn: 2 }) as DataXY;
    expect(result.x).toHaveLength(20);
    expect(result.y).toHaveLength(20);
    expect(result.x[1]).toBe(100.0045);
    expect(result.y[1]).toBe(0.772047996520996);

    let result2 = parseXY(data, { bestGuess: true }) as DataXY;
    expect(result2.x).toHaveLength(20);
    expect(result2.y).toHaveLength(20);
    expect(result2.x[1]).toBe(100.0045);
    expect(result2.y[1]).toBe(0.772047996520996);
  });

  it("mass3.asc", () => {
    let filename = "mass3.asc";
    let data = readFileSync(path + filename).toString();

    let result = parseXY(data) as DataXY;
    expect(result.x).toHaveLength(20);
    expect(result.y).toHaveLength(20);
    expect(result.x[1]).toBe(89.01926);
    expect(result.y[1]).toBe(755580);

    let result2 = parseXY(data, { bestGuess: true }) as DataXY;
    expect(result2.x).toHaveLength(20);
    expect(result2.y).toHaveLength(20);
    expect(result2.x[1]).toBe(89.01926);
    expect(result2.y[1]).toBe(755580);
  });

  it("mass4.spectrum", () => {
    let filename = "mass4.spectrum";
    let data = readFileSync(path + filename).toString();
    let result = parseXY(data, { numberColumns: 2 }) as DataXY;
    expect(result.x).toHaveLength(34);
    expect(result.y).toHaveLength(34);
    expect(result.x[0]).toBe(88.20765);
    expect(result.y[1]).toBe(13);

    let result2 = parseXY(data, { bestGuess: true }) as DataXY;
    expect(result2.x).toHaveLength(34);
    expect(result2.y).toHaveLength(34);
    expect(result2.x[0]).toBe(88.20765);
    expect(result2.y[1]).toBe(13);
  });
});
