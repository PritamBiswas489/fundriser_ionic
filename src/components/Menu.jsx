import React from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  
} from "@ionic/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();
  function isVisible(element) {
    const computedStyle = window.getComputedStyle(element);
    return element.offsetWidth > 0 && element.offsetHeight > 0 && computedStyle.getPropertyValue('display') !== 'none';
  }
  useEffect(() => {
    const menu = document.querySelector("ion-menu");
    if (isVisible(menu)) {
      menu.toggle();
    } 
  }, [location.pathname]);
  return (
    <>
      <IonMenu menuId="menu" type="overlay" contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/account-dashboard">
              <IonLabel>Dashboard</IonLabel>
            </IonItem>
            <IonItem routerLink="/account-your-donation">
              <IonLabel>Your donation</IonLabel>
            </IonItem>
            <IonItem routerLink="/account-donation-list">
              <IonLabel>Donation List</IonLabel>
            </IonItem>
            <IonItem routerLink="/account-payment-list">
              <IonLabel>Payment List</IonLabel>
            </IonItem>
            <IonItem routerLink="/account-profile">
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem onClick={() => alert("Logout not done yet")}>
              <IonLabel>Signout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
}
