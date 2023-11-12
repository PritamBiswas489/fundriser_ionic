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
  IonAlert,
  IonLoading,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { API_BASE_URL, DATA_PER_PAGE, SITE_URL } from "../config";
import { useHttpClient } from "../hook/http-hook";
import { userAccountDataActions } from "../store/redux/user-account-data";
import { useIonToast } from "@ionic/react";
import { Browser } from '@capacitor/browser';

export default function AccountConnectBank() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state["userData"].user_id);
  const userData = useSelector((state) => state["userAccountData"].user);
  const [showIonLoader, setShowIonLoader] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isConnectProcessStart, setConnectProcessStart] = useState(false);
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
  
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  const handleConfirm =   () => {
    const searchValue = { user_id };
    const queryString = new URLSearchParams(searchValue).toString();
    setShowAlert(false);
    setShowIonLoader(true);
    fetch(`${API_BASE_URL}disconnect-stripe?${queryString}`)
    .then((response)=>response.json())
    .then((response)=>{
      setShowIonLoader(false)
      if(response?.success){
        presentToast('middle',response.success);
        const d = {...userData,canCreateCampaign:false};
        dispatch(userAccountDataActions.setData({field:'user',data:d}));
      }
    })
    .catch(error=>{
      presentToast('middle','Unable to disconnect');
      setShowIonLoader(false)
    })
    
    
  };
  const handleCancel = () => {
    //console.log('Cancelled');
    setShowAlert(false);
  };
  useEffect(() => {
    //console.log(userData?.canCreateCampaign);
    if (userData?.canCreateCampaign) {
      setIsConnected(true);
    }else{
      
      setIsConnected(false);
    }
  }, [userData]);

 


const openConnectStripeUrl = async () => {
  if(userData?.encypteduserid){
    await Browser.open({ url: `${API_BASE_URL}app-stripe-connect/${userData?.encypteduserid}` });
  }else{
    presentToast('middle','Unable to disconnect');
  }
  
};
 
useEffect(() => {
  const handleBrowserFinished = () => {
    setConnectProcessStart(true);
    const searchValue = { user_id };
    const queryString = new URLSearchParams(searchValue).toString();
    fetch(`${API_BASE_URL}checkingStripe?${queryString}`)
    .then((response)=>response.json())
    .then((response)=>{
      setConnectProcessStart(false)
      if(response?.connected){
        presentToast('middle','Your bank account successfully connected with us.');
        const d = {...userData,canCreateCampaign:true};
        dispatch(userAccountDataActions.setData({field:'user',data:d}));
      }else{
        presentToast('middle','We are not connected with your bank account');
      }
    })
    .catch(error=>{
      presentToast('middle','We are not connected with your bank account');
      setConnectProcessStart(false);
    })
     
  };

  const setupListeners = async () => {
    // Add the custom event listener
    const listener = await Browser.addListener('browserFinished', handleBrowserFinished);

    // Optionally, you can store the listener to remove it later if needed
    const removeListener = () => listener.remove();

    // Remember to remove the listener when the component unmounts to avoid memory leaks
    return removeListener;
  };

  setupListeners();

  // Clean up the listener when the component unmounts
  return  () => {
      // Remove the listener if needed
      // cleanup();
      // await Browser.removeAllListeners();
       
  };
}, []); // Empty dependency array ensures the effect runs only once when the component mounts
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/landing" />
            </IonButtons>
            <IonTitle className="backTitle">Connect Bank</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="ion-padding">
            {isConnected && (
              <>
                <div className="inputArea">
                  <h4>You payment account already connected</h4>
                </div>

                <div className="inputArea" style={{ marginTop: 20 }}>
                  <IonButton onClick={() => setShowAlert(true)} expand="full">
                    Disconnect Bank Account
                  </IonButton>
                </div>
              </>
            )}
            {!isConnected && (
              <>
                <div className="inputArea">
                  <h4>Connect your bank account click below</h4>
                </div>

                <div className="inputArea" style={{ marginTop: 20 }}>
                  <IonButton onClick={openConnectStripeUrl} expand="full">
                    Connect Bank Account
                  </IonButton>
                </div>
              </>
            )}
          </div>
          <IonLoading isOpen={showIonLoader} message={"Processing..."} />
          <IonLoading 
          isOpen={isConnectProcessStart} 
          message={"Connection Checking..."}
          />
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirmation'}
          message={'Are you sure you want to proceed?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: handleCancel,
            },
            {
              text: 'Confirm',
              handler: handleConfirm,
            },
          ]}
        />
         
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
}
