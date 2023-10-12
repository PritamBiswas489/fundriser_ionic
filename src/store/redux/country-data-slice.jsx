import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  countries: [],
};
const countryDataSlice = createSlice({
  name: "countryData",
  initialState: initialState,
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
    },
  },
});

export const countryDataActions = countryDataSlice.actions;
export default countryDataSlice;
