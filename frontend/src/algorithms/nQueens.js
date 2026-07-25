export function* nQueens(n = 6) {
  const board = Array(n).fill(-1); // board[row] = column index of the queen in that row, -1 = empty
  let attempts = 0;

  function isSafe(row, col) {
    for (let r = 0; r < row; r++) {
      const c = board[r];
      if (c === col) return false; // same column
      if (Math.abs(c - col) === Math.abs(r - row)) return false; // same diagonal
    }
    return true;
  }

  function* place(row) {
    if (row === n) {
      // found a full valid placement
      yield {
        board: [...board],
        row,
        tryingCol: null,
        comparisons: attempts,
        swaps: 0,
        line: null,
        done: true,
        solved: true,
      };
      return true;
    }

    for (let col = 0; col < n; col++) {
      attempts++;
      yield {
        board: [...board],
        row,
        tryingCol: col,
        comparisons: attempts,
        swaps: 0,
        line: 1,
      };

      if (isSafe(row, col)) {
        board[row] = col;
        yield {
          board: [...board],
          row,
          tryingCol: col,
          comparisons: attempts,
          swaps: 0,
          line: 2,
        };

        const solved = yield* place(row + 1);
        if (solved) return true;

        // backtrack
        board[row] = -1;
      }
    }
    return false;
  }

  const found = yield* place(0);
  if (!found) {
    yield {
      board: [...board],
      row: n,
      tryingCol: null,
      comparisons: attempts,
      swaps: 0,
      line: null,
      done: true,
      solved: false,
    };
  }
}