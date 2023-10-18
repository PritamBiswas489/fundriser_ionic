import React, { useState } from 'react';
import { IonModal, IonButton, IonInput } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { donationAmtActions } from '../store/redux/donation-amt-slice';
import { useIonToast } from "@ionic/react";

const DonationGratuityOtherAmtModal = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(state=>state['donationAmt'].otherGratuityAmount);
  const [selectedAmt,setSelectedAmt] = useState(inputValue);
  const showModal = useSelector(state=>state['donationAmt'].otherGratuityAmtModalShowStatus);
  const [present] = useIonToast();

  const presentToast = (position, message) => {
    present({
      message: message,
      duration: 3000,
      position: position,
      cssClass: "custom-toast",

      buttons: [
        {
          text: "Dismiss",
          role: "cancel",
        },
      ],
    });
  };

  function setShowModal(status){
     dispatch(donationAmtActions.setOtherGratuityAmtModalShowStatus(status));
  }
  const handleClosePopup = () => {
    setShowModal(false);
  };
  function isValidPrice(input) {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(input);
  }
  const handleSave = () => {
    if (!isValidPrice(selectedAmt)) {
        presentToast('middle','Invalid price amount.')
        return;
    }
    dispatch(donationAmtActions.setOtherGratuityAmount(selectedAmt));
    handleClosePopup();
  };
  return (
    <div>
      <IonModal isOpen={showModal}>
        <div className="ion-padding">
          <h2>Enter gratuity amount</h2>
          <IonInput
            value={parseFloat(selectedAmt)!==0 && selectedAmt}
            placeholder="Enter your choosen gratuity amount"
            onIonInput={(e) => setSelectedAmt(e.detail.value)}
          />
          <IonButton expand="full" onClick={handleSave}>Save</IonButton>
          <IonButton expand="full" onClick={handleClosePopup}>Cancel</IonButton>
        </div>
      </IonModal>
    </div>
  );
};

export default DonationGratuityOtherAmtModal;
