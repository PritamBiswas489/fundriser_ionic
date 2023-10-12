import React, { useEffect, useState } from "react";
import "./Donate.css";
import {
  IonContent,
  IonPage,
  IonImg,
  IonProgressBar,
   
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonIcon,
} from "@ionic/react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { chevronBackOutline, personCircle } from "ionicons/icons";

import { useIonRouter } from "@ionic/react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { BiDonateHeart } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";

import Story from "../components/Story/Story";
import CampaignerDetails from "../components/CampaignerDetails/CampaignerDetails";
import Comments from "../components/Comments/Comments";
import Donators from "../components/Donators/Donators";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL } from "../config";
import SkeletonLoader from "../components/SkeletonLoader";

const Donate = () => {
  const params = useParams();
  const campaign_id = params["id"];
 
  const [details, setDetails] = useState({});
  //alert(campaign_id);
  //i/fundraisersdetails?fundraiserid=36

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

  const router = useIonRouter();
  function donationPage(){
    router.push(`/donation/${campaign_id}`, "forward", "push");
  }
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/listing" />
            </IonButtons>
            <IonTitle>Donate</IonTitle>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {fundRaiserLoading && <SkeletonLoader />}

          {details?.id && (
            <div className="donatePage">
              <div className="homeBannerArea">
                <h3>
                  {details?.title}
                </h3>
                <div className="homeBanner">
                  <IonImg src={"../assets/images/home-banner.jpg"} alt="" />
                </div>
                <div className="createNews d-flex justify-content-between align-items-center">
                  <h6>Created February 10, 2023</h6>
                  <ul className="d-flex">
                    <li>
                      <Link to={"/"} className="donateIcon">
                        <BiDonateHeart />
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} className="shareIcon">
                        <FaShareAlt />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="progressArea">
                  <h5>$550 raised of $ 200,000</h5>
                  <IonProgressBar value={0.5} buffer={0.6}></IonProgressBar>
                </div>
              </div>
              <div className="donateTabs">
                <Tabs>
                  <TabList>
                    <Tab>Story</Tab>
                    <Tab>Campaigner Details</Tab>
                    <Tab>Comments</Tab>
                    <Tab>Donators</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="iabContent">
                      <Story desc={details?.description} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <CampaignerDetails />
                  </TabPanel>
                  <TabPanel>
                    <Comments />
                  </TabPanel>
                  <TabPanel>
                    <Donators />
                  </TabPanel>
                </Tabs>
              </div>
              <div className="donateNow ">
                <IonButton onClick={donationPage} color="primary" expand="block" size="small">
                  Donate now
                </IonButton>
              </div>
            </div>
          )}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default Donate;
