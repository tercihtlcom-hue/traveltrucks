import "../styles/stars.css";

const STAR_PATH =
  "M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z";

// Renders a 5-star scale; `value` stars are filled.
export default function Stars({ value }) {
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className={n <= value ? "star star--on" : "star"}
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}
