export default function ArrayCanvas({ array, comparing, swapped }) {
  const maxVal = Math.max(...array, 1);

  return (
    <>
      {array.map((value, idx) => {
        let modifier = "bar--default";
        if (comparing && comparing.includes(idx)) modifier = "bar--comparing";
        if (swapped && swapped.includes(idx)) modifier = "bar--swapped";

        return (
          <div
            key={idx}
            className={`bar ${modifier}`}
            style={{ height: `${(value / maxVal) * 240}px` }}
          >
            {value}
          </div>
        );
      })}
    </>
  );
}