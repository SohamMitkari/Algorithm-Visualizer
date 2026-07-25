import { useState } from "react";

const MIN_N = 4;
const MAX_N = 10;

export default function NQueensInput({ currentN, onApply }) {
  const [value, setValue] = useState(String(currentN));
  const [error, setError] = useState("");

  function handleApply() {
    const n = Number(value);

    if (!Number.isInteger(n)) {
      setError("Enter a whole number");
      return;
    }
    if (n < MIN_N || n > MAX_N) {
      setError(`Choose a value between ${MIN_N} and ${MAX_N}`);
      return;
    }
    setError("");
    onApply(n);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleApply();
  }

  return (
    <div className="form" style={{ marginBottom: "16px" }}>
      <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-muted)" }}>
        board size (n):
      </label>
      <input
        type="number"
        min={MIN_N}
        max={MAX_N}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: "60px" }}
      />
      <button onClick={handleApply}>Apply</button>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}