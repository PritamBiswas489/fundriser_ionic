import { createSlice } from "@reduxjs/toolkit";
function getTimeFormat(){
  const currentDateTime = new Date();
  // Get the date components
  const year = currentDateTime.getUTCFullYear();
  const month = (currentDateTime.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = currentDateTime.getUTCDate().toString().padStart(2, '0');

  // Get the time components
  const hours = currentDateTime.getUTCHours().toString().padStart(2, '0');
  const minutes = currentDateTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = currentDateTime.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = currentDateTime.getUTCMilliseconds().toString().padStart(3, '0');

  // Create the formatted date string
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  return formattedDateTime;
}
const initialState = {
    ShowDefaultData : true,
    selectedDate: getTimeFormat(),
    formattedDate:"",
    campaignTitle:"",
    editorData:"",
    campaignCategory:19,
    campaignCountry:231,
    campaignLocated:"",
    fundraisingFor:"",
    goalAmount:"",
    moreInfo:"",
    fundriseAs:1,
    recommendedAmount:"",
    predefinedPledgeAmount:"",
    companyName:"",
    companyMailingAddress:"",
    companyCity:"",
    companyZip:"",
    companyCountry:231,
    companyContactNumber:"",
    companyEmailAddress:"",
    companyWebsite:"",
    selectedImages:[],
    selectedDocuments:'',
    showCalendar:false,
    youtubeUrl:'',
};
const startCampignDataSlice = createSlice({
    name: "startCampignData",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        //console.log(action.payload);
        state[action.payload.field] = action.payload.data;
      },
      resetState: (state) => initialState,
    },
});
export const startCampignDataActions = startCampignDataSlice.actions;
export default startCampignDataSlice;