import {interpret} from '../interpret';

export class SymbolMap {
  constructor(
    expression,
    symbolMap,
  ) {
    this.symbolMap = symbolMap;
    this.evaluation = interpret({
      expression,
      symbolMap,
    });
  }
}
