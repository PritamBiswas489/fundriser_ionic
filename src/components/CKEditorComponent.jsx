import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { IonLabel } from "@ionic/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./CKEditorComponent.css";

const CKEditorComponent = ({ editorData, setEditorData }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <div style={{ marginTop: 5 }}>
      <IonLabel>Campaign Description <span style={{ color: "red" }}>*</span></IonLabel>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
        config={{
          height: "300px",
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
