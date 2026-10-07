import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campersSlice";
import { filtersReducer } from "./filtersSlice";
import { favoritesReducer, saveFavorites } from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

// Keep favorites in localStorage so they survive a page reload
let savedIds = store.getState().favorites.ids;
store.subscribe(() => {
  const { ids } = store.getState().favorites;
  if (ids !== savedIds) {
    savedIds = ids;
    saveFavorites(ids);
  }
});
