import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    list:[],   
};
const homeListingSlice = createSlice({
    name: "homeListing",
    initialState: initialState,
    reducers: {
        set(state, action) {
            state.list = action.payload;
        }
    }
});

export const homeListingActions = homeListingSlice.actions;
export default homeListingSlice;