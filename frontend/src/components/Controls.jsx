export default function Controls({ isPlaying, onPlayPause, onStep, onReset, speed, onSpeedChange }) {
  return (
    <div className="controls">
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={onStep} disabled={isPlaying}>Step</button>
      <button onClick={onReset}>Reset</button>
      <label className="controls__speed">
        speed
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
      </label>
    </div>
  );
}