export interface ParseXYOptions {
  /**
   *  Will set the maximum value to 1.
   * @default false
   */
  rescale?: boolean;
  /**
   * Make the X values unique (works only with 'xxyy' format). If the X value is repeated the sum of Y is done.
   * @default false
   */
  uniqueX?: boolean;
  /**
   * A number that specifies the x column.
   * @default 0
   */
  xColumn?: number;
  /**
   * A number that specifies the y column.
   * @default 1
   */
  yColumn?: number;
  /**
   *  Will try to guess which columns are the best.
   * @default false
   */
  bestGuess?: boolean;
  /**
   * If the file has 10 columns and you specify here 2 it will reflow the file.
   * @default Number.MAX_SAFE_INTEGER
   */
  numberColumns?: number;
  /**
   * A number that specifies the maximum number of y columns.
   * @default "Math.max(xColumn, yColumn)+1"
   */
  maxNumberColumns?: number;
  /**
   * A number that specifies the minimum number of y columns.
   * @default "Math.min(xColumn, yColumn)+1"
   */
  minNumberColumns?: number;
}
