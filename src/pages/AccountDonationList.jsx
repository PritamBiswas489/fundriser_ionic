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
} from "@ionic/react";
import { Link } from "react-router-dom";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import Menu from "../components/Menu";
import AccountCampaignDonationListModal from "./AccountCampaignDonationListModal";

const AccountDonationList = () => {
  const user_id = useSelector((state) => state["userData"].user_id);
  //const user_id = 4;

  const [resultData, setResultData] = useState([]);
  const [selectedCampaignID, setSelectedCampaignID] = useState(0);
  const [selectedCampaignTitle, setSelectedCampaignTitle] = useState(0);
  const [showDonationListModal, setShowDonationListModal] = useState(false);
  
  const refreshContent = (event) => {
    // Simulate an asynchronous data fetch
    setTimeout(() => {
      getData();
      event.detail.complete(); // Hide the refresher
    }, 2000); // Adjust the delay as needed
  };
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
      `${API_BASE_URL}donation?${queryString}`
    );
    setResultData(responseData.donation);
  };
  useEffect(() => {
    setResultData([]);
    getData();
  }, []);

  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  const showDonorListModal = (campaignID,title) =>{
    setSelectedCampaignID(campaignID);
    setShowDonationListModal(true);
    setSelectedCampaignTitle(title);
  }

   
  return (
    <>
      
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/" />
            </IonButtons>
            <IonTitle className="backTitle">Your Donor List</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonRefresher
            slot="fixed"
            pullFactor={0.5}
            pullMin={100}
            pullMax={200}
            onIonRefresh={refreshContent}
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {dataLoading && <SkeletonLoader />}
          {!dataLoading && resultData.length > 0 &&
            resultData.map((item, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>${item?.total_payment}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <Link to={"#"} onClick={showDonorListModal.bind(this,item.campaignID,item.title)}>{item?.title}</Link>
                </IonCardContent>
              </IonCard>
            ))}
            <AccountCampaignDonationListModal selectedCampaignTitle={selectedCampaignTitle} setShowDonationListModal={setShowDonationListModal} selectedCampaignID={selectedCampaignID} showDonationListModal={showDonationListModal} />
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default AccountDonationList;
