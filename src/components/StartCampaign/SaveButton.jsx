import React from "react";

import { IonButton } from "@ionic/react";

import { useSelector } from "react-redux";
import { useHttpClient } from "../../hook/http-hook";
import { API_BASE_URL } from "../../config";
import { useIonToast } from "@ionic/react";
import { startCampignModalActions } from "../../store/redux/start-campaign-modal-slice";
import { useDispatch } from "react-redux";
import { startCampignDataActions } from "../../store/redux/start-campaign-data-slice";

export default function SaveButton() {
  const dispatch = useDispatch();  
  const [present] = useIonToast();

  const presentToast = (position, message) => {
    present({
      message: message,
      duration: 3000,
      position: position,
      cssClass: "custom-toast",

      buttons: [
        {
          text: "Dismiss",
          role: "cancel",
        },
      ],
    });
  };
  const user_id = useSelector(state=>state["userData"].user_id);

  const campaignID = useSelector(state=>state['startCampignData'].campaignID);  
  
  const campaignEndDate = useSelector(
    (state) => state["startCampignData"].formattedDate
  );
  const campaignTitle = useSelector(
    (state) => state["startCampignData"].campaignTitle
  );
  const campaignDesc = useSelector(
    (state) => state["startCampignData"].editorData
  );
  const campaignCategory = useSelector(
    (state) => state["startCampignData"].campaignCategory
  );
  const campaignCountry = useSelector(
    (state) => state["startCampignData"].campaignCountry
  );
  const campaignLocated = useSelector(
    (state) => state["startCampignData"].campaignLocated
  );
  const fundraisingFor = useSelector(
    (state) => state["startCampignData"].fundraisingFor
  );
  const goalAmount = useSelector(
    (state) => state["startCampignData"].goalAmount
  );
  const moreInfo = useSelector((state) => state["startCampignData"].moreInfo);
  const recommendedAmount = useSelector(
    (state) => state["startCampignData"].recommendedAmount
  );
  const predefinedPledgeAmount = useSelector(
    (state) => state["startCampignData"].predefinedPledgeAmount
  );
  const fundriseAs = useSelector(
    (state) => state["startCampignData"].fundriseAs
  );
  const companyName = useSelector(
    (state) => state["startCampignData"].companyName
  );
  const companyMailingAddress = useSelector(
    (state) => state["startCampignData"].companyMailingAddress
  );
  const companyCity = useSelector(
    (state) => state["startCampignData"].companyCity
  );
  const companyZip = useSelector(
    (state) => state["startCampignData"].companyZip
  );
  const companyCountry = useSelector(
    (state) => state["startCampignData"].companyCountry
  );
  const companyContactNumber = useSelector(
    (state) => state["startCampignData"].companyContactNumber
  );
  const companyEmailAddress = useSelector(
    (state) => state["startCampignData"].companyEmailAddress
  );
  const companyWebsite = useSelector(
    (state) => state["startCampignData"].companyWebsite
  );
  const selectedImages = useSelector(
    (state) => state["startCampignData"].selectedImages
  );
  const selectedDocuments = useSelector(
    (state) => state["startCampignData"].selectedDocuments
  );
  const youtubeUrl = useSelector(
    (state) => state["startCampignData"].youtubeUrl
  );

  function objectToFormData(obj) {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }
   

  const {
    isLoading: fundRaiserSaveLoading,
    error: fundRaiserSaveError,
    sendRequest: fundRaiserSaveFetch,
    clearError,
  } = useHttpClient();

  function isValidPrice(input) {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(input);
  }
  function isValidEmail(email) {
    // Regular expression for validating an email address
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  const saveProcess = async () => {
    
    //=============== Validation =======================//
    
    if(campaignTitle.trim() === ''){
      presentToast('middle','Enter campaign title');
      return;
    }
    if(campaignDesc.trim() === ''){
      presentToast('middle','Enter campaign description');
      return;
    }
    if(parseInt(campaignCategory) === 0){
      presentToast('middle','Enter campaign category');
      return;
    }
    if(parseInt(campaignCountry) === 0){
      presentToast('middle','Enter campaign category');
      return;
    }
    if(campaignLocated.trim() === ''){
      presentToast('middle','Enter campaign location');
      return;
    }
    if(fundraisingFor.trim() === ''){
      presentToast('middle','Enter What are you fundraising for');
      return;
    }
    if(goalAmount === ''){
      presentToast('middle','Enter goal amount');
      return;
    }
    if(!isValidPrice(goalAmount)){
      presentToast('middle','Enter valid goal amount');
      return;

    }
    if(recommendedAmount === ''){
      presentToast('middle','Enter recommended amount');
      return;
    }
    if(!isValidPrice(recommendedAmount)){
      presentToast('middle','Enter valid recommended amount');
      return;

    }
    if(predefinedPledgeAmount === ''){
      presentToast('middle','Enter predefined pledge amount');
      return;
    }
    if(campaignEndDate === ''){
      presentToast('middle','Enter campaign end date');
      return;

    }
    if(parseInt(campaignID) === 0){
      if(selectedImages.length === 0){
        presentToast('middle','Upload one or more than one image');
        return;
      }

    }
    
    if(parseInt(fundriseAs) === 2){
      if(companyName.trim() === ''){
        presentToast('middle','Enter company name');
        return;
      }
      if(companyMailingAddress.trim() === ''){
        presentToast('middle','Enter company mailing address');
        return;
      }
      if(companyCity.trim() === ''){
        presentToast('middle','Enter company city');
        return;
      }
      if(companyZip === ''){
        presentToast('middle','Enter company zip');
        return;
      }
      if(companyContactNumber === ''){
        presentToast('middle','Enter company contact number');
        return;
      }
      if(companyEmailAddress.trim() === ''){
        presentToast('middle','Enter company email address');
        return;
      }
      if(!isValidEmail(companyEmailAddress)){
        presentToast('middle','Enter company valid email address');
        return;
      }

    }
     
    const dataInput = {
      campaignID,
      campaignEndDate,
      campaignTitle,
      campaignDesc,
      campaignCategory,
      campaignCountry,
      campaignLocated,
      fundraisingFor,
      goalAmount,
      moreInfo,
      recommendedAmount,
      predefinedPledgeAmount,
      fundriseAs,
      companyName,
      companyMailingAddress,
      companyCity,
      companyZip,
      companyCountry,
      companyContactNumber,
      companyEmailAddress,
      companyWebsite,
      youtubeUrl,
      user_id
    };


    async function blobUrlToFile(selectedImg) {
      try {
        // Fetch the Blob data from the Blob URL
        const response = await fetch(selectedImg.url);
        const blobData = await response.blob();
    
        // Create a new File object
        const file = new File([blobData], selectedImg.name, { type: selectedImg.type });
    
        return file;
      } catch (error) {
        console.error("Error converting Blob URL to File object:", error);
      }
    }


    const formData = objectToFormData(dataInput);
    if (selectedImages.length > 0) {

      const promises =  selectedImages.map(async(selectedImg)=>{
        return await blobUrlToFile(selectedImg);
      })
      const dImage = await Promise.all(promises);

       dImage.forEach((dImage, dImageIndex) => {
        formData.append(`uploadimg[${dImageIndex}]`, dImage);
      });
    }

    if(selectedDocuments?.name){
      formData.append(`selectedDocuments`, await blobUrlToFile(selectedDocuments));
    }

    let Url =  `${API_BASE_URL}start-campaign-save-data`;
    if(parseInt(campaignID) > 0){
      Url =  `${API_BASE_URL}start-campaign-update-data`;
    } 
 
    const responseData = await fundRaiserSaveFetch(
      Url,
      "POST",
      formData
    );    

    if(responseData.success){
        clearError();
        dispatch(startCampignModalActions.setData({field:'show',data:false}));
        dispatch(startCampignDataActions.resetState());
        presentToast('middle','Campaign Successfully saved');
    }else if(fundRaiserSaveError){
        // clearError();
        presentToast('middle','Saved campaign failed');
        
    }
  };

  return (
    <>
      <IonButton expand="full" disabled={fundRaiserSaveLoading} onClick={saveProcess}>
        {fundRaiserSaveLoading ? 'Processing...' : 'Save'}
      </IonButton>
       
    </>
  );
}
