export function* bubbleSort(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      yield {
        array: [...arr],
        comparing: [j, j + 1],
        swapped: null,
        comparisons,
        swaps,
        line: 3,
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        yield {
          array: [...arr],
          comparing: null,
          swapped: [j, j + 1],
          comparisons,
          swaps,
          line: 4,
        };
      }
    }
  }

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