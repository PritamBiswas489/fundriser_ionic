import React, { useState, useEffect } from "react";
import "./AccountProfile.css";
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
  IonInput,
  IonLabel,
} from "@ionic/react";

import { eye, eyeOff } from "ionicons/icons";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import Footer from "../components/Footer";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";
import { useHttpClient } from "../hook/http-hook";
import { useSelector, useDispatch } from "react-redux";
import { useIonToast } from "@ionic/react";
 

export default function AccountChangePassword() {
  const user_id = useSelector((state) => state["userData"].user_id);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [present] = useIonToast();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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

  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }

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
    isLoading: accountDataSaveLoading,
    error: accountDataSaveError,
    sendRequest: accountDataFetch,
    clearError: accountDataError,
  } = useHttpClient();

  const changePasswordProcessData = async () =>{
    if(newPassword === ''){
        presentToast('middle','Enter new password');
        return;
    }
    if(newPassword.length  < 6){
        presentToast('middle','New password length equal or greater than 6');
        return;
    }
    if(confirmPassword === ''){
        presentToast('middle','Enter confirm password');
        return;
    }
    if(confirmPassword !== newPassword){
        presentToast('middle','Confirm password must be equal to new password ');
        return;
    }
    const postData = {
        newPassword,
        user_id
    }
    const formData = objectToFormData(postData);
    const responseData = await accountDataFetch(
        `${API_BASE_URL}change-password`,
        "POST",
        formData
      );
      if (typeof responseData !== "undefined" && responseData?.success) {
          presentToast("middle", responseData.message);
          setNewPassword('');
          setConfirmPassword('');
      }else if (accountDataSaveError) {
        if (responseData?.message) {
          presentToast("middle", responseData.message);
        } else {
          presentToast("middle", "Change password failed.");
        }
      }
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/" />
            </IonButtons>
            <IonTitle className="backTitle">Change password</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="ion-padding">
            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                New password <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onIonInput={(e) => {
                  setNewPassword(e.detail.value);
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 10,
                  color: "#60bc40",
                  bottom: 4,
                  zIndex: 9999999999,
                  cursor: "pointer",
                  fontSize: 21,
                }}
                onClick={togglePasswordVisibility}
              >
                <IonIcon icon={showPassword ? eye : eyeOff} />
              </span>
            </div>
            <div className="inputArea" style={{ marginTop: 5 }}>
              <IonLabel>
                Confirm password <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onIonInput={(e) => {
                  setConfirmPassword(e.detail.value);
                }}
              />

              <span
                style={{
                  position: "absolute",
                  right: 10,
                  color: "#60bc40",
                  bottom: 4,
                  zIndex: 9999999999,
                  cursor: "pointer",
                  fontSize: 21,
                }}
                onClick={toggleConfirmPasswordVisibility}
              >
                <IonIcon icon={showConfirmPassword ? eye : eyeOff} />
              </span>
            </div>

            <div
              className="inputArea"
              style={{ marginTop: 5, marginBottom: 40 }}
            >
              <IonButton
                expand="full"
                  disabled={accountDataSaveLoading}
                  onClick={changePasswordProcessData}
              >
                {accountDataSaveLoading ? "Processing..." : " Update password"}
              </IonButton>
            </div>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
}
