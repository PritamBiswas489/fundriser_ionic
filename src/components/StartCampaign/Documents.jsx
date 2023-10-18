import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    
    IonInput,
    IonLabel,
    
  } from "@ionic/react";

  import { startCampignDataActions } from "../../store/redux/start-campaign-data-slice";

export default function Documents() {
    const dispatch = useDispatch();
    
    const setSelectedDocuments = (value) => dispatch(startCampignDataActions.setData({field:'selectedDocuments',data:value}))
    

    function serializeFile(file) {
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        url : URL.createObjectURL(file)
      };
    }

    const handleDocumentChange = (e)=>{
        const file = e.target.files?.[0] || null;
        setSelectedDocuments(serializeFile(file));
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
      </div>
    </>
  );
}
