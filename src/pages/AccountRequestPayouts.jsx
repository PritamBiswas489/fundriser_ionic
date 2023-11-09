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

import { chevronBackOutline, personCircle } from "ionicons/icons";
import Footer from "../components/Footer";
import NoData from "../components/NoData";
import { useSelector } from "react-redux";

export default function AccountRequestPayouts() {
  const [resultData, setResultData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState([]);
  const user_id = useSelector((state) => state["userData"].user_id);

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
            <IonTitle className="backTitle">Request payput</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {dataLoading && <SkeletonLoader />}
          {!dataLoading && resultData.length > 0 ? (
            <div className="ion-padding">
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Select Campaign <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonSelect
                  interface="action-sheet"
                  cancelText="Cancel Choice"
                  value={"1"}
                  className="selectOption"
                  placeholder="Select campaign"
                  onIonChange={(e) => {}}
                >
                  {resultData.map((item, index) => {
                     return  (<IonSelectOption value={item?.id}>
                      {item?.title}
                    </IonSelectOption>);
                  })}
                </IonSelect>
              </div>
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Amount <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput value={""} onIonInput={(e) => {}} />
              </div>
              <div
                className="inputArea"
                style={{ marginTop: 5, marginBottom: 40 }}
              >
                <IonButton
                  expand="full"
                  //   disabled={accountDataSaveLoading}
                  //   onClick={processSaveProfileData}
                >
                  {/* {accountDataSaveLoading ? "Processing..." : "Save"} */}
                  Save
                </IonButton>
              </div>
            </div>
          ) : !dataLoading && (
            <NoData message="No campaign found" />
          )}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
}
