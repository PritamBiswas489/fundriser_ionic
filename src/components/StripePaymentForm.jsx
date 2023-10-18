import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useIonAlert } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import "./StripePaymentForm.css";
import { API_BASE_URL } from "../config";
import { useHttpClient } from "../hook/http-hook";

const StripePaymentForm = ({campaign_id, amount,saveLocalData}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const [processing, setProcessing] = useState(false);

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
    payment:  saveLocalData?.payment,
    total_payment: saveLocalData?.total_payment,
    currency: "USD",
    tips: saveLocalData?.tips,
    extratips: 0,
    anonymous: saveLocalData.isAno ? 1 : 0,
    payment_status: "1",
    status: "1",
    payment_method: "stripe",
  };
  

  const SuccessAlert = () => {
    presentAlert({
      cssClass: 'my-custom-alert', // Add a custom CSS class for styling
      header: 'Successfully done',
      subHeader: 'Payment via Stripe',
      message: `
        Thank you for your donation
      `,
      backdropDismiss:false,
      buttons: [
        {
          text: 'OK',
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
      subHeader: "Payment via Stripe",
      message: `
        Donation suddenly failed try again later
      `,
      backdropDismiss:false,
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

  const { sendRequest: sendDetailsToServerDatabaseProcess } = useHttpClient();
  const sendDetailsToServerDatabase = async (paymentDetails,callback) => {
    const response = await sendDetailsToServerDatabaseProcess(
      `${API_BASE_URL}create-donation-payment-details`,
      "POST",
      JSON.stringify(paymentDetails),
      {
        "Content-Type": "application/json",
      }
    );
    if (response.success) {
        callback(true);
    }
  };


  async function handlePaymentConfirmation(paymentMethodId,callback) {
    try {
      const response = await fetch(`${API_BASE_URL}stripe-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId, amount:(parseFloat(amount)*100) }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }
  
      const result = await response.json();

     if(!result?.clientSecret){
        callback(false);
        return;
     }
      const { clientSecret } = result;
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
      if (error) {
         console.log(error);
         callback(false);
      } else {
        paymentDetails.transaction_id = paymentIntent.id;
        sendDetailsToServerDatabase(paymentDetails,callback);
        console.log({paymentIntent});
      }
    } catch (error) {
      console.error(error);
      callback(false);
      // Handle the error
    }
  }
  
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (result.error) {
        failedAlert();
        console.error(result.error);
    } else {
      const paymentMethodId = result.paymentMethod.id;
      handlePaymentConfirmation(paymentMethodId,function(isSuccess){
        elements.getElement(CardElement).clear();
        setProcessing(false);
        if(!isSuccess){
            failedAlert();
        }else{
           SuccessAlert();
        }

      });

      
    }

    
  };
  const inputStyle = {
    iconColor: "#c4f0ff",
    height: "200px",
    fontWeight: "500",
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="custom-card-element"
        options={{
          style: {
            base: inputStyle,
          },
        }}
      />

      <IonButton expand="full" type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay With Stripe 3d secure form"}
      </IonButton>
    </form>
  );
};

export default StripePaymentForm;
