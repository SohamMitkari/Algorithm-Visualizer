import { useState } from "react";

export default function ArrayInput({ onApply }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleApply() {
  const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
  const nums = parts.map(Number);

    if (nums.length < 2) {
      setError("Enter at least 2 comma-separated numbers");
      return;
    }
    if (nums.length > 20) {
      setError("Max 20 numbers — larger arrays get hard to read as bars");
      return;
    }
    if (nums.some((n) => Number.isNaN(n))) {
      setError("All values must be numbers");
      return;
    }
    if (nums.some((n) => !Number.isInteger(n) || n < 0 || n > 999)) {
      setError("Use whole numbers between 0 and 999");
      return;
    }
    setError("");
    onApply(nums);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleApply();
  }

  return (
    <div className="form" style={{ marginBottom: "16px" }}>
      <input
        placeholder="e.g. 5, 2, 8, 1, 9"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleApply}>Use this array</button>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}