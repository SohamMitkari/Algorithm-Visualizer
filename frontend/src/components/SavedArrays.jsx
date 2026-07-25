import { useState, useEffect } from "react";
import { api } from "../api/client";

export default function SavedArrays({ currentArray, onLoad }) {
  const [saved, setSaved] = useState([]);
  const [name, setName] = useState("");

  async function refresh() {
    try {
      const data = await api.getSavedArrays();
      setSaved(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const [error, setError] = useState("");

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Give this array a name before saving");
      return;
    }
    if (trimmed.length > 60) {
      setError("Name is too long (max 60 characters)");
      return;
    }
    setError("");
    try {
      await api.saveArray(trimmed, currentArray);
      setName("");
      refresh();
    } catch (err) {
      setError(err.message || "Failed to save");
    }
  }

  async function handleDelete(id) {
    await api.deleteArray(id);
    refresh();
  }

  return (
    <div className="saved-arrays">
      <p className="panel__title">Saved arrays</p>
      <div className="saved-arrays__form">
        <input
          placeholder="name this array"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSave}>Save current</button>
      </div>
      {error && <span className="form__error">{error}</span>}
      <ul className="saved-arrays__list">
        {saved.map((s) => (
          <li key={s.id}>
            <span>{s.name}: [{s.values.join(", ")}]</span>
            <span>
              <button onClick={() => onLoad(s.values)}>Load</button>{" "}
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}