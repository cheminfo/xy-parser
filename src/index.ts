import { ParseXYOptions } from './ParseXYOptions';
import { parse } from './parse';

export * from './ParseXYOptions';

/**
 * Parse a text-file and convert it to an object {x:[], y:[]}
 *
 * @param text - Csv or tsv strings.
 * @param options - Parsing options
 * @returns - The parsed data
 */
export function parseXY(text: string, options: ParseXYOptions = {}) {
  return parse(text, options).data;
}

/**
 * Parse a text-file and returns the parsed data and information about the columns
 *
 * @param text - Csv or tsv strings.
 * @param options - Parsing options
 * @returns - The parsed data with information about the columns
 */
export function parseXYAndKeepInfo(text: string, options: ParseXYOptions = {}) {
  return parse(text, options);
}
