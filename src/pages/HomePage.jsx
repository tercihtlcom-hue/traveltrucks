import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  return (
    <main className="hero">
      <div className="container hero__content">
        <h1 className="hero__title">Campers of your dreams</h1>
        <p className="hero__text">You can find everything you want in our catalog</p>
        <Link to="/catalog" className="btn btn--primary hero__cta">
          View Now
        </Link>
      </div>
    </main>
  );
}
