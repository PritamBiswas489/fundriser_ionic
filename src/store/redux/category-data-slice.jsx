import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  selectedCategory:0,
};
const categoryDataSlice = createSlice({
  name: "offerData",
  initialState: initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload.categories;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload.selectedCategory;
    },
  },
});

export const categoryDataActions = categoryDataSlice.actions;
export default categoryDataSlice;
