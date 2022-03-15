import { DataXY, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';
import mlArrayMax from 'ml-array-max';
import uniqueXFunction from 'ml-arrayxy-uniquex';
import { xIsMonotone } from 'ml-spectra-processing';

import { ParseXYOptions } from './ParseXYOptions';

/**
 * General internal parsing function
 *
 * @param text - Csv or tsv strings.
 * @param options - Parsing options
 * @returns parsed text file with column information
 */
export function parse(
  text: TextData,
  options: ParseXYOptions = {},
): {
  info: { position: number; value: string }[];
  data: DataXY;
} {
  let {
    rescale = false,
    uniqueX = false,
    xColumn = 0,
    yColumn = 1,
    bestGuess = false,
    //@ts-expect-error old library used this property and we want to throw an error so that people are forced to migrate
    keepInfo,
    numberColumns = Number.MAX_SAFE_INTEGER,
    maxNumberColumns = Number.MAX_SAFE_INTEGER,
    minNumberColumns = 2,
  } = options;

  if (keepInfo !== undefined) {
    throw new Error(
      'keepInfo has been deprecated, pelase use the new method parseXYAndKeepInfo',
    );
  }

  text = ensureString(text);

  maxNumberColumns = Math.max(maxNumberColumns, xColumn + 1, yColumn + 1);
  minNumberColumns = Math.max(xColumn + 1, yColumn + 1, minNumberColumns);

  let lines = text.split(/[\r\n]+/);

  let matrix: number[][] = [];
  let info: { position: number; value: string }[] = [];
  let position = 0;
  lines.forEach((line) => {
    line = line.trim();
    // we will consider only lines that contains only numbers
    if (/[0-9]+/.test(line) && /^[0-9eE,;. \t+-]+$/.test(line)) {
      let fields = line.split(/,[; \t]+|[; \t]+/);
      if (fields.length === 1) {
        fields = line.split(/[,; \t]+/);
      }
      if (
        fields &&
        fields.length >= minNumberColumns && // we filter lines that have not enough or too many columns
        fields.length <= maxNumberColumns
      ) {
        matrix.push(fields.map((value) => parseFloat(value.replace(',', '.'))));
        position++;
      }
    } else if (line) {
      info.push({ position, value: line });
    }
  });

  if (bestGuess) {
    if (
      matrix[0] &&
      matrix[0].length === 3 &&
      options.xColumn === undefined &&
      options.yColumn === undefined
    ) {
      // is the first column a seuqnetial number ?
      let skipFirstColumn = true;
      for (let i = 0; i < matrix.length - 1; i++) {
        if (Math.abs(matrix[i][0] - matrix[i + 1][0]) !== 1) {
          skipFirstColumn = false;
        }
      }
      if (skipFirstColumn) {
        xColumn = 1;
        yColumn = 2;
      }
    }
    if (matrix[0] && matrix[0].length > 3) {
      const xs: number[] = [];
      for (let row of matrix) {
        for (let i = xColumn; i < row.length; i += 2) {
          xs.push(row[i]);
        }
      }
      if (xIsMonotone(xs)) {
        numberColumns = 2;
      }
    }
  }

  if (numberColumns) {
    const newMatrix: number[][] = [];
    for (const row of matrix) {
      for (let i = 0; i < row.length; i += numberColumns) {
        newMatrix.push(row.slice(i, i + numberColumns));
      }
    }
    matrix = newMatrix;
  }
  const result = {
    x: matrix.map((row) => row[xColumn]),
    y: matrix.map((row) => row[yColumn]),
  };

  if (uniqueX) {
    uniqueXFunction(result);
  }

  if (rescale) {
    let maxY = mlArrayMax(result.y);
    for (let i = 0; i < result.y.length; i++) {
      result.y[i] /= maxY;
    }
  }

  return {
    info,
    data: result,
  };
}
