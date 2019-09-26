import {
  interpret,
} from '../src';

test.skip('evaluates correctly', () => {
  const expression = '[["hello", "world"]]';
  const symbolMap = {
    hello: true,
    world: true,
  };

  expect(interpret({
    expression,
    symbolMap,
  })).toEqual(['hello', 'world'])
});
