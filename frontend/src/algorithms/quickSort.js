export function* quickSort(inputArray) {
  const arr = [...inputArray];
  let comparisons = 0;
  let swaps = 0;

  function* partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      yield {
        array: [...arr],
        comparing: [j, high],
        swapped: null,
        comparisons,
        swaps,
        line: 2,
      };

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        yield {
          array: [...arr],
          comparing: null,
          swapped: [i, j],
          comparisons,
          swaps,
          line: 3,
        };
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    yield {
      array: [...arr],
      comparing: null,
      swapped: [i + 1, high],
      comparisons,
      swaps,
      line: 4,
    };

    return i + 1;
  }

  function* sort(low, high) {
    if (low >= high) return;
    const pivotIndex = yield* partition(low, high);
    yield* sort(low, pivotIndex - 1);
    yield* sort(pivotIndex + 1, high);
  }

  yield* sort(0, arr.length - 1);
  yield {
    array: [...arr],
    comparing: null,
    swapped: null,
    comparisons,
    swaps,
    line: null,
    done: true,
  };
}