import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    choosenDonationAmount: 0,
    selectedOtherAmount: false,
    otherChooseAmount:0,
    totalDonationAmount:0,
    otherAmtModalShowStatus:false,
    
    selectedGratuity:10,
    selectedOtherGratuityOption:false,
    otherGratuityAmount:0,
    otherGratuityAmtModalShowStatus:false,
    gratuityCalculatedAmount:0
};

const donationAmtSlice = createSlice({
    name: "donationAmt",
    initialState: initialState,
    reducers: {
      setChoosenDonationAmount(state, action) {
        state.choosenDonationAmount = action.payload;
      },
      setSelectedOtherAmount(state, action) {
        state.selectedOtherAmount = action.payload;
      },
      setTotalDonationAmount(state, action) {
        state.totalDonationAmount = action.payload;
      },
      setOtherChooseAmount(state, action) {
        state.otherChooseAmount = action.payload;
      },
      setOtherAmtModalShowStatus(state, action){
        state.otherAmtModalShowStatus = action.payload;
      },
      setSelectedGratuity(state, action){
        state.selectedGratuity = action.payload;
      },

      setSelectedOtherGratuityOption(state, action){
        state.selectedOtherGratuityOption = action.payload;
      },

      setOtherGratuityAmount(state, action){
        state.otherGratuityAmount = action.payload;
      },
      setOtherGratuityAmtModalShowStatus(state, action){
        state.otherGratuityAmtModalShowStatus = action.payload;
      },
      setGratuityCalculatedAmount(state, action){
        state.gratuityCalculatedAmount = action.payload;
      }

      
    },
});
export const donationAmtActions = donationAmtSlice.actions;
export default donationAmtSlice;