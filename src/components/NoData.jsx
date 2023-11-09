import React from 'react';
import {
    IonContent,
    IonButton,
  } from '@ionic/react';
import { startCampignModalActions } from '../store/redux/start-campaign-modal-slice';
import { startCampignDataActions } from '../store/redux/start-campaign-data-slice';
import { useDispatch } from 'react-redux';

export default function NoData({message}) {
    const dispatch = useDispatch();
  return (
    <IonContent className="ion-padding">
            <div className="ion-text-center">
              <h2>{message}</h2>
              <p>Start fundraiser click below!</p>
              <IonButton onClick={()=>{
                 dispatch(startCampignModalActions.setData({field:'show',data:true}));
                 dispatch(startCampignDataActions.setData({field:'campaignID',data:0}));
                 dispatch(startCampignDataActions.resetState());
              }} expand="full">
                Start Campaign
              </IonButton>
            </div>
          </IonContent>
  )
}
