import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "traveltrucks:favorites";

const readStoredIds = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored.map(String) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // storage may be unavailable (private mode) — favorites just won't persist
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: readStoredIds() },
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const id = String(payload);
      state.ids = state.ids.includes(id)
        ? state.ids.filter((item) => item !== id)
        : [...state.ids, id];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
