import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   show:false
}

const startCampignModalSlice = createSlice({
    name: "startCampignModal",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        console.log(action.payload);
        state[action.payload.field] = action.payload.data;
      },
    },
});
export const startCampignModalActions = startCampignModalSlice.actions;
export default startCampignModalSlice;