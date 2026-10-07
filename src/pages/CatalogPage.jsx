import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../store/campersSlice";
import { defaultFilters, resetFilters } from "../store/filtersSlice";
import FilterPanel from "../components/FilterPanel";
import CamperCard from "../components/CamperCard";
import Loader from "../components/Loader";
import "../styles/catalog.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { items, page, hasMore, status, error, activeFilters } = useSelector(
    (state) => state.campers,
  );

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(fetchCampers({ page: 1, filters: defaultFilters }));
  }, [dispatch]);

  const search = () => dispatch(fetchCampers({ page: 1, filters }));
  const reset = () => dispatch(fetchCampers({ page: 1, filters: defaultFilters }));
  // "Load more" keeps using the filters of the last submitted search
  const loadMore = () =>
    dispatch(fetchCampers({ page: page + 1, filters: activeFilters }));

  const isLoading = status === "loading";
  const isEmpty = !isLoading && !error && items.length === 0;

  return (
    <main className="container catalog">
      <aside className="catalog__sidebar">
        <FilterPanel onSearch={search} onReset={reset} />
      </aside>

      <section className="catalog__results" aria-live="polite">
        {error && (
          <p className="notice notice--error" role="alert">
            Could not load campers: {error}
          </p>
        )}

        {items.length > 0 && (
          <ul className="catalog__list">
            {items.map((camper) => (
              <li key={camper.id}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>
        )}

        {isLoading && <Loader text="Loading campers..." />}

        {isEmpty && (
          <div className="notice">
            <h2>No campers found</h2>
            <p>Try changing or resetting the filters.</p>
          </div>
        )}

        {hasMore && !isLoading && (
          <button type="button" className="btn btn--outline catalog__more" onClick={loadMore}>
            Load more
          </button>
        )}
      </section>
    </main>
  );
}
