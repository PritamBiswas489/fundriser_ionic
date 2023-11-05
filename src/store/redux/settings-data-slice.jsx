import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    settings: {},
};
const settingDataSlice = createSlice({
    name: "settingData",
    initialState: initialState,
    reducers: {
        setData(state, action) {
          state[action.payload.field] = action.payload.data;
        },
    },
})

export const settingDataActions = settingDataSlice.actions;
export default settingDataSlice;