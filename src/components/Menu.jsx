import React from "react";
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { menuController } from "@ionic/core/components";

export default function Menu() {
  return (
    <>
      <IonMenu menuId="first-menu" type="overlay" contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>First Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the first menu content.
        </IonContent>
      </IonMenu>
    </>
  );
}
