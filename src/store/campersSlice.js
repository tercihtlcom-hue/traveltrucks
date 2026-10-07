import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCampers } from "../api/campersApi";
import { PAGE_SIZE } from "../constants";
import { buildParams } from "../utils/buildParams";
import { defaultFilters } from "./filtersSlice";

// Filtering and pagination are done by the backend (query params).
export const fetchCampers = createAsyncThunk(
  "campers/fetch",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      const items = await getCampers({
        ...buildParams(filters),
        page,
        limit: PAGE_SIZE,
      });
      return { items, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    page: 1,
    hasMore: false,
    status: "idle", // idle | loading | failed
    error: null,
    activeFilters: defaultFilters, // filters of the last submitted search
    lastRequestId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state, { meta }) => {
        state.status = "loading";
        state.error = null;
        state.lastRequestId = meta.requestId;
        if (meta.arg.page === 1) {
          // New search: drop the previous results
          state.items = [];
          state.hasMore = false;
          state.activeFilters = meta.arg.filters;
        }
      })
      .addCase(fetchCampers.fulfilled, (state, { meta, payload }) => {
        if (meta.requestId !== state.lastRequestId) return; // outdated response
        state.status = "idle";
        state.page = payload.page;
        state.items = [...state.items, ...payload.items];
        state.hasMore = payload.items.length === PAGE_SIZE;
      })
      .addCase(fetchCampers.rejected, (state, { meta, payload, error }) => {
        if (meta.requestId !== state.lastRequestId) return;
        state.status = "failed";
        state.error = payload ?? error.message;
      });
  },
});

export const campersReducer = campersSlice.reducer;
