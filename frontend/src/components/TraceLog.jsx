export default function TraceLog({ entries }) {
  return (
    <div className="trace-log">
      <p className="panel__title">Trace log</p>
      <div className="trace-log__entries">
        {[...entries].reverse().map((entry, idx) => {
          const realIndex = entries.length - idx;
          return (
            <div className="trace-log__entry" key={realIndex}>
              <span className="trace-log__index">#{String(realIndex).padStart(4, "0")}</span>
              <span className={`trace-log__tag trace-log__tag--${entry.tag}`}>{entry.tag}</span>
              <span>{entry.text}</span>
            </div>
          );
        })}
        {entries.length === 0 && <div className="trace-log__entry">no steps yet — press Step or Play</div>}
      </div>
    </div>
  );
}