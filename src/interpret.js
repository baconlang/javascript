import {parse} from './parse';

export function interpret({
  expression,
  symbolMap=false,
  evaluator=false,
}) {
  if (!symbolMap && !evaluator) {
    // Raise error
  }

  if (symbolMap && evaluator) {
    // Raise error
  }

  const queue = parse(expression).map((symbol) => {
    if (symbol === '[' || symbol === ']') {
      return symbol;
    }

    if (
      (symbolMap && symbolMap[symbol])
      || (evaluator && evaluator([symbol]))
    ) {
      return [symbol];
    }
    return [];
  });

  const clusters = [];
  let idx = 0;

  while (idx < queue.length) {
    if (queue[idx] === ']') {
      // Remove elements and set the index to
      // the element before the first bracket
      clusters[clusters.length - 1][0] -= 1;
      // Always delete last to first
      queue.splice(idx, 1);
      queue.splice(clusters[clusters.length - 1][1], 1);
      idx -= 2;
      let andOperator = false;
      // If the current index is not the last
      // And if the next index is a bracket symbol
      // And the last symbol cluster still has space
      if (
        idx < queue.length - 1
        && queue[idx + 1] === ']'
        && clusters[clusters.length - 1][0] > 0
      ) {
        // Remove the elements and set the index
        // to the element before the second bracket
        clusters[clusters.length - 1][0] -= 1;
        // We were immediately behind the last bracket so this is 1
        queue.splice(idx+1, 1);
        queue.splice(clusters[clusters.length-1][1], 1);
        idx -= 1;
        andOperator = true;
      }

      // Set the start of evaluation to the index
      // of the last symbol cluster plus its size
      const evalStart = clusters[clusters.length - 1][1] + clusters[clusters.length - 1][0];
      // Evaluate current symbol cluster
      if (!andOperator) {
        let found = false;
        // If a valid element is found set the range to that
        for (const symbol of queue.slice(evalStart, idx + 1)) {
          if (symbol.length) {
            queue.splice(evalStart, idx-evalStart+1, symbol);
            found = true;
            break;
          }
        }
        // If nothing was found, the range should be false
        if (!found) {
          queue.splice(evalStart, idx-evalStart+1, []);
        }
      } else {
        let new_element = [];
        // If no elements in the range are
        // valid set the range to false
        for (let symbol of queue.slice(evalStart, idx + 1)) {
          if (!symbol.length) {
            new_element = [];
            break;
          }
          new_element.push(...symbol);
        }


        // If evaluator exists
        // and newElement is not empty
        // and evaluator returns false
        // invalidate new element
        if (
          evaluator
          && new_element.length
          && !evaluator(new_element)
        ) {
          new_element = [];
        }

        queue.splice(evalStart, idx-evalStart+1, new_element);
      }

      idx -= idx - evalStart;
      // Clear empty symbol clusters
      if (clusters[clusters.length - 1][0] === 0) {
        clusters.splice(clusters.length-1, 1);
      }

      continue;
  }

  if (queue[idx] === '[') {
    // Extend the current cluster
    if (idx > 0 && queue[idx-1] === '[') {
      clusters[clusters.length-1][0] += 1;
    }

    // The start of a new cluster
    else {
      clusters.push([1, idx]);
    }

    idx += 1;
    continue;
  }

    if (
      idx
      && queue[idx] !== '['
      && queue[idx] !== ']'
      && queue[idx-1] === '['
      && queue[idx+1] === ']'
    ) {
      queue.splice(idx-1, 1);
      queue.splice(idx, 1);
      idx -= 1;
      continue;
    }

    idx += 1;
  }
  return queue[0];
}
