export default function CodePanel({ code, currentLine }) {
  return (
    <div className="panel">
      <p className="panel__title">Pseudocode</p>
      <pre className="code">
        {code.map((line, idx) => (
          <div key={idx} className={`code__line ${idx === currentLine ? "code__line--active" : ""}`}>
            <span className="code__line-number">{idx + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}