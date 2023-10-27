import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonList, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import { IonInput } from "@ionic/react";

import { startCampignDataActions } from "../../store/redux/start-campaign-data-slice";
import { Link } from "react-router-dom";

export default function Documents() {
  const dispatch = useDispatch();
  const setSelectedDocuments = (value) =>
    dispatch(
      startCampignDataActions.setData({
        field: "selectedDocuments",
        data: value,
      })
    );
  const existingDocuments = useSelector(
    (state) => state["startCampignData"].existingDocuments
  );

  function serializeFile(file) {
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
    };
  }

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedDocuments(serializeFile(file));
  };
  const deleteDocument = () =>{
    dispatch(
      startCampignDataActions.setData({
        field: "selectedDocuments",
        data: '',
      })
    );
    dispatch(
      startCampignDataActions.setData({
        field: "existingDocuments",
        data: '',
      })
    );
  }
  return (
    <>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>Upload Document</IonLabel>
        <IonInput
          type="file"
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
          onInput={handleDocumentChange}
        />
        {existingDocuments && (
          <IonItem>
            <IonLabel>
              {" "}
              <a target="_blank" href={existingDocuments}>
                Download document
              </a>
            </IonLabel>
            <IonButton onClick={deleteDocument}>
              <IonIcon icon={trash} />
            </IonButton>
          </IonItem>
        )}
      </div>
    </>
  );
}
