import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isFetched:false,
    firstName:'',
    lastName:'',
    phoneNumber:'',
    country:231,
    address:'',
    zip:'',
    email:'',
    user:{}
 };
 const userAccountDataSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        state[action.payload.field] = action.payload.data;
      },
      resetState: (state) => initialState,
    },
});
export const userAccountDataActions = userAccountDataSlice.actions;
export default userAccountDataSlice;