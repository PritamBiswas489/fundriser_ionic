import { configureStore } from "@reduxjs/toolkit";
import categoryDataSlice from "./redux/category-data-slice"; 
import fundriserListingSlice from "./redux/fundriser-listing-slice";
import pageListingSlice from "./redux/page-listing-slice";
import countryDataSlice from "./redux/country-data-slice";
import stateDataSlice from "./redux/state-data-slice";
import donationAmtSlice from "./redux/donation-amt-slice";
import homeSearchFieldSlice from "./redux/home-search-field-slice";
import homeListingSlice from "./redux/home-listing-slice";
import startCampignDataSlice from "./redux/start-campaign-data-slice";
import startCampignModalSlice from "./redux/start-campaign-modal-slice";
 

const store = configureStore({
    reducer: { 
      categoryData: categoryDataSlice.reducer ,
      fundriserListing: fundriserListingSlice.reducer ,
      pageListing: pageListingSlice.reducer,
      countryData: countryDataSlice.reducer ,
      stateData: stateDataSlice.reducer ,
      donationAmt: donationAmtSlice.reducer ,
      homeSearchField:homeSearchFieldSlice.reducer,
      homeListing:homeListingSlice.reducer,
      startCampignData:startCampignDataSlice.reducer,
      startCampignModal:startCampignModalSlice.reducer
    },
  });
  
export default store;
  