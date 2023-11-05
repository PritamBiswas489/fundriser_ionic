import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useHttpClient } from '../hook/http-hook';
import { API_BASE_URL } from '../config';
import { useIonToast } from "@ionic/react";

const ForgotPasswordPopup = ({ isOpen, onClose }) => {
    
  const [email, setEmail] = useState('');

  function objectToFormData(obj) {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
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

  const {
    isLoading: accountDataSaveLoading,
    error: accountDataSaveError,
    sendRequest: accountDataFetch,
    clearError: accountDataError,
  } = useHttpClient();

  const handleResetPassword = async () => {
    // Add your logic to send a password reset email to the user's email address (email state).
    // You can use a service or API call for this.
    if (email.trim() === "") {
        presentToast("middle", "Enter your email address");
        return;
    }
    if (!isValidEmail(email)) {
        presentToast("middle", "Enter valid email address");
        return;
    }

    const formData = objectToFormData({email});
    //console.log(formData);
    const responseData = await accountDataFetch(
      `${API_BASE_URL}forget-password`,
      "POST",
      formData
    );
      if (typeof responseData !== "undefined" && responseData?.success) {
        presentToast("middle", responseData.message);
        setEmail('');
        onClose();
      } else if (accountDataSaveError) {
        if (responseData?.message) {
          presentToast("middle", responseData.message);
        } else {
          presentToast("middle", "Forget password  failed.");
          
        }
        
      }

  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonButton disabled={accountDataSaveLoading} expand="full" onClick={handleResetPassword}>
        {accountDataSaveLoading ? "Processing..." : "Reset password"}
        </IonButton>
        <IonButton  expand="full" onClick={onClose} color="medium">
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ForgotPasswordPopup;
