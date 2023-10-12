import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    totalData:0,
   
};
const fundriserListingSlice = createSlice({
    name: "fundriserListing",
    initialState: initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setTotalData(state, action) {
            state.totalData = action.payload;
        },
        
    }
});

export const fundriserListingActions = fundriserListingSlice.actions;
export default fundriserListingSlice;