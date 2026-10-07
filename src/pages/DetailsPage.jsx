import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCamperById } from "../api/campersApi";
import BookingForm from "../components/BookingForm";
import Gallery from "../components/Gallery";
import Loader from "../components/Loader";
import Stars from "../components/Stars";
import { formatPrice, formatVehicleType, getFeatureBadges } from "../utils/format";
import "../styles/details.css";

const SPECIFICATIONS = [
  ["Form", (c) => formatVehicleType(c.form)],
  ["Length", (c) => c.length],
  ["Width", (c) => c.width],
  ["Height", (c) => c.height],
  ["Tank", (c) => c.tank],
  ["Consumption", (c) => c.consumption],
];

export default function DetailsPage() {
  const { id } = useParams();
  const [result, setResult] = useState({ id: null, camper: null });

  useEffect(() => {
    let ignore = false;
    getCamperById(id)
      .then((camper) => !ignore && setResult({ id, camper }))
      .catch(() => !ignore && setResult({ id, camper: null }));
    return () => {
      ignore = true;
    };
  }, [id]);

  if (result.id !== id) return <Loader text="Loading camper..." />;

  const { camper } = result;
  if (!camper) {
    return (
      <main className="container notice">
        <h1>Camper not found</h1>
        <Link to="/catalog" className="btn btn--primary">
          Back to catalog
        </Link>
      </main>
    );
  }

  const reviews = camper.reviews ?? [];

  return (
    <main className="container details">
      <header className="details__header">
        <h1 className="details__title">{camper.name}</h1>
        <p className="details__meta">
          <span>
            {camper.rating} ({reviews.length} Reviews)
          </span>
          <span>{camper.location}</span>
        </p>
        <p className="details__price">{formatPrice(camper.price)}</p>
      </header>

      <Gallery images={camper.gallery} name={camper.name} />
      <p className="details__description">{camper.description}</p>

      <div className="details__columns">
        <div>
          <section className="panel">
            <h2 className="panel__title">Features</h2>
            <ul className="badges">
              {getFeatureBadges(camper).map((badge) => (
                <li key={badge} className="badge">
                  {badge}
                </li>
              ))}
            </ul>

            <h3 className="panel__subtitle">Vehicle details</h3>
            <dl className="specs">
              {SPECIFICATIONS.filter(([, getValue]) => getValue(camper)).map(
                ([label, getValue]) => (
                  <div key={label} className="specs__row">
                    <dt>{label}</dt>
                    <dd>{getValue(camper)}</dd>
                  </div>
                ),
              )}
            </dl>
          </section>

          <section className="panel" aria-labelledby="reviews-title">
            <h2 id="reviews-title" className="panel__title">
              Reviews
            </h2>
            {reviews.length === 0 && <p>No reviews yet.</p>}
            <ul className="reviews">
              {reviews.map((review, index) => (
                <li key={`${review.reviewer_name}-${index}`} className="review">
                  <span className="review__avatar" aria-hidden="true">
                    {review.reviewer_name?.[0]?.toUpperCase()}
                  </span>
                  <div>
                    <p className="review__name">{review.reviewer_name}</p>
                    <Stars value={review.reviewer_rating} />
                    <p className="review__text">{review.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <BookingForm camperName={camper.name} />
      </div>
    </main>
  );
}
