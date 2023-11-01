import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   user_id:0,
   token:'',
   
}
const userDataSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        state[action.payload.field] = action.payload.data;
      },
    },
});
export const userDataActions = userDataSlice.actions;
export default userDataSlice;