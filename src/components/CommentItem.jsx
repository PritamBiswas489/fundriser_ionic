// src/components/Comment.tsx
import React from 'react';
import './CommentItem.css';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
const CommentItem = (props) => {
  if(props?.noItem === 1){
   return(<IonCard>
    <IonCardContent>No comment founds</IonCardContent>
  </IonCard>);
  }  else{
    return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{props?.name}</IonCardTitle>
            <IonCardSubtitle>{props?.date}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{props?.text}</IonCardContent>
        </IonCard>
      );

  }
 
};

export default CommentItem;
