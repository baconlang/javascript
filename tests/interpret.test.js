import {interpret} from "../src";
import {symGen} from "./index";

const a = 'a';
const b = 'b';
const c = 'c';

function assertEvaluator(expression, cases) {
  for (const c of cases) {
    const symbolMap = symGen(c[0]);

    const evaluator = (symbols) => {
      console.log(symbols, symbolMap);
      for (let i = 0; i < symbols.length; i++) {
        if(!symbolMap[symbols[i]]) {
          return false;
        }
      }
      return true;
    };
    const evaluation = interpret({expression, evaluator});
    console.log(`
      expression: ${expression}
      case: ${c}
      evaluation: ${evaluation}
    `);
    expect(evaluation).toEqual(c[1]);
  }
}

function assertSymbolMap(expression, cases) {
  for (const c of cases) {
    const symbolMap = symGen(c[0]);
    const evaluation = interpret({expression, symbolMap});
    console.log(`
      expression: ${expression}
      case: ${c[1]}
      evaluation: ${evaluation}
    `);
    expect(evaluation).toEqual(c[1]);
  }
}

const singleScenarios = [
  ['0', [ ]],
  ['1', [ a ]],
];

const singleExpressions = [
  ['["a"]', singleScenarios],
  ['[["a"]]', singleScenarios],
  ['[[["a"]]]', singleScenarios],
];

test('"a" (symbol map)', () => {
  singleExpressions.forEach((expression) => {
    assertSymbolMap(...expression);
  })
});

test('"a" (evaluator)', () => {
  singleExpressions.forEach((expression) => {
    assertEvaluator(...expression);
  })
});

const doubleExpressions = [
  [
    '["a", "b"]',
    [
      ['00', [ ]],
      ['10', [ a ]],
      ['01', [ b ]],
      ['11', [ a ]],
    ],
  ],
    [
      '[["a", "b"]]',
      [

        ['00', [ ]],
        ['10', [ ]],
        ['01', [ ]],
        ['11', [ a, b ]],
      ],
    ],
];

test('"a", "b" (symbol map)', () => {
  doubleExpressions.forEach((expression) => {
    assertSymbolMap(...expression);
  })
});

test('"a", "b" (evaluator)', () => {
  doubleExpressions.forEach((expression) => {
    assertEvaluator(...expression);
  })
});

const tripleScenarios1 = [
    ['000', [ ]],
    ['100', [ a ]],
    ['010', [ b ]],
    ['110', [ a ]],
    ['001', [ c ]],
    ['101', [ a ]],
    ['011', [ b ]],
    ['111', [ a ]],
];

const tripleScenarios2 = [
    ['000', [ ]],
    ['100', [ ]],
    ['010', [ ]],
    ['110', [ ]],
    ['001', [ ]],
    ['101', [ ]],
    ['011', [ ]],
    ['111', [ a, b, c ]],
];

const tripleExpressions = [
  ['["a", "b", "c"]', tripleScenarios1],
  ['[["a", "b"], "c"]', tripleScenarios1],
  ['["a", ["b", "c"]]', tripleScenarios1],
  [
    '[[["a", "b"]], "c"]',
    ['000', [ ]],
    ['100', [ ]],
    ['010', [ ]],
    ['110', [ a, b ]],
    ['001', [ c ]],
    ['101', [ c ]],
    ['011', [ c ]],
    ['111', [ a, b ]],
  ],
  [
    '["a", [["b", "c"]]]',
    ['000', [ ]],
    ['100', [ a ]],
    ['010', [ ]],
    ['110', [ a ]],
    ['001', [ ]],
    ['101', [ a ]],
    ['011', [ b, c ]],
    ['111', [ a ]],
  ],
  ['[["a", "b", "c"]]', tripleScenarios2],
  ['[[[["a", "b"]], "c"]]', tripleScenarios2],
  ['[["a", [["b", "c"]]]]', tripleScenarios2],
  [
    '[[["a", "b"], "c"]]',
    ['000', [ ]],
    ['100', [ ]],
    ['010', [ ]],
    ['110', [ ]],
    ['001', [ ]],
    ['101', [ a, c ]],
    ['011', [ b, c ]],
    ['111', [ a, c ]],
  ],
  [
    '[["a", ["b", "c"]]]',
    ['000', [ ]],
    ['100', [ ]],
    ['010', [ ]],
    ['110', [ a, b ]],
    ['001', [ ]],
    ['101', [ a, c ]],
    ['011', [ ]],
    ['111', [ a, b ]],
  ],
];

test.only('"a", "b", "c" (symbol map)', () => {
  tripleExpressions.forEach((expression) => {
    assertSymbolMap(...expression);
  })
});

test('"a", "b", "c" (evaluator)', () => {
  tripleExpressions.forEach((expression) => {
    assertEvaluator(...expression);
  })
});
