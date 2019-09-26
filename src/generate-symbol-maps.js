import {parseSymbols} from './parse-symbols';
import {SymbolMap} from './classes/symbol-map';

export function generateSymbolMaps(expression) {
  const symbols = parseSymbols(expression);
  const symbolMaps = new Array(2**symbols.length);
  for (let i = 0; i < symbolMaps.length; i++) {
    let binary = i.toString(2);
    binary = '0'.repeat(symbols.length - binary.length) + binary;

    const symbolMap = {};
    [...binary].forEach((bit, j) => symbolMap[symbols[j]] = bit);

    symbolMaps[i] = new SymbolMap(
      expression,
      symbolMap,
    )
  }

  return symbolMaps;
}
