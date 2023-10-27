import React, { useState, useEffect, useRef } from "react";
import "./Landing.css";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonLoading
} from "@ionic/react";
import { Link } from "react-router-dom";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import HomeBanner from "../components/homeBanner/HomeBanner";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Footer from "../components/Footer";
import { search } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { homeSearchFieldActions } from "../store/redux/home-search-field-slice";
import { pageListingActions } from "../store/redux/page-listing-slice";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";
import { homeListingActions } from "../store/redux/home-listing-slice";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Menu from "../components/Menu";
import { startCampignDataActions } from "../store/redux/start-campaign-data-slice";
import { startCampignModalActions } from "../store/redux/start-campaign-modal-slice";

const AccountDashboard = () => {
  const user_id = useSelector((state) => state["userData"].user_id);
  const [resultData, setResultData] = useState([]);
  const [showIonLoader,setShowIonLoader] = useState(false);
  const router = useIonRouter();
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state) => state["homeSearchField"].searchValue
  );
  const {
    isLoading: dataLoading,
    error: dataError,
    sendRequest: dataFetch,
    clearError,
  } = useHttpClient();

  const getData = async () => {
    const searchValue = { user_id };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await dataFetch(
      `${API_BASE_URL}mycampaigns?${queryString}`
    );
    setResultData(responseData?.campaignList);
  };
  useEffect(() => {
    getData();
  }, []);

  const {
    isLoading: dataCampaignLoading,
    error: dataCampaignError,
    sendRequest: dataCampaignFetch,
    clearError:dataCampaignFetchErrorClear
  } = useHttpClient();

  

  const editCampaign = async (campaignID) =>{
    setShowIonLoader(true);
    const searchValue = { fundraiserid:campaignID };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await dataCampaignFetch(
      `${API_BASE_URL}fundraisersdetails?${queryString}`
    );
    if(responseData?.fundraisersdetails){
      dispatch(startCampignDataActions.resetState());
      dispatch(startCampignDataActions.setData({field:'campaignID',data:campaignID}));
      dispatch(startCampignDataActions.setData({field:'campaignTitle',data:responseData?.fundraisersdetails?.title}));
      dispatch(startCampignDataActions.setData({field:'editorData',data:responseData?.fundraisersdetails?.description}));

      dispatch(startCampignDataActions.setData({field:'campaignCategory',data:responseData?.fundraisersdetails?.category_id_fk}));
      dispatch(startCampignDataActions.setData({field:'campaignCountry',data:responseData?.fundraisersdetails?.country_id_fk}));


      dispatch(startCampignDataActions.setData({field:'campaignLocated',data:responseData?.fundraisersdetails?.location}));
      dispatch(startCampignDataActions.setData({field:'fundraisingFor',data:responseData?.fundraisersdetails?.fundraising_for}));


      dispatch(startCampignDataActions.setData({field:'goalAmount',data:responseData?.fundraisersdetails?.goal}));

      dispatch(startCampignDataActions.setData({field:'moreInfo',data:responseData?.fundraisersdetails?.more_info}));

      dispatch(startCampignDataActions.setData({field:'formattedDate',data:responseData?.fundraisersdetails?.end_date}));

      dispatch(startCampignDataActions.setData({field:'recommendedAmount',data:responseData?.fundraisersdetails?.campaign_amount?.recomnd_amount}));

      dispatch(startCampignDataActions.setData({field:'predefinedPledgeAmount',
      data:responseData?.fundraisersdetails?.campaign_amount?.pledge_amount_one+','
      +responseData?.fundraisersdetails?.campaign_amount?.pledge_amount_two+','+
      responseData?.fundraisersdetails?.campaign_amount?.pledge_amount_three
    
    
    }));
    dispatch(startCampignDataActions.setData({field:'fundriseAs',data:responseData?.fundraisersdetails?.fundraise_as}));

    
    dispatch(startCampignDataActions.setData({field:'companyName',data:responseData?.fundraisersdetails?.campaign_company?.company_name}));
    dispatch(startCampignDataActions.setData({field:'companyMailingAddress',data:responseData?.fundraisersdetails?.campaign_company?.mailing_address}));
    dispatch(startCampignDataActions.setData({field:'companyCity',data:responseData?.fundraisersdetails?.campaign_company?.city}));
    dispatch(startCampignDataActions.setData({field:'companyZip',data:responseData?.fundraisersdetails?.campaign_company?.zip}));
    dispatch(startCampignDataActions.setData({field:'companyCountry',data:responseData?.fundraisersdetails?.campaign_company?.country_id_fk}));
    dispatch(startCampignDataActions.setData({field:'companyContactNumber',data:responseData?.fundraisersdetails?.campaign_company?.contact_number}));
    dispatch(startCampignDataActions.setData({field:'companyEmailAddress',data:responseData?.fundraisersdetails?.campaign_company?.email_address}));
    dispatch(startCampignDataActions.setData({field:'companyWebsite',data:responseData?.fundraisersdetails?.campaign_company?.website}));
    dispatch(startCampignDataActions.setData({field:'youtubeUrl',data:responseData?.fundraisersdetails?.youtubeUrl}));
    	
    
    let imagesBlobs = [];
    if(responseData?.campaignImages){
      responseData?.campaignImages.forEach((imageURL,imageIndex)=>{
        imagesBlobs.push(imageURL);
      })
      
    }

    dispatch(startCampignDataActions.setData({field:'youtubeUrl',data:responseData?.fundraisersdetails?.youtubeUrl}));

    if(responseData?.campaignDocuments?.[0]){
      dispatch(startCampignDataActions.setData({field:'existingDocuments',data:responseData?.campaignDocuments?.[0]}))
    }
    
    dispatch(startCampignDataActions.setData({field:'existingImages',data:imagesBlobs}))

    dispatch(startCampignModalActions.setData({field:'show',data:true}));
    setShowIonLoader(false);
    }
  }
  useEffect(()=>{
    if(dataCampaignError){
      dataCampaignFetchErrorClear();
      alert('Unable to fetch campaign');
      setShowIonLoader(false);
   }
  },[dataCampaignError])
  
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  return (
    <>
      <Menu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} />
            </IonButtons>
            <IonTitle className="backTitle">Dashboard</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {dataLoading && <SkeletonLoader/>}
          {!dataLoading && resultData.length > 0 &&
            resultData.map((item, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                <IonCardSubtitle><Link to={"#"} onClick={editCampaign.bind(this,item?.id)}  >Edit campaign</Link> </IonCardSubtitle>
                  <IonCardTitle>{item?.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                 <div dangerouslySetInnerHTML={{__html:item?.description}}></div>
                </IonCardContent>
              </IonCard>
            ))}
            <IonLoading
                isOpen={showIonLoader}
                message={"Processing..."}
              />
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default AccountDashboard;
