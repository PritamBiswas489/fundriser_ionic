import React from "react";
import "./Landing.css";
import { IonContent, IonPage, IonSearchbar, IonRefresher, IonRefresherContent, RefresherEventDetail, IonImg, IonProgressBar, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";

import { useIonRouter } from "@ionic/react";
import Header from "../components/Header";
import HomeBanner from "../components/homeBanner/HomeBanner";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Transform } from "stream";
import Footer from "../components/Footer";

interface ContainerProps {}

const Landing: React.FC<ContainerProps> = () => {
    const router = useIonRouter();
    function goToRegisterPage() {
        router.push("/Register", "forward", "push");
    }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    const inspirition = {
        autoplay: true,
        // rtl: true,
        autoplayTimeout: 5000,
        smartSpeed: 2000,
        // animateOut: 'fadeOut',
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        navElement: "div",
        // navText: ["<i class='fas fa-arrow-alt-circle-left'></i>", "<i class='fas fa-arrow-alt-circle-right'></i>"],
        responsive: {
            0: {
                items: 1.3,
            },
            600: {
                items: 1.3,
            },
        },
    };

    const sortBy = {
        autoplay: false,
        // rtl: true,
        // autoplayTimeout: 5000,
        smartSpeed: 2000,
        // animateOut: 'fadeOut',
        // loop: true,
        autoWidth: true,
        margin: 6,
        nav: false,
        dots: false,
        navElement: "div",
        // navText: ["<i class='fas fa-arrow-alt-circle-left'></i>", "<i class='fas fa-arrow-alt-circle-right'></i>"],
        responsive: {
            0: {
                items: 3.8,
            },
            600: {
                items: 5.5,
            },
        },
    };

    return (
        <>
            <IonPage>
                <Header />
                <IonContent fullscreen={true}>
                    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                    <div className="innerSrcArea">
                        <div className="innerSrc d-flex align-items-center">
                            <IonSearchbar placeholder="Custom Placeholder" className="innerSrcInput"></IonSearchbar>
                        </div>
                        <div className="">
                            <HomeBanner />
                        </div>
                        <div className="sortByArea p-h-20">
                            <h6>Categories</h6>
                            <OwlCarousel className="owl-theme" {...sortBy}>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Community</Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Organization / Group</Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Tavel</Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Pure Veg</Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Technology</Link>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Rating 4+</Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>New Arrivals</Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="sortByBox">
                                        <Link to={"./catagorie-listing"}>Pure Veg</Link>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                        <div className="donateArea">
                            <OwlCarousel className="owl-theme" {...inspirition}>
                                <div className="item">
                                    <div className="donateBox">
                                        <div className="donateImg">
                                            <Link to={"./donate"}>
                                                <IonImg src={("../assets/images/inspirition/1.jpg")} alt="" />
                                            </Link>
                                        </div>
                                        <div className="donateDesc">
                                            <h5>Feed the hungry children in Africa Daily.</h5>
                                            <p>Approximately 50 million children across ...</p>
                                            <h6>
                                                <Link to={"./donate"}>read more</Link>
                                            </h6>
                                            <div className="progressArea">
                                                <h5>$550 raised of $ 200,000</h5>
                                                <IonProgressBar value={0.5} buffer={0.6}></IonProgressBar>
                                            </div>
                                            <div className="donateNow">
                                                <IonButton color="primary" expand="block" size="small">
                                                    DONATE NOW
                                                </IonButton>
                                            </div>
                                            <div className="donateDescFooter">
                                                <p>By Diaspora For Yartoe</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="donateBox">
                                        <div className="donateImg">
                                            <Link to={"./donate"}>
                                                <IonImg src={("../assets/images/inspirition/1.jpg")} alt="" />
                                            </Link>
                                        </div>
                                        <div className="donateDesc">
                                            <h5>Feed the hungry children in Africa Daily.</h5>
                                            <p>Approximately 50 million children across ...</p>
                                            <h6>
                                                <Link to={"./donate"}>read more</Link>
                                            </h6>
                                            <div className="progressArea">
                                                <h5>$550 raised of $ 200,000</h5>
                                                <IonProgressBar value={0.5} buffer={0.6}></IonProgressBar>
                                            </div>
                                            <div className="donateNow">
                                                <IonButton color="primary" expand="block" size="small">
                                                    DONATE NOW
                                                </IonButton>
                                            </div>
                                            <div className="donateDescFooter">
                                                <p>By Diaspora For Yartoe</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </IonContent>
                <Footer />
            </IonPage>
        </>
    );
};

export default Landing;
