import { useEffect, useState } from "react";
import { closeCircle } from "ionicons/icons";
import {
  IonIcon,
  IonModal,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
function useContentModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ContentModal = ({ content, title }) => {
    return (
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
            <IonIcon
              icon={closeCircle}
              onClick={closeModal}
              slot="end"
              style={{
                fontSize: "24px",
                marginRight: "12px",
                cursor: "pointer",
              }}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </IonContent>
      </IonModal>
    );
  };
  return { openModal, closeModal, ContentModal };
}
export default useContentModal;
