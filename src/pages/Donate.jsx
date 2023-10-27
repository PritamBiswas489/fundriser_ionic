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
  IonFab,
  IonFabButton,
} from "@ionic/react";

import { logoUsd, addCircle } from "ionicons/icons";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { chevronBackOutline, personCircle, cloudDownloadOutline } from "ionicons/icons";

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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AddComment from "../components/AddComment";
import Menu from "../components/Menu";

const Donate = () => {
  const params = useParams();
  const campaign_id = params["id"];

  const [details, setDetails] = useState({});
  const [campaignImages, setCampaignImages] = useState([]);
  const [campaignDocuments, setCampaignDocuments] = useState([]);



  // campaignDocuments
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
      setCampaignImages(responseData.campaignImages);
      setCampaignDocuments(responseData.campaignDocuments);
    }
  };
  useEffect(() => {
    generateCampaignDetails();
  }, [campaign_id]);

  const router = useIonRouter();
  function donationPage() {
    router.push(`/donation/${campaign_id}`, "forward", "push");
  }
  function formatedDate(createdDate) {
    const dateString = createdDate;
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }
  function formatAmount(amt) {
    return amt.toLocaleString();
  }

  const [showModal, setShowModal] = useState(false);

  const openAddCommentPopUp = () => {
    setShowModal(true);
  };
  const closeAddCommentPopup = () => {
    setShowModal(false);
  };
  const [selectedIndex,setSelectedIndex] = useState(0);
  const handleTabSelect = (index) =>{
    setSelectedIndex(index);
  }

  const [showCommentElements,setShowCommentElements]  =  useState(false);

  useEffect(()=>{
    if(selectedIndex === 2){
      setShowCommentElements(true);
    }else{
      setShowCommentElements(false);
    }

  },[selectedIndex])

  let percentage = 0;
  const totalRaise = parseFloat(details?.totalAmountRaised);
  if (details?.goal) {
    percentage = (parseFloat(totalRaise) * 100) / details.goal;
  }
   
  const downloadFile = (documentLink)=>{
    window.open(documentLink, '_blank');
  }
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  
  return (
    <>
     
      <IonPage >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/listing" />
            </IonButtons>
            <IonTitle>Donate</IonTitle>
            <IonButtons slot="end">
            <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent  fullscreen={true}>
          {fundRaiserLoading && <SkeletonLoader />}

          {details?.id && (
            <div className="donatePage">
              <div className="homeBannerArea">
                <h3>{details?.title}</h3>
                {campaignImages && (
                  <div className="homeBanner">
                    <Swiper
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper"
                    >
                      {campaignImages.map((imageUrl, imageIndex) => {
                        return (
                          <SwiperSlide key={imageIndex}>
                            <LazyLoadImage
                              alt={details?.title}
                              effect="blur"
                              src={imageUrl}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                )}

                <div className="createNews d-flex justify-content-between align-items-center">
                  <h6>Created {formatedDate(details.created_at)}</h6>
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
                  <h5>
                    ${formatAmount(totalRaise)} raised of $
                    {formatAmount(details.goal)}
                  </h5>
                  <IonProgressBar
                    value={percentage / 100}
                    buffer={0.1}
                  ></IonProgressBar>
                </div>
              </div>
              <div className="donateTabs">
                <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
                  <TabList>
                    <Tab>Story</Tab>
                    <Tab>Campaigner</Tab>
                    <Tab>Comments</Tab>
                    <Tab>Donators</Tab>
                   {campaignDocuments.length > 0 ? <Tab>Files</Tab> : '' } 
                  </TabList>

                  <TabPanel>
                    <div className="iabContent">
                      <Story desc={details?.description} />
                    </div>
                    <div className="iabContent">
                      {details?.more_info && <h4>More info:</h4>}
                      <Story desc={details?.more_info} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <CampaignerDetails
                      profile={details?.profile}
                      campaign_company={details?.campaign_company}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Comments campaign_id={campaign_id} />
                  </TabPanel>
                  <TabPanel>
                    <Donators campaign_id={campaign_id} />
                  </TabPanel>
                  {campaignDocuments.length > 0 ? <TabPanel>
                    {campaignDocuments.map((documentLink,documentIndex)=>{
                        return (<IonButton onClick={()=>downloadFile(documentLink)} fill="clear" color="primary">
                        <IonIcon icon={cloudDownloadOutline} />{"  "}
                        {`Document ${documentIndex+1}`}
                      </IonButton>)

                    })}
                    

                  </TabPanel> : ''} 
                </Tabs>
              </div>
              <div className="donateNow "></div>
            </div>
          )}
        </IonContent>
        {showCommentElements &&  <IonFab
          vertical="bottom"
          horizontal="start"
          slot="fixed"
          className="fixed-fab"
        >
          <IonFabButton>
            <IonIcon icon={addCircle} onClick={openAddCommentPopUp} />
          </IonFabButton>
        </IonFab>}
       

        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          className="fixed-fab"
        >
          <IonFabButton onClick={donationPage}>
            <IonIcon icon={logoUsd} />
          </IonFabButton>
        </IonFab>

        {showCommentElements && <AddComment
        campaign_id={campaign_id}
        closeAddCommentPopup={closeAddCommentPopup}
        showModal={showModal}
      />}

        <Footer />
      </IonPage>
    </>
  );
};

export default Donate;
