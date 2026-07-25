export default function StatePanel({ comparisons, swaps, done, showSwaps = true }) {
  return (
    <div className="panel">
      <p className="panel__title">State</p>
      <ul className="state-list">
        <li><span>{showSwaps ? "comparisons" : "attempts"}</span><span>{comparisons}</span></li>
        {showSwaps && <li><span>swaps</span><span>{swaps}</span></li>}
      </ul>
      {done && <p className="state-done">complete</p>}
    </div>
  );
}