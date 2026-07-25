export const nQueensCode = [
  "for col in 0..n-1:",
  "  if isSafe(row, col): place queen, recurse row+1",
  "  else: backtrack, try next column",
];