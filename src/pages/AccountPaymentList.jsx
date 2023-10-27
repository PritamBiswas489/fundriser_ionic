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
import { chevronBackOutline, personCircle } from "ionicons/icons";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import "react-lazy-load-image-component/src/effects/blur.css";
import Menu from "../components/Menu";

const AccountPaymentList = () => {
  const user_id = useSelector((state) => state["userData"].user_id);
  const [resultData, setResultData] = useState([]);
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

  function formatedDate(createdDate) {
    const dateString = createdDate;
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const getData = async () => {
    const searchValue = { user_id };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await dataFetch(
      `${API_BASE_URL}paymentlist?${queryString}`
    );
    setResultData(responseData?.payment);
  };
  useEffect(() => {
    getData();
  }, []);
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  return (
    <>
       
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/" />
            </IonButtons>
            <IonTitle className="backTitle">Your Payment List</IonTitle>
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

          {resultData.length > 0 &&
            resultData.map((item, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardSubtitle>
                    {formatedDate(item?.created_at)}
                  </IonCardSubtitle>
                  <IonCardTitle>${item?.paid_amount}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{item?.campaign?.title}</IonCardContent>
              </IonCard>
            ))}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default AccountPaymentList;
