import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import HomeBanner from '../components/homeBanner/HomeBanner';
// import HomeSecOne from '../components/homeSecOne/HomeSecOne';
// import PopularLocation from '../components/popularLocation/PopularLocation';
// import Collection from '../components/collection/Collection';

import "./Home.css";
import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
    return (
        <IonPage>
            {/* <IonHeader>
        <IonToolbar>
          <IonTitle>de babyspa</IonTitle>
        </IonToolbar>
      </IonHeader> */}
            {/* <Header /> */}
            <IonContent fullscreen>
                <ExploreContainer />
                {/* <HomeBanner />
        <HomeSecOne />
        <PopularLocation />
        <Collection /> */}
            </IonContent>
            {/* <Footer /> */}
        </IonPage>
    );
};

export default Home;
