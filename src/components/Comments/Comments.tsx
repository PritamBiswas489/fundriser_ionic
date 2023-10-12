import React from "react";
import "./Comments.css";
import { IonInput, IonLabel, IonTextarea } from "@ionic/react";

const Comments = () => {
    return (
        <>
            <div className="comments">
                <div className="inputArea">
                    <IonLabel>Name</IonLabel>
                    <IonInput class="commentInput" color="medium" placeholder="Enter Name" type="text"></IonInput>
                </div>
                <div className="inputArea">
                    <IonLabel>E-mail Address</IonLabel>
                    <IonInput class="commentInput" color="medium" placeholder="email@email.com" type="text"></IonInput>
                </div>
                <div className="inputArea">
                    <IonLabel>Phone Number</IonLabel>
                    <IonInput class="commentInput" color="medium" placeholder="+91 1234567890" type="number"></IonInput>
                </div>
                <div className="inputArea">
                    <IonLabel>Leave Comment</IonLabel>
                    <IonTextarea aria-label="Custom textarea" placeholder="Type your Comment" class="custom" maxlength={130}></IonTextarea>
                </div>
            </div>
        </>
    );
};

export default Comments;
