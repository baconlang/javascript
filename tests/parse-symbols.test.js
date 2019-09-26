import {parseSymbols} from "../src";

test('["a"]', () => {
  const expression = '["a"]';
  expect(parseSymbols(expression)).toEqual(['a']);
});

test('["a", "b"]', () => {
  const expression = '["a", "b"]';
  expect(parseSymbols(expression)).toEqual(['a', 'b']);
});

test('["a", "b", "c"]', () => {
  const expression = '["a", "b", "c"]';
  expect(parseSymbols(expression)).toEqual(['a', 'b', 'c']);
});

test('["a", [["b", ["c", [["d", "e"]], "d"] ]] ]', () => {
  const expression = '["a", [["b", ["c", [["d", "e"]], "d"] ]] ]';
  expect(parseSymbols(expression)).toEqual(['a', 'b', 'c', 'd', 'e']);
});
