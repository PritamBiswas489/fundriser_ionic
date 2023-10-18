import React, { useState, useEffect } from "react";
import './PayPalPayment.css'

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonLoading,
  IonIcon,
} from "@ionic/react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "../components/StripePaymentForm";
import { useParams } from "react-router";
import SkeletonLoader from "../components/SkeletonLoader";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL, STRIPE_PK } from "../config";
import Footer from "../components/Footer";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import { useIonAlert } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import useLocalStorage from "../hook/useLocalStorage";
import Menu from "../components/Menu";

const stripePromise = loadStripe(STRIPE_PK);
const StripePayment = () => {
  const params = useParams();
  const campaign_id = params["id"];
   
  const router = useIonRouter();

  const [value, saveValueToLocalStorage, clearValueFromLocalStorage] = useLocalStorage('donationFormData',{});
  let saveLocalData = {}; 
  if(value!=''){
      saveLocalData = JSON.parse(value); 
  }
  if(!saveLocalData?.personName){
    router.push(`/donation/${campaign_id}`, "forward", "push");
  }
  const amount = saveLocalData?.total_payment;
  const [details, setDetails] = useState({});
  const {
    isLoading: fundRaiserLoading,
    error: fundRaiserError,
    sendRequest: fundRaiserFetch,
    clearError,
  } = useHttpClient();

  const generateCampaignDetails = async () => {
    const searchValue = { fundraiserid: campaign_id };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await fundRaiserFetch(
      `${API_BASE_URL}fundraisersdetails?${queryString}`
    );
    if (
      responseData?.fundraisersdetails &&
      responseData?.fundraisersdetails?.id
    ) {
      setDetails(responseData.fundraisersdetails);
    }
  };
  useEffect(() => {
    generateCampaignDetails();
  }, [campaign_id]);

  
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }

  return (
    <>
    <Menu/>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref={`/donation/10`}
            />
          </IonButtons>
          <IonTitle>Donate with Stripe</IonTitle>
          <IonButtons slot="end">
          <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {fundRaiserLoading && <SkeletonLoader />}
        {details?.id && (
          <div className="page-content">
            <h1 className="content-heading">{details?.title}</h1>
            <h3>Donation Amount: ${amount}</h3>
            <div className="paypal-button">
              <Elements stripe={stripePromise}>
                <StripePaymentForm saveLocalData={saveLocalData} campaign_id={campaign_id} amount={amount} />
              </Elements>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
    </>
  );
};

export default StripePayment;
