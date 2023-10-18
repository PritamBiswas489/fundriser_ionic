import React from "react";
import "./Donators.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonList,
  IonButton,
  IonCardContent,
} from "@ionic/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useHttpClient } from "../../hook/http-hook";
import { API_BASE_URL } from "../../config";
import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";

const Donators = ({ campaign_id }) => {
  const [page, setPage] = useState(1);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [donatorsData, setDonatorsData] = useState([]);
  const {
    isLoading: listDonatorLoading,
    error: listDonatorError,
    sendRequest: listDonatorFetch,
    addDonatorClearError,
  } = useHttpClient();

  const getDonatorsList = async (refresh = true) => {
    const searchValue = { campaign_id, page };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await listDonatorFetch(
      `${API_BASE_URL}get-campaign-donators-list?${queryString}`
    );
    setHasLoadMore(responseData?.hasMore);
    if (refresh === true) {
      setDonatorsData([...responseData?.results]);
    } else {
      setDonatorsData([...donatorsData, ...responseData?.results]);
    }
  };

  useEffect(() => {
    if (page == 1) {
      getDonatorsList(true);
    } else {
      getDonatorsList(false);
    }
  }, [campaign_id, page]);

  function formatDateDifference(donatedDate) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const oneMonth = 30 * oneDay; // One month roughly equals 30 days
    const start = new Date(donatedDate);
    const end = new Date();
    const diffInDays = Math.round(Math.abs((end - start) / oneDay));
    if (diffInDays <= 0) {
      return "Today"; // Same day
    } else if (diffInDays < 30) {
      return diffInDays + " day" + (diffInDays > 1 ? "s" : ""); // Less than a month
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return months + " month" + (months > 1 ? "s" : ""); // Less than a year
    } else {
      const years = Math.floor(diffInDays / 365);
      return years + " year" + (years > 1 ? "s" : ""); // One year or more
    }
  }

  return (
    <>
      <IonList>
        {listDonatorLoading && <SkeletonLoader />}
        {!listDonatorLoading && donatorsData.length === 0 && (
          <IonCard>
            <IonCardContent>No donators yet.</IonCardContent>
          </IonCard>
        )}
        {donatorsData.length > 0 &&
          donatorsData.map((donator, donatorIndex) => {
            return (
              <IonCard key={donatorIndex}>
                <IonCardHeader className="d-flex align-items-center donators">
                  <div className="donatorsImg">
                    <span>
                      <LazyLoadImage
                        alt=""
                        effect="blur"
                        src="../../assets/images/donator.jpg"
                      />
                    </span>
                  </div>
                  <div className="donatorsRight">
                    <IonCardTitle>
                      {parseInt(donator?.anonymous) === 0
                        ? donator?.payer_name
                        : "Anonymous"}
                    </IonCardTitle>
                    <ul className="d-flex">
                      <li>
                        <span>
                          <IonImg
                            src="../../assets/images/dollar-icon.png"
                            alt=""
                          />
                        </span>{" "}
                        ${donator?.payment}
                      </li>
                      <li>
                        <span>
                          <IonImg
                            src="../../assets/images/clock-icon.png"
                            alt=""
                          />
                        </span>{" "}
                        {formatDateDifference(donator?.created_at)}
                      </li>
                    </ul>
                  </div>
                </IonCardHeader>
              </IonCard>
            );
          })}

        {hasLoadMore ? (
          <IonButton
            color="primary"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={listDonatorLoading}
            expand="block"
            size="small"
          >
            Load More
          </IonButton>
        ) : (
          ""
        )}
      </IonList>
    </>
  );
};

export default Donators;
