import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setLocation,
  setVehicleType,
  toggleFeature,
} from "../store/filtersSlice";
import { EQUIPMENT_FILTERS, VEHICLE_TYPES } from "../constants";
import "../styles/filterPanel.css";

export default function FilterPanel({ onSearch, onReset }) {
  const dispatch = useDispatch();
  const { location, form, features } = useSelector((state) => state.filters);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    onReset();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="filters__group">
        <label className="filters__label" htmlFor="location">
          Location
        </label>
        <input
          id="location"
          type="text"
          className="filters__input"
          placeholder="City, e.g. Kyiv"
          value={location}
          onChange={(e) => dispatch(setLocation(e.target.value))}
        />
      </div>

      <p className="filters__heading">Filters</p>

      <fieldset className="filters__fieldset">
        <legend className="filters__legend">Vehicle equipment</legend>
        {EQUIPMENT_FILTERS.map(({ value, label }) => (
          <label key={value} className="filters__option">
            <input
              type="checkbox"
              checked={features.includes(value)}
              onChange={() => dispatch(toggleFeature(value))}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filters__fieldset">
        <legend className="filters__legend">Vehicle type</legend>
        {VEHICLE_TYPES.map(({ value, label }) => (
          <label key={value} className="filters__option">
            <input
              type="radio"
              name="vehicleType"
              value={value}
              checked={form === value}
              onChange={() => dispatch(setVehicleType(value))}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <button type="submit" className="btn btn--primary btn--block">
        Search
      </button>
      <button type="button" className="btn btn--ghost btn--block" onClick={handleReset}>
        Reset filters
      </button>
    </form>
  );
}
