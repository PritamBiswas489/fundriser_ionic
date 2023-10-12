import React, { useState } from "react";
import { IonButton,IonPage } from "@ionic/react";
import { Stripe } from "@capacitor-community/stripe";

const StripeCheckoutButton =() => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch a client secret from your server
      const response = await fetch(
        "https://peoplefundme.aqualeafitsol.com/api/stripe-payment-intent",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment intent.");
      }

      const data = await response.json();
      console.log("PaymentIntent client secret:", data.clientSecret);

      // Step 2: Create and present the PaymentSheet
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Inclusive Innovation Incubator",
      });

      const { paymentResult } = await Stripe.presentPaymentSheet();
      console.log(paymentResult);

      // Step 3: Handle the payment result (success or failure) here
      if (paymentResult && paymentResult.status === "succeeded") {
        alert("Payment successful!");
      } else {
        throw new Error("Payment failed.");
      }
    } catch (error) {
      console.error("Payment failed:", error.message);
      // You can display an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
    <IonButton onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : "Checkout - Payment Sheet"}
    </IonButton>
    </IonPage>
  );
};

export default StripeCheckoutButton;
