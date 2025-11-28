import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory: "all",
  subcategories: [],
  selectedSubcategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubcategory = null; // Reset subcategory when category changes
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setSelectedSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
    },
    resetCategoryFilter: (state) => {
      state.selectedCategory = "all";
      state.selectedSubcategory = null;
    },
  },
});

export const {
  setCategoriesStart,
  setCategoriesSuccess,
  setCategoriesFailure,
  setSelectedCategory,
  setSubcategories,
  setSelectedSubcategory,
  resetCategoryFilter,
} = categorySlice.actions;

export default categorySlice.reducer;
