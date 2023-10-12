import React from "react";
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonButton, IonTitle, IonToolbar, IonImg, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { person, logOut, personCircle } from "ionicons/icons";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar color="" className="headerWrap">
                        <IonTitle>Mithun Dey</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding navigation">
                    <IonItem href="#">
                        <IonIcon className="mr-20" slot="start" icon={person} />{" "}
                        <IonLabel color="dark" className="bold">
                            Profile
                        </IonLabel>
                    </IonItem>
                    <IonItem href="#">
                        <IonIcon className="mr-20" slot="start" icon={logOut} />{" "}
                        <IonLabel color="dark" className="bold">
                            Logout
                        </IonLabel>
                    </IonItem>

                    {/* <IonButton fill="clear" expand="full" className='ion-text-left'><IonIcon slot="start" icon={person}/> </IonButton>
            <IonButton fill="clear" expand="full"><IonIcon slot="start" icon={logOut}/> Logout</IonButton> */}
                </IonContent>
            </IonMenu>
            <IonHeader id="main-content">
                <IonToolbar>
                    {/* <IonButtons slot="end">
            <IonMenuButton color='secondary'></IonMenuButton>
          </IonButtons> */}
                    <IonTitle slot="start" className="nameIntro">
                        {/* <Link to={'/'}><IonImg className='logo' src={("../assets/images/logo.png")} alt="" /></Link> */}
                        <h6>Welcome</h6>
                        <h5>Mr. Peter Gomes</h5>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default Header;
