import { createSlice } from "@reduxjs/toolkit";

export const defaultFilters = { location: "", form: "", features: [] };

const filtersSlice = createSlice({
  name: "filters",
  initialState: defaultFilters,
  reducers: {
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
    setVehicleType: (state, { payload }) => {
      state.form = payload;
    },
    toggleFeature: (state, { payload }) => {
      state.features = state.features.includes(payload)
        ? state.features.filter((feature) => feature !== payload)
        : [...state.features, payload];
    },
    resetFilters: () => defaultFilters,
  },
});

export const { setLocation, setVehicleType, toggleFeature, resetFilters } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
