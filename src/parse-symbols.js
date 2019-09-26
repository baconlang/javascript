import {parse} from './parse';

export function parseSymbols(expression) {
  return [...new Set(parse(expression).filter((symbol) => symbol !== '[' && symbol != ']'))];
}
