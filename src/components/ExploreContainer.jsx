import "./ExploreContainer.css";
import React, {useState} from "react";
import { IonButton, IonContent, IonText, IonImg } from "@ionic/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useIonRouter } from "@ionic/react";

 

const ExploreContainer  = () => {
    const [showbutton,setShowButton] = useState(false);
    const router = useIonRouter();
    const user_id = useSelector((state) => state["userData"].user_id);
    useEffect(()=>{
        if(parseInt(user_id) === 0){
            setShowButton(true);
        }
    },[user_id])

    function goToLoginPage() {
        router.push("/login", "forward", "push");
    }
    function goToHomePage() {
        router.push("/landing", "forward", "push");
    }
    return (
        <>
            <IonContent fullscreen={true}>
                <div className="homeArea d-flex align-content-between flex-wrap">
                    <div className="homeImg">
                        <IonImg src={"../assets/images/home-img.png"} alt="" />
                    </div>
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      {showbutton && (<IonButton className="skip" onClick={goToHomePage}>
                            Skip to home
                        </IonButton>) }  

                        {showbutton && ( <IonButton className="next" onClick={goToLoginPage}>
                            login
                        </IonButton>) } 
                       
                    </div>
                </div>
            </IonContent>

            {/* <Footer /> */}
        </>
    );
};

export default ExploreContainer;
