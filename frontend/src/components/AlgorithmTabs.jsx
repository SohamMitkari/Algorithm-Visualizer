const ALGORITHMS = ["Bubble Sort", "Binary Search", "Merge Sort", "N-Queens", "Quick Sort"];

export default function AlgorithmTabs({ selected, onSelect }) {
  return (
    <div className="tabs">
      {ALGORITHMS.map((name) => (
        <button
          key={name}
          className={`tabs__tab ${selected === name ? "tabs__tab--active" : ""}`}
          onClick={() => onSelect(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}