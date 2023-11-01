import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Home.css";
import ExploreContainer from "../components/ExploreContainer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useIonRouter } from "@ionic/react";

const Home  = () => {
    const router = useIonRouter();
    const user_id = useSelector((state) => state["userData"].user_id);
    useEffect(()=>{
      if(parseInt(user_id) > 0){
        router.push("/landing", "forward", "refresh");
      }
    },[user_id])
    return (
        <IonPage>
            <IonContent fullscreen>
                <ExploreContainer />      
            </IonContent>
        </IonPage>
    );
};

export default Home;
