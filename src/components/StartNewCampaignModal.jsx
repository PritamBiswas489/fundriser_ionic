import React, { useState, useEffect } from "react";
import "./StartNewCampaignModal.css";
import {
  IonModal,
  
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonTextarea,
  IonDatetime,
  IonPopover,

} from "@ionic/react";
import { useIonToast } from "@ionic/react";
import CKEditorComponent from "./CKEditorComponent";
import { useDispatch, useSelector } from "react-redux";
import { countryDataActions } from "../store/redux/country-data-slice";
import { stateDataActions } from "../store/redux/state-data-slice";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL } from "../config";
import { categoryDataActions } from "../store/redux/category-data-slice";
import { startCampignDataActions } from "../store/redux/start-campaign-data-slice";
import Documents from "./StartCampaign/Documents";
import Images from "./StartCampaign/Images";
import FundriseType from "./StartCampaign/FundriseType";
import SaveButton from "./StartCampaign/SaveButton";

const StartNewCampaignModal = ({ showModal }) => {
     
  const dispatch = useDispatch();
  const [present] = useIonToast();

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

  const ShowDefaultData = useSelector(state=>state['startCampignData'].ShowDefaultData); 
   

  const showCalendar = useSelector(state=>state['startCampignData'].showCalendar); 
  const setShowCalendar = (value) => dispatch(startCampignDataActions.setData({field:'showCalendar',data:value}))

  const selectedDate = useSelector(state=>state['startCampignData'].selectedDate);
 
  const setSelectedDate = (value) => dispatch(startCampignDataActions.setData({field:'selectedDate',data:value}))
   

  const formattedDate = useSelector(state=>state['startCampignData'].formattedDate); 
  const setFormattedDate = (value) => dispatch(startCampignDataActions.setData({field:'formattedDate',data:value}))
  
  
  const campaignTitle = useSelector(state=>state['startCampignData'].campaignTitle); 
  const setCampaignTitle = (value) => dispatch(startCampignDataActions.setData({field:'campaignTitle',data:value}))
  
  const editorData = useSelector(state=>state['startCampignData'].editorData); 
  const setEditorData = (value) => dispatch(startCampignDataActions.setData({field:'editorData',data:value}))
  
  const campaignCategory = useSelector(state=>state['startCampignData'].campaignCategory); 
  const setCampaignCategory = (value) => dispatch(startCampignDataActions.setData({field:'campaignCategory',data:value}))
  

  const campaignCountry = useSelector(state=>state['startCampignData'].campaignCountry); 
  const setCampaignCountry = (value) => dispatch(startCampignDataActions.setData({field:'campaignCountry',data:value}))


  const campaignLocated = useSelector(state=>state['startCampignData'].campaignLocated); 
  const setCampaignLocated = (value) => dispatch(startCampignDataActions.setData({field:'campaignLocated',data:value}))
   
 
  const fundraisingFor = useSelector(state=>state['startCampignData'].fundraisingFor); 
  const setfundraisingFor = (value) => dispatch(startCampignDataActions.setData({field:'fundraisingFor',data:value}));


  const goalAmount = useSelector(state=>state['startCampignData'].goalAmount); 
  const setGoalAmount = (value) => dispatch(startCampignDataActions.setData({field:'goalAmount',data:value}))


  const moreInfo = useSelector(state=>state['startCampignData'].moreInfo); 
  const setMoreInfo = (value) => dispatch(startCampignDataActions.setData({field:'moreInfo',data:value}))

  
  const recommendedAmount = useSelector(state=>state['startCampignData'].recommendedAmount); 
  const setRecommendedAmount = (value) => dispatch(startCampignDataActions.setData({field:'recommendedAmount',data:value}))
  

  const predefinedPledgeAmount = useSelector(state=>state['startCampignData'].predefinedPledgeAmount); 
  const setPredefinedPledgeAmount = (value) => dispatch(startCampignDataActions.setData({field:'predefinedPledgeAmount',data:value}))
    
  const youtubeUrl = useSelector(state=>state['startCampignData'].youtubeUrl); 
  const setYoutubeUrl = (value) => dispatch(startCampignDataActions.setData({field:'youtubeUrl',data:value}))

  
  

  useEffect(()=>{
    if(ShowDefaultData === true){
        setCampaignTitle('Developer developer');
        setEditorData("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
        setCampaignLocated("developer demo located data" );
        setfundraisingFor("developer demo data developer demo data developer demo data developer demo data");
        setGoalAmount(4000);
        setMoreInfo("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
        setRecommendedAmount(50);
        setPredefinedPledgeAmount('10,20,30');
        
        setFormattedDate('2014-12-12') ;
        setYoutubeUrl("https://youtube.com") ;
    }
    setCampaignCountry(231);
    setSelectedDate(getTimeFormat());
  },[]);

  
 

  

  const openCalendar = () => {
    setShowCalendar(true);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateChange = (e) => {
    const newDate = e.detail.value;
    setSelectedDate(newDate);
    closeCalendar();
  };

  const countries = useSelector((state) => state["countryData"].countries);
  const { sendRequest: fetchCountry } = useHttpClient();
  useEffect(() => {
    const fetchCountryProcess = async () => {
      const responseData = await fetchCountry(`${API_BASE_URL}countrylist`);
      if (responseData?.country) {
        dispatch(countryDataActions.setCountries(responseData.country));
      }
    };
    if (countries.length === 0) {
      fetchCountryProcess();
    }
  }, [countries]);

  const categories = useSelector((state) => state["categoryData"].categories);
  const { sendRequest: categoryFetch } = useHttpClient();
  const categoryFetching = async () => {
    const responseData = await categoryFetch(
      `${API_BASE_URL}fundraisecategory`
    );
    if (responseData?.category) {
      setCampaignCategory(responseData?.category?.[1]?.id);  
      dispatch(
        categoryDataActions.setCategories({ categories: responseData.category })
      );
    }
  };
  useEffect(() => {
    if (categories.length === 0) {
      categoryFetching();
    }
  }, [categories]);
  




   
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
  useEffect(() => {
    if (selectedDate !== "") {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDateOp = `${year}-${month}-${day}`;
      setFormattedDate(formattedDateOp);
    } 
  }, [selectedDate]);
  //   console.log(categories);

  return (
    <div>
      <IonModal isOpen={showModal}>
        <IonContent>
          <div className="ion-padding">
            <h2>Create Your Fundraising Campaign</h2>
            <p>
              Fill in some important details to let your friends know what
              you're fundraising for.{" "}
            </p>
            <div className="inputArea" style={{ marginTop: 20 }}>
              <IonLabel>
                Campaign Title <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                value={campaignTitle}
                onIonInput={(e) => setCampaignTitle(e.detail.value)}
              />
            </div>

           
            <CKEditorComponent editorData={editorData} setEditorData={setEditorData} />

            {categories.length > 0 && (
              <div className="inputArea" style={{ marginTop: 20 }}>
                <IonLabel>
                  Select Category <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonSelect
                  interface="action-sheet"
                  cancelText="Cancel Choice"
                  value={
                    campaignCategory
                  }
                  onIonChange={(e) => setCampaignCategory(e.detail.value)}
                  className="selectOption"
                >
                  {categories.map((categoriesDet, categoriesIndex) => {
                    return (
                      <IonSelectOption
                        key={categoriesIndex}
                        value={categoriesDet.id}
                      >
                        {categoriesDet.cat_name}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </div>
            )}

            {countries.length > 0 && (
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Select Country <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonSelect
                  interface="action-sheet"
                  cancelText="Cancel Choice"
                  value={
                    parseInt(campaignCountry) !== 0 ? campaignCountry : 231
                  }
                  className="selectOption"
                  onIonChange={(e) => setCampaignCountry(e.detail.value)}
                >
                  {countries.map((countryDet, countryIndex) => {
                    return (
                      <IonSelectOption
                        iso={countryDet.iso}
                        key={countryIndex}
                        value={countryDet.id}
                      >
                        {countryDet.name}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </div>
            )}

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Where is your campaign located?{" "}
                <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                value={campaignLocated}
                onIonInput={(e) => setCampaignLocated(e.detail.value)}
              />
            </div>

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                What are you fundraising for?{" "}
                <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonTextarea
                value={fundraisingFor}
                onIonInput={(e) => setfundraisingFor(e.detail.value)}
              ></IonTextarea>
            </div>

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Goal Amount <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                value={goalAmount}
                onIonInput={(e) => setGoalAmount(e.detail.value)}
              />
            </div>

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Recommended Amount <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                value={recommendedAmount}
                onIonInput={(e) => setRecommendedAmount(e.detail.value)}
              />
            </div>

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Predefined Pledge Amount <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                value={predefinedPledgeAmount}
                onIonInput={(e) => setPredefinedPledgeAmount(e.detail.value)}
              />
              <small style={{fontSize:14}}>Predefined amount allow you to place the amount in donate box by click, price should separated by comma (,), example: 10,20,30</small>
            </div>
            

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Campaign End Date <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput readonly value={formattedDate} onClick={openCalendar} />
              <IonPopover isOpen={showCalendar} onDidDismiss={closeCalendar}>
                <IonDatetime
                  interface="popover"
                  value={selectedDate}
                  onIonChange={handleDateChange}
                ></IonDatetime>
              </IonPopover>
            </div>

            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>More Info (optional):</IonLabel>
              <ul>
                <li>Tell a story that makes your campaign personal</li>
                <li>Be specific about what your funds will be used for</li>
                <li>Add photos to complete your story</li>
              </ul>
              <IonTextarea
                value={moreInfo}
                onIonInput={(e) => setMoreInfo(e.detail.value)}
              ></IonTextarea>
            </div>


            <Images/>
            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Youtube or vinmeo url{" "}
              </IonLabel>
              <IonInput
                value={youtubeUrl}
                onIonInput={(e) => setYoutubeUrl(e.detail.value)}
              ></IonInput>
            </div>

            <Documents/>

           

           <FundriseType countries={countries}/>
           


          

            
           

             


           


           

           

           

           <SaveButton/>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default StartNewCampaignModal;
