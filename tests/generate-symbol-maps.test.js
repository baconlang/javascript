import {
  SymbolMap,
  generateSymbolMaps,
} from '../src';

test.skip('["a"]', () => {
  const expression = '["a"]';
  const symbolMaps = generateSymbolMaps(expression);
  expect(symbolMaps).toHaveLength(2**1);
  for (const symbolMap of symbolMaps) {
    expect(symbolMap).toBeInstanceOf(SymbolMap);
  }
});

test.skip('["a", "b", "c", "d", "a"]', () => {
  const expression = '["a", "b", "c", "d", "a"]';
  const symbolMaps = generateSymbolMaps(expression);
  expect(symbolMaps).toHaveLength(2**4);
  for (const symbolMap of symbolMaps) {
    expect(symbolMap).toBeInstanceOf(SymbolMap);
  }
});


test.skip('["a", "b", "c", "d", "a", "e", "f", "g", "h", "i"]', () => {
  const expression = '["a", "b", "c", "d", "a", "e", "f", "g", "h", "i"]';
  const symbolMaps = generateSymbolMaps(expression);
  expect(symbolMaps).toHaveLength(2**9);
  for (const symbolMap of symbolMaps) {
    expect(symbolMap).toBeInstanceOf(SymbolMap);
  }
});

test.skip('["a", [["b", ["c", [["d", "e"]], "d"] ]] ]', () => {
  const expression = '["a", [["b", ["c", [["d", "e"]], "d"] ]] ]';
  const symbolMaps = generateSymbolMaps(expression);
  expect(symbolMaps).toHaveLength(2**5);
  for (const symbolMap of symbolMaps) {
    expect(symbolMap).toBeInstanceOf(SymbolMap);
  }
});
