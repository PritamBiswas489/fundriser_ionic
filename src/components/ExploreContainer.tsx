import "./ExploreContainer.css";
import React from "react";
import { IonButton, IonContent, IonText, IonImg } from "@ionic/react";
import { useIonRouter } from "@ionic/react";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const router = useIonRouter();
    function goToLoginPage() {
        router.push("/login", "forward", "push");
    }
    return (
        <>
            <IonContent fullscreen={true}>
                <div className="homeArea d-flex align-content-between flex-wrap">
                    <div className="homeImg">
                        <IonImg src={"../assets/images/home-img.png"} alt="" />
                    </div>
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <IonButton className="skip" onClick={goToLoginPage}>
                            Skip
                        </IonButton>
                        <IonButton className="next" onClick={goToLoginPage}>
                            Next
                        </IonButton>
                    </div>
                </div>
            </IonContent>

            {/* <Footer /> */}
        </>
    );
};

export default ExploreContainer;
