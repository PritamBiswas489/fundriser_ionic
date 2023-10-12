import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    regions: {},
};
const stateDataSlice = createSlice({
    name: "stateData",
    initialState: initialState,
    reducers: {
      setRegions(state, action) {
        state.regions = action.payload;
      },
    },
});
export const stateDataActions = stateDataSlice.actions;
export default stateDataSlice;