import "../styles/loader.css";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <p className="loader__text">{text}</p>
    </div>
  );
}
