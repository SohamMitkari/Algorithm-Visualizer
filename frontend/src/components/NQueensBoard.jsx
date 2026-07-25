export default function NQueensBoard({ board, row, tryingCol }) {
  const n = board.length;
  const cells = [];

  for (let idx = 0; idx < n * n; idx++) {
    const r = Math.floor(idx / n);
    const c = idx % n;
    const hasQueen = board[r] === c;
    const isTrying = row === r && tryingCol === c && !hasQueen;

    let className = "nqueens-cell";
    className += (r + c) % 2 === 0 ? " nqueens-cell--light" : " nqueens-cell--dark";
    if (hasQueen) className += " nqueens-cell--queen";
    if (isTrying) className += " nqueens-cell--trying";

    cells.push(
      <div key={idx} className={className}>
        {hasQueen ? "♛" : ""}
      </div>
    );
  }

  return (
    <div className="nqueens-board" style={{ "--n": n }}>
      {cells}
    </div>
  );
}