import React, { useState } from "react";
import "../components/Comments/Comments.css";
import {
  IonModal,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import { useIonToast } from "@ionic/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import useLocalStorage from "../hook/useLocalStorage";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL } from "../config";

const AddComment = ({ campaign_id, showModal, closeAddCommentPopup }) => {
  const [present] = useIonToast();
  const [value, saveValueToLocalStorage, clearValueFromLocalStorage] =
    useLocalStorage("commentData", {});

  let saveLocalData = {};
  if (value != "") {
    saveLocalData = JSON.parse(value);
  }

  const [name, setName] = useState(saveLocalData?.name || "");
  const [email, setEmail] = useState(saveLocalData?.email || "");
  const [phone, setPhone] = useState(saveLocalData?.phone || "");
  const [comment, setComment] = useState("");
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
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  const {
    isLoading: addCommentLoading,
    error: addCommentError,
    sendRequest: addCommentFetch,
    addCommentClearError,
  } = useHttpClient();

  const addCommentHandler = async () => {
    if (name.trim() === "" || name.length < 3) {
      presentToast("middle", "Enter name minimum 3 digits");
      return;
    }
    if (email.trim() === "") {
      presentToast("middle", "Enter valid email address");
      return;
    }
    if (!isValidEmail(email)) {
      presentToast("middle", "Enter valid email address");
      return;
    }
    if (phone.trim() === "") {
      presentToast("middle", "Enter valid phone number");
      return;
    }
    if (comment.trim() === "" || comment.length < 3) {
      presentToast("middle", "Enter comment 3 digits");
      return;
    }
    clearValueFromLocalStorage();
    saveValueToLocalStorage(
      JSON.stringify({
        name,
        email,
        phone,
      })
    );
    const postData = {
      campaign_id_fk: campaign_id,
      name,
      email,
      phone,
      comments: comment,
    };
    console.log({ postData });
    const addData = await addCommentFetch(
      `${API_BASE_URL}add-comment`,
      "POST",
      JSON.stringify(postData),
      {
        "Content-Type": "application/json",
      }
    );
    if(addData.success){
        presentToast("middle", "Comment successfully sent.");
        setComment("");
        closeAddCommentPopup();
    }
    
  };

  return (
    <div>
      <IonModal isOpen={showModal}>
        <div className="ion-padding">
          <h2>Add Comment</h2>
          <div className="comments">
            <div className="inputArea">
              <IonLabel>Name</IonLabel>
              <IonInput
                class="commentInput"
                value={name}
                onIonInput={(e) => setName(e.detail.value)}
                color="medium"
                placeholder="Enter Name"
                type="text"
              ></IonInput>
            </div>
            <div className="inputArea">
              <IonLabel>E-mail Address</IonLabel>
              <IonInput
                class="commentInput"
                color="medium"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value)}
                placeholder="email@email.com"
                type="text"
              ></IonInput>
            </div>
            <div className="inputArea">
              <IonLabel>Phone Number</IonLabel>
              <PhoneInput
                defaultCountry="US"
                style={{ height: 60, backgroundColor: "#fff" }}
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <div className="inputArea">
              <IonLabel>Leave Comment</IonLabel>
              <IonTextarea
                aria-label="Custom textarea"
                placeholder="Type your Comment"
                class="custom"
                onIonInput={(e) => setComment(e.detail.value)}
                value={comment}
                maxlength={130}
              ></IonTextarea>
            </div>

            <IonButton
              color="primary"
              expand="block"
              size="small"
              onClick={addCommentHandler}
              disabled={addCommentLoading}
            >
            {addCommentLoading ? 'Processing...' : 'Add Comment(s)'}  
            </IonButton>

            <IonButton
              onClick={closeAddCommentPopup}
              color="primary"
              expand="block"
              size="small"
            >
              Close
            </IonButton>
          </div>
        </div>
      </IonModal>
    </div>
  );
};

export default AddComment;
