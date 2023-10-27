import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons"; // Import the close icon
import { useEffect } from "react";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";

export default function AccountCampaignDonationListModal({
  selectedCampaignTitle,
  selectedCampaignID,
  showDonationListModal,
  setShowDonationListModal,
}) {
  const [resultData, setResultData] = useState([]);

  const handleClosePopup = () => {
    setShowDonationListModal(false);
  };
  const {
    isLoading: dataLoading,
    error: dataError,
    sendRequest: dataFetch,
    clearError,
  } = useHttpClient();

  const getData = async () => {
    const searchValue = { campaignID: selectedCampaignID };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await dataFetch(
      `${API_BASE_URL}singledonation?${queryString}`
    );
    setResultData(responseData.donation);
  };
  useEffect(() => {
    if (selectedCampaignID > 0) {
      getData();
    }
  }, [selectedCampaignID]);
  function formatedDate(createdDate) {
    const dateString = createdDate;
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }
  return (
    <IonModal isOpen={showDonationListModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontSize: "14px" }}>{selectedCampaignTitle}</IonTitle>
          <IonIcon
            icon={closeCircle}
            onClick={handleClosePopup}
            slot="end"
            style={{ fontSize: "24px", marginRight: "12px", cursor: "pointer" }}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {dataLoading && <SkeletonLoader />}

        {!dataLoading &&
          resultData.length > 0 &&
          resultData.map((item, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardSubtitle>
                  {formatedDate(item?.created_at)}
                </IonCardSubtitle>
                <IonCardTitle>${item?.payment}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {item?.payer_name}, {item?.payer_email}, {item?.payer_phone},{" "}
                {item?.payer_address}
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonModal>
  );
}
