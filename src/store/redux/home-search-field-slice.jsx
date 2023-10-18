import { createSlice } from "@reduxjs/toolkit";
const initialState = {
     searchValue:'',   
};
const homeSearchFieldSlice = createSlice({
    name: "homeSearchField",
    initialState: initialState,
    reducers: {
        setValue(state, action) {
            state.searchValue = action.payload;
        }
    }
});

export const homeSearchFieldActions = homeSearchFieldSlice.actions;
export default homeSearchFieldSlice;