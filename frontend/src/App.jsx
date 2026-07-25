import { useState, useEffect, useRef } from "react";
import { bubbleSort } from "./algorithms/bubbleSort";
import { bubbleSortCode } from "./algorithms/bubbleSortCode";
import { binarySearch } from "./algorithms/binarySearch";
import { mergeSort } from "./algorithms/mergeSort";
import { mergeSortCode } from "./algorithms/mergeSortCode";
import { nQueens } from "./algorithms/nQueens";
import { nQueensCode } from "./algorithms/nQueensCode";
import { useAuth } from "./context/AuthContext";
import { quickSort } from "./algorithms/quickSort";
import { quickSortCode } from "./algorithms/quickSortCode";
import NQueensInput from "./components/NQueensInput";
import ArrayCanvas from "./components/ArrayCanvas";
import NQueensBoard from "./components/NQueensBoard";
import StatePanel from "./components/StatePanel";
import CodePanel from "./components/CodePanel";
import Controls from "./components/Controls";
import AlgorithmTabs from "./components/AlgorithmTabs";
import TraceLog from "./components/TraceLog";
import LoginForm from "./components/LoginForm";
import SavedArrays from "./components/SavedArrays";
import ArrayInput from "./components/ArrayInput";
import "./App.css";

const INITIAL_ARRAY = [5, 2, 8, 1, 9, 3, 7, 4, 6];
const SORTED_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const binarySearchCode = [
  "low = 0, high = n - 1",
  "  mid = (low + high) / 2",
  "  if arr[mid] == target: return mid",
];

// Each algorithm's "kind" decides which visualization component renders,
// and which generator function + pseudocode array is used.
const ALGO_CONFIG = {
  "Bubble Sort": { kind: "array", code: bubbleSortCode },
  "Binary Search": { kind: "array", code: binarySearchCode },
  "Merge Sort": { kind: "array", code: mergeSortCode },
  "Quick Sort": { kind: "array", code: quickSortCode },
  "N-Queens": { kind: "board", code: nQueensCode },
};

function describeStep(algo, s) {
  if (algo === "N-Queens") {
    if (s.done) {
      return s.solved ? { text: "solution found", tag: "done" } : { text: "no solution", tag: "done" };
    }
    return { text: `try queen at (row ${s.row}, col ${s.tryingCol})`, tag: "compare" };
  }
  if (s.done) {
    if (algo === "Binary Search") {
      return s.found >= 0
        ? { text: `found at index ${s.found}`, tag: "done" }
        : { text: "not found", tag: "done" };
    }
    return { text: "sort complete", tag: "done" };
  }
  if (s.swapped) return { text: `write index ${s.swapped[0]}`, tag: "swap" };
  if (s.comparing) return { text: `compare(${s.comparing.join(", ")})`, tag: "compare" };
  return { text: "step", tag: "compare" };
}

function App() {
  const { user, logout } = useAuth();
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [queensN, setQueensN] = useState(6);

  // array-based algorithm state
  const [array, setArray] = useState(INITIAL_ARRAY);
  const [comparing, setComparing] = useState(null);
  const [swapped, setSwapped] = useState(null);

  // N-Queens state
  const [board, setBoard] = useState([]);
  const [queenRow, setQueenRow] = useState(null);
  const [tryingCol, setTryingCol] = useState(null);

  // shared state
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentLine, setCurrentLine] = useState(null);
  const [done, setDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(750);
  const [trace, setTrace] = useState([]);
  const [customArray, setCustomArray] = useState(null); // set via ArrayInput, Part I

  const generatorRef = useRef(null);

  function resetGenerator() {
    const kind = ALGO_CONFIG[selectedAlgo].kind;

    if (selectedAlgo === "Bubble Sort") {
      const base = customArray || INITIAL_ARRAY;
      generatorRef.current = bubbleSort(base);
      setArray(base);
    } else if (selectedAlgo === "Merge Sort") {
      const base = customArray || INITIAL_ARRAY;
      generatorRef.current = mergeSort(base);
      setArray(base);
    } else if (selectedAlgo === "Binary Search") {
      // binary search needs a sorted array; if the user supplied a custom
      // array, sort it first and search for its largest value (guaranteed present)
      const base = customArray ? [...customArray].sort((a, b) => a - b) : SORTED_ARRAY;
      const target = base[base.length - 1];
      generatorRef.current = binarySearch(base, target);
      setArray(base);
    } else if (selectedAlgo === "N-Queens") {
      generatorRef.current = nQueens(queensN);
      setBoard(Array(queensN).fill(-1));
      setQueenRow(null);
      setTryingCol(null);
    } else if (selectedAlgo === "Quick Sort") {
      const base = customArray || INITIAL_ARRAY;
      generatorRef.current = quickSort(base);
     setArray(base);
    }

    setComparing(null);
    setSwapped(null);
    setComparisons(0);
    setSwaps(0);
    setCurrentLine(null);
    setDone(false);
    setIsPlaying(false);
    setTrace([]);
  }

  useEffect(() => {
    resetGenerator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlgo, queensN]);

  function step() {
    if (!generatorRef.current) return;
    const result = generatorRef.current.next();
    if (result.done) {
      setIsPlaying(false);
      return;
    }
    const s = result.value;

    if (ALGO_CONFIG[selectedAlgo].kind === "board") {
      setBoard(s.board);
      setQueenRow(s.row);
      setTryingCol(s.tryingCol);
    } else {
      setArray(s.array);
      setComparing(s.comparing);
      setSwapped(s.swapped || null);
    }

    setComparisons(s.comparisons);
    setSwaps(s.swaps || 0);
    setCurrentLine(s.line);
    setTrace((prev) => [...prev, describeStep(selectedAlgo, s)]);

    if (s.done) {
      setDone(true);
      setIsPlaying(false);
    }
  }

  useEffect(() => {
  if (!isPlaying) return;
  const delay = 1050 - speed; // higher "speed" value = shorter delay = faster
  const interval = setInterval(step, delay);
  return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isPlaying, speed]);

  const { kind, code } = ALGO_CONFIG[selectedAlgo];

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__wordmark">Algorithm Visualizer</h1>
        {user ? (
          <div className="authbar">
            <span>{user.email}</span>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <LoginForm />
        )}
      </header>

      <AlgorithmTabs selected={selectedAlgo} onSelect={setSelectedAlgo} />

      {kind === "array" && (
        <ArrayInput
          onApply={(nums) => {
            setCustomArray(nums);
            setTimeout(resetGenerator, 0);
          }}
        />
      )}

      {kind === "board" && (
        <NQueensInput
          currentN={queensN}
          onApply={(n) => setQueensN(n)}
        />
      )}

      <div className="stage">
        {kind === "array" ? (
          <ArrayCanvas array={array} comparing={comparing} swapped={swapped} />
        ) : (
          <NQueensBoard board={board} row={queenRow} tryingCol={tryingCol} />
        )}
      </div>

      <Controls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying((p) => !p)}
        onStep={step}
        onReset={resetGenerator}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      <div className="panel-row">
        <StatePanel comparisons={comparisons} swaps={swaps} done={done} showSwaps={kind === "array"} />
        <CodePanel code={code} currentLine={currentLine} />
      </div>

      <TraceLog entries={trace} />

      {user && (
        <SavedArrays
          currentArray={array}
          onLoad={(values) => {
            setCustomArray(values);
            setArray(values);
            resetGenerator();
          }}
        />
      )}
    </div>
  );
}

export default App;