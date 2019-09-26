import {generateSolutions, generateSymbolMaps} from '../src';

test.skip('["a"]', () => {
  const expression = '["a"]';
  const solutions = generateSolutions(expression);
  expect(solutions).toEqual([
    ['a'],
  ]);
});

test.skip('["a", "b"]', () => {
  let expression = '["a", "b"]';
  const solutions = generateSolutions(expression);
  expect(solutions).toEqual([
    ['a'],
    ['b'],
  ]);
});

test.skip('[["a", "b"]]', () => {
  const expression = '[["a", "b"]]';
  const solutions = generateSolutions(expression);
  expect(solutions).toEqual([
    ['a', 'b'],
  ]);
});

test.skip('["a", [["b", ["c", [["d", "e"]], "d"] ]] ]', () => {
  const expression = '["a", [["b", ["c", [["d", "e"]], "d"] ]] ]';
  const solutions = generateSolutions(expression);
  // generateSymbolMaps(expression).forEach((symbolMap) => console.log(symbolMap.symbolMap));
  expect(solutions).toEqual([
    ["a"],
    ["b", "c"],
    ["b", "d", "e"],
    ["b", "e"],
    ['a'],
  ]);
});
