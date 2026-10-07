import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { formatPrice, formatVehicleType, getFeatureBadges } from "../utils/format";
import "../styles/camperCard.css";

const MAX_BADGES = 6;

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.ids.includes(String(camper.id)),
  );

  const badges = getFeatureBadges(camper);
  const reviewsCount = camper.reviews?.length ?? 0;
  const cover = camper.gallery?.[0];

  return (
    <article className="card">
      <img
        className="card__image"
        src={cover?.thumb ?? cover?.original}
        alt={camper.name}
        loading="lazy"
      />

      <div className="card__body">
        <div className="card__top">
          <h2 className="card__title">{camper.name}</h2>
          <p className="card__price">{formatPrice(camper.price)}</p>
          <button
            type="button"
            className={isFavorite ? "fav fav--on" : "fav"}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => dispatch(toggleFavorite(camper.id))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <p className="card__meta">
          <span className="card__rating">
            <svg viewBox="0 0 20 20" className="star star--on" aria-hidden="true">
              <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z" />
            </svg>
            {camper.rating} ({reviewsCount} Reviews)
          </span>
          <span>{camper.location}</span>
          <span>{formatVehicleType(camper.form)}</span>
        </p>

        <p className="card__description">{camper.description}</p>

        <ul className="badges">
          {badges.slice(0, MAX_BADGES).map((badge) => (
            <li key={badge} className="badge">
              {badge}
            </li>
          ))}
        </ul>

        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary card__link"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
