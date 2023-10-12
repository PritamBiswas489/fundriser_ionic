import React from "react";
import { IonContent, IonPage, IonImg } from "@ionic/react";

const Splash = () => {
    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div className="splashArea d-flex justify-content-center align-items-center">
                        <div className="splashlogo">
                            <IonImg src={("../assets/images/splash-logo.png")} alt="" />
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Splash;
