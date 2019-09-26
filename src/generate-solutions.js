import {generateSymbolMaps} from './generate-symbol-maps';

export function generateSolutions(expression) {
  return [...new Set(
    generateSymbolMaps(expression).map((symbolMap) => symbolMap.evaluation.join(','))
  )].map((solution) => solution.split(','));
}

