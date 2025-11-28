import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  searchResults: [],
  featuredItems: [],
  filters: {
    category: "all",
    subcategory: null,
    location: null,
    district: null,
    minPrice: null,
    maxPrice: null,
    sortBy: "price-low-high",
  },
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setItemsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
    },
    setFeaturedItems: (state, action) => {
      state.featuredItems = action.payload;
    },
    setItemFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetItemFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  setItemsStart,
  setItemsSuccess,
  setItemsFailure,
  setCurrentItem,
  setSearchResults,
  setFeaturedItems,
  setItemFilter,
  resetItemFilters,
  clearSearchResults,
} = itemSlice.actions;

export default itemSlice.reducer;
