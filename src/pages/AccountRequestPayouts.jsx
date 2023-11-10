import React from "react";
import { useState, useEffect } from "react";
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import { useIonToast } from "@ionic/react";

import { chevronBackOutline, personCircle } from "ionicons/icons";
import Footer from "../components/Footer";
import NoData from "../components/NoData";
import { useSelector } from "react-redux";

export default function AccountRequestPayouts() {
  const [resultData, setResultData] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);
  const [balanceLeft, setBalanceLeft] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const user_id = useSelector((state) => state["userData"].user_id);
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

  const {
    isLoading: balanceDataLoading,
    error: balanceDataError,
    sendRequest: balanceDataFetch,
    clearError:balanceClearError,
  } = useHttpClient();

  const getBalance = async () => {
    const searchValue = { user_id };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await dataFetch(
      `${API_BASE_URL}get-payout-balance?${queryString}`
    );
    if (typeof responseData !== "undefined" && responseData?.bananceLeft) {
          setBalanceLeft(responseData?.bananceLeft);
    }
  };
  useEffect(() => {
    getData();
    getBalance();
  }, []);

  useEffect(()=>{
    if(!dataLoading && !balanceDataLoading){
        setMainLoading(false);
    }
  },[dataLoading,balanceDataLoading])

  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  function validatePrice(input) {
    // Regular expression to match a valid price format with two decimal places
    var regex = /^\d+(\.\d{1,2})?$/;

    // Test the input against the regular expression
    return regex.test(input);
  }

  const {
    isLoading: requestPayoutProcessLoading,
    error: requestPayoutProcessError,
    sendRequest: requestPayoutProcessFetch,
    clearError: requestPayoutProcessClearError,
  } = useHttpClient();

  const processRequestAmount = async () => {
    if (parseInt(selectedCampaign) === 0) {
        presentToast("middle", "Select campaign");
        return;
    }
    if (!validatePrice(selectedAmount)) {
        presentToast("middle", "Enter valid request amount");
        return;
    }
    if(parseFloat(balanceLeft) < parseFloat(selectedAmount)){
        presentToast("middle", "Request payout amount greater than balance left");
        return;
    }
    const responseData = await requestPayoutProcessFetch(
      `${API_BASE_URL}request-payout-process`,
      "POST",
      JSON.stringify({ 
        user_id, 
        selectedCampaign, 
        selectedAmount 
      }),
      {
        "Content-Type": "application/json",
      }
    );
    if (typeof responseData !== "undefined" && responseData.success) {
      requestPayoutProcessClearError();
      presentToast("middle", "Request payout successfully send.");
      setSelectedCampaign(0);
      setSelectedAmount(null);
    } else if (requestPayoutProcessError) {
      requestPayoutProcessClearError();
      presentToast("middle", "Request payout failed.");
    }
  };
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/" />
            </IonButtons>
            <IonTitle className="backTitle">Request Payout</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {mainLoading && <SkeletonLoader />}
          {!mainLoading && resultData.length > 0 ? (
            <div className="ion-padding">
              <h2 style={{ marginBottom: 20 }}>Balance Left : ${balanceLeft.toFixed(2)}</h2>
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Select Campaign <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonSelect
                  interface="action-sheet"
                  cancelText="Cancel Choice"
                  value={selectedCampaign}
                  className="selectOption"
                  placeholder="Select campaign"
                  onIonChange={(e) => {
                    setSelectedCampaign(e.detail.value);
                  }}
                >
                  {resultData.map((item, index) => {
                    return (
                      <IonSelectOption value={item?.id}>
                        {item?.title}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </div>
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Amount <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput
                  value={selectedAmount}
                  onIonInput={(e) => {
                    setSelectedAmount(e.detail.value);
                  }}
                />
              </div>
              <div
                className="inputArea"
                style={{ marginTop: 5, marginBottom: 40 }}
              >
                <IonButton
                  expand="full"
                  disabled={requestPayoutProcessLoading}
                  onClick={processRequestAmount}
                >
                  {requestPayoutProcessLoading ? "Processing..." : "Save"}
                </IonButton>
              </div>
            </div>
          ) : (
            !mainLoading && <NoData message="No campaign found" />
          )}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
}
