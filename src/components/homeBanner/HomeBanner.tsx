import React from "react";

import { IonContent, IonInput, IonIcon, IonImg } from "@ionic/react";

import "./HomeBanner.css";
import bgOne from "../../assets/images/banner-bg.jpg";

import { search } from "ionicons/icons";

const HomeBanner = () => {
    return (
        <>
            {/* <IonContent fullscreen={true} className="ion-padding-0"> */}
            <div className="homeBannerArea">
                <h3>Need Funds to Help a loved one or raise funds for other causes</h3>
                <p>Start a fundraiser to receive financial support in your time of need </p>
                <div className="homeBanner">
                    <IonImg src={("../../assets/images/home-banner.jpg")} alt="" />
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

            {/* <div className='banner d-flex align-items-center justify-content-center' style={{ backgroundImage: `url(${bgOne})` }}>
                <div className="slogan">
                    <h5>An intelligent gateway</h5>
                    <h2>to your avorite restaurants.</h2>
                    <p>Intelligent food and restaurants
                        recommendations.</p>
                    <div className='srcArea'>
                        <IonInput placeholder="Custom input" class="imput-1"></IonInput>
                        <span><IonIcon slot="icon-only" icon={search}></IonIcon></span>
                    </div>
                </div>
            </div> */}
            {/* </IonContent> */}
        </>
    );
};

export default HomeBanner;
