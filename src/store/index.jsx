import { configureStore } from "@reduxjs/toolkit";
import categoryDataSlice from "./redux/category-data-slice"; 
import fundriserListingSlice from "./redux/fundriser-listing-slice";
import pageListingSlice from "./redux/page-listing-slice";
import countryDataSlice from "./redux/country-data-slice";
import stateDataSlice from "./redux/state-data-slice";
 

const store = configureStore({
    reducer: { 
      categoryData: categoryDataSlice.reducer ,
      fundriserListing: fundriserListingSlice.reducer ,
      pageListing: pageListingSlice.reducer,
      countryData: countryDataSlice.reducer ,
      stateData: stateDataSlice.reducer ,
    },
  });
  
export default store;
  