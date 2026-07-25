export function* binarySearch(sortedArray, target) {
  const arr = [...sortedArray];
  let low = 0;
  let high = arr.length - 1;
  let comparisons = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    yield {
      array: arr,
      comparing: [mid],
      comparisons,
      swaps: 0,
      found: null,
      line: 2,
    };

    if (arr[mid] === target) {
      yield { array: arr, comparing: [mid], comparisons, swaps: 0, found: mid, line: 3, done: true };
      return;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  yield { array: arr, comparing: null, comparisons, swaps: 0, found: -1, line: null, done: true };
}