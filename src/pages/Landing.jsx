import React, { useState, useEffect, useRef } from "react";
import "./Landing.css";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonImg,
  IonProgressBar,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonSearchbar,
  IonMenu,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import HomeBanner from "../components/homeBanner/HomeBanner";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Footer from "../components/Footer";
import { search } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { homeSearchFieldActions } from "../store/redux/home-search-field-slice";
import { pageListingActions } from "../store/redux/page-listing-slice";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";
import { homeListingActions } from "../store/redux/home-listing-slice";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Menu from "../components/Menu";

const Landing = () => {
  const [isDragging, setIsDragging] = useState(false);

  const router = useIonRouter();
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state) => state["homeSearchField"].searchValue
  );

  const campaignList = useSelector((state) => state["homeListing"].list);

  const setSearchValue = (value) => {
    dispatch(homeSearchFieldActions.setValue(value));
  };

  const {
    isLoading: fundRaiserLoading,
    error: fundRaiserError,
    sendRequest: fundRaiserFetch,
    clearError,
  } = useHttpClient();

  const generateItems = async () => {
    const searchValue = {
      page: 0,
      limit: 200,
      cat_id: 0,
      s: "",
    };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await fundRaiserFetch(
      `${API_BASE_URL}fundraisers?${queryString}`
    );
    dispatch(homeListingActions.set([...responseData.data]));
  };

  useEffect(() => {
    if (campaignList.length === 0) {
      generateItems();
    }
  }, [campaignList]);

  const inspirition = {
    autoplay: true,
    autoplayTimeout: 10000,
    smartSpeed: 2000,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    navElement: "div",
    responsive: {
      0: {
        items: 1.3,
      },
      600: {
        items: 1.3,
      },
    },
  };

  const gotoListpage = () => {
    if (searchValue.trim() !== "") {
      dispatch(pageListingActions.refresh());
      router.push("/listing", "forward", "push");
    }
  };
  const toDetailsPage = (campaign_id) => {
    router.push(`/donate/${campaign_id}`, "forward", "push");
  };
  const toDonationPage = (campaign_id) => {
    router.push(`/donation/${campaign_id}`, "forward", "push");
  };
  const formatAmount = (amt) => {
    return amt.toLocaleString();
  };
  const getPercentage = (itemValue) => {
    let percentage = 0;
    const totalRaise = parseFloat(itemValue?.raised || 0);
    percentage = (parseFloat(totalRaise) * 100) / (itemValue?.goal || 0);
    return percentage;
  };
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  return (
    <>
      <Menu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} />
            </IonButtons>
            <IonTitle className="backTitle">
              <h6>Welcome,</h6>
              <h5>Guest</h5>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="innerSrcArea">
            <div className="innerSrc d-flex align-items-center">
              <IonSearchbar
                value={searchValue}
                onKeyUp={(e) => {
                  (e.key === "Enter" || e.key === "Search") && gotoListpage();
                }}
                onIonChange={(e) => {
                  setSearchValue(e.detail.value);
                }}
                className="innerSrcInput"
                placeholder="Search"
              />
              <Link
                to={"#"}
                onClick={(e) => {
                  e.preventDefault();
                  gotoListpage();
                }}
                className="searchbutton"
              >
                <IonIcon icon={search} slot="start" />
              </Link>
            </div>
            <div className="">
              <HomeBanner />
            </div>
            {fundRaiserLoading && <SkeletonLoader />}
            {campaignList.length > 0 && (
              <div className="donateArea">
                <OwlCarousel className="owl-theme" {...inspirition}>
                  {campaignList.map((itemValue, itemIndex) => {
                    return (
                      <div className="item" key={itemIndex}>
                        <div className="donateBox">
                          <div className="donateImg">
                            <Link
                              to={"#"}
                              onClick={(e) => {
                                e.preventDefault();
                                toDetailsPage(itemValue.id);
                              }}
                            >
                              <LazyLoadImage
                                alt={itemValue.title}
                                effect="blur"
                                height={"150px"}
                                width={"100%"}
                                src={itemValue.image}
                              />
                            </Link>
                          </div>
                          <div className="donateDesc">
                            <h5>{itemValue.title}</h5>
                            <p>
                              {truncateText(itemValue?.fundraising_for, 100)}
                            </p>
                            <h6>
                              <Link
                                to={"#"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toDetailsPage(itemValue.id);
                                }}
                              >
                                read more
                              </Link>
                            </h6>
                            <div className="progressArea">
                              <h5>
                                ${formatAmount(itemValue?.raised || 0)} raised
                                of ${formatAmount(itemValue?.goal || 0)}
                              </h5>
                              <IonProgressBar
                                value={getPercentage(itemValue) / 100}
                                buffer={0.1}
                              ></IonProgressBar>
                            </div>
                            <div className="donateNow">
                              <IonButton
                                color="primary"
                                expand="block"
                                size="small"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toDonationPage(itemValue.id);
                                }}
                              >
                                DONATE NOW
                              </IonButton>
                            </div>
                            <div className="donateDescFooter">
                              <p>By {itemValue.uploaderName}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </OwlCarousel>
              </div>
            )}
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default Landing;
