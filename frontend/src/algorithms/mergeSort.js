export function* mergeSort(inputArray) {
  const arr = [...inputArray];
  let comparisons = 0;

  function* sort(start, end) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);

    yield* sort(start, mid);   // recurse left half
    yield* sort(mid, end);     // recurse right half

    // merge the two sorted halves back into arr[start..end)
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      comparisons++;
      yield {
        array: [...arr],
        comparing: [start + i, mid + j],
        swapped: null,
        comparisons,
        swaps: 0,
        line: 2,
      };
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      yield {
        array: [...arr],
        comparing: null,
        swapped: [k],
        comparisons,
        swaps: 0,
        line: 3,
      };
      k++;
    }
    // drain any leftovers
    while (i < left.length) {
      arr[k] = left[i];
      i++;
      yield { array: [...arr], comparing: null, swapped: [k], comparisons, swaps: 0, line: 3 };
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      j++;
      yield { array: [...arr], comparing: null, swapped: [k], comparisons, swaps: 0, line: 3 };
      k++;
    }
  }

  yield* sort(0, arr.length);
  yield {
    array: [...arr],
    comparing: null,
    swapped: null,
    comparisons,
    swaps: 0,
    line: null,
    done: true,
  };
}