// src/app/modals/success-modal/success-modal.tsx
import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/react';

interface SuccessModalProps {
  dismissModal: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ dismissModal }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payment Successful</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Your payment was successful. Thank you for your donation!</p>
        <IonButton expand="full" onClick={dismissModal}>Close</IonButton>
      </IonContent>
    </>
  );
};

export default SuccessModal;
