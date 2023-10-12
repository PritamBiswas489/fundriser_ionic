import React, { useState, useEffect } from "react";
import "./PayPalPayment.css";
import {
  IonPage,
  IonTitle,
  IonContent,
  IonHeader,
  IonButton,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLoading,
  IonIcon,
} from "@ionic/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "react-router";
import SkeletonLoader from "../components/SkeletonLoader";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL, PAYPAL_CLIENT_ID } from "../config";
import Footer from "../components/Footer";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import { useIonAlert } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import useLocalStorage from "../hook/useLocalStorage";

const PayPalPayment = () => {
  const params = useParams();
  const campaign_id = params["id"];
  const amount = params["amount"];
  const [presentAlert] = useIonAlert();
  const [showLoader, setShowLoader] = useState(false);
  const router = useIonRouter();

  const [value, saveValueToLocalStorage, clearValueFromLocalStorage] = useLocalStorage('donationFormData',{});
  let saveLocalData = {}; 
  if(value!=''){
      saveLocalData = JSON.parse(value); 
  }
  if(!saveLocalData?.personName){
    router.push(`/donation/${campaign_id}`, "forward", "push");
  }

  const paymentDetails = {
    user_id_fk: 0,
    campaign_id_fk: campaign_id,
    payer_name: saveLocalData?.personName,
    payer_email: saveLocalData?.personEmail,
    payer_phone: saveLocalData?.nationalNumber,
    payer_address: saveLocalData?.personAddr,
    payer_country_id_fk:  saveLocalData?.selectCountry,
    payer_state_id_fk: saveLocalData?.selectRegion,
    payer_country_iso: saveLocalData?.selectCountryCode,
    payer_phone_code: saveLocalData?.countryCallingCode,
    payer_zip: saveLocalData?.zipCode,
    payment: 100,
    total_payment: amount,
    currency: "USD",
    tips: 10,
    extratips: 0,
    anonymous: saveLocalData.isAno ? 1 : 0,
    payment_status: "1",
    status: "1",
    payment_method: "stripe",
  };

  const SuccessAlert = () => {
    presentAlert({
      cssClass: "my-custom-alert", // Add a custom CSS class for styling
      header: "Successfully done",
      subHeader: "Payment via Paypal",
      message: `
        Thank you for your donation
      `,
      buttons: [
        {
          text: "OK",
          handler: () => {
            // This function will be executed when the "OK" button is clicked.
            // You can put your desired action here.
            router.push(`/donate/${campaign_id}`, "forward", "push");
          },
        },
      ],
    });
  };
  const failedAlert = () => {
    presentAlert({
      cssClass: "my-custom-alert", // Add a custom CSS class for styling
      header: "Failed",
      subHeader: "Payment via Paypal",
      message: `
        Donation suddenly failed try again later
      `,
      buttons: [
        {
          text: "OK",
          handler: () => {
            // This function will be executed when the "OK" button is clicked.
            // You can put your desired action here.
            router.push(`/donate/${campaign_id}`, "forward", "push");
          },
        },
      ],
    });
  };

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

  const PayPalConfig = {
    clientId: PAYPAL_CLIENT_ID,
    currency: "USD", // Change to your preferred currency
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount, // Replace with your total amount
          },
          billing: {
            // Billing address configuration here
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };
  const { sendRequest: sendDetailsToServerDatabaseProcess } = useHttpClient();
  const sendDetailsToServerDatabase = async (paymentDetails) => {
    const response = await sendDetailsToServerDatabaseProcess(
      `${API_BASE_URL}create-donation-payment-details`,
      "POST",
      JSON.stringify(paymentDetails),
      {
        "Content-Type": "application/json",
      }
    );
    if (response.success) {
       setShowLoader(false);
       SuccessAlert();
    }
  };
  const approveOrder = (data, actions) => {
    setShowLoader(true);
    return actions.order.capture().then(function (details) {
      paymentDetails.transaction_id = details.id;
      sendDetailsToServerDatabase(paymentDetails);

      console.log({ paymentDetails });
    });
  };
  const errorOrder = (error) => {
    setShowLoader(false);
    failedAlert();
    console.log(error);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref={`/donation/${campaign_id}`}
            />
          </IonButtons>
          <IonTitle>Donate with PayPal</IonTitle>
          <IonButtons slot="end">
            <IonButton>
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
              <PayPalScriptProvider options={PayPalConfig}>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={approveOrder}
                  onError={errorOrder}
                />
              </PayPalScriptProvider>
              <IonLoading
                isOpen={showLoader}
                message={"Processing Payment..."}
              />
            </div>
          </div>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default PayPalPayment;
