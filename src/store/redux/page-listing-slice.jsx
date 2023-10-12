import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    page: 1,
    noMoreData:false,

   
};
const pageListingSlice = createSlice({
    name: "pageListing",
    initialState: initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setNoMore(state, action) {
            state.noMoreData = action.payload;
        },
        refresh(state, action){
            state.page = 1;
            state.noMoreData = false;

        }
    }
});

export const pageListingActions = pageListingSlice.actions;
export default pageListingSlice;