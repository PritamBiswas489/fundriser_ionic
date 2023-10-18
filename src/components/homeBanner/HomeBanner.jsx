import React from "react";
import "./HomeBanner.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const HomeBanner = () => {
  return (
    <>
      {/* <IonContent fullscreen={true} className="ion-padding-0"> */}
      <div className="homeBannerArea">
        <h3>Need Funds to Help a loved one or raise funds for other causes</h3>
        <p>
          Start a fundraiser to receive financial support in your time of need{" "}
        </p>
        <div className="homeBanner">
          <LazyLoadImage
            alt={""}
            effect="blur"
            width={"100%"}
            height={'200px'}
            src={"../../assets/images/home-banner.jpg"}
          />
        </div>
        <div className="joinCommunity">
          <h6>Join the community</h6>
          <ul className="d-flex justify-content-between">
            <li>
              <span>50 Thousand +</span>This Year
            </li>
            <li>
              <span>2 Thousand +</span>Website Clicks
            </li>
            <li>
              <span>20 Thousand +</span>Amount Raised{" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
