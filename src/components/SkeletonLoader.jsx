import React,{useEffect} from "react";

import {
  IonList,
  IonSkeletonText,
} from "@ionic/react";


export default function SkeletonLoader() {
  return (
    <IonList>
            <>
                <IonSkeletonText animated style={{ width: '80%', marginBottom: '8px' }} />
                <IonSkeletonText animated style={{ width: '60%', marginBottom: '8px' }} />
                <IonSkeletonText animated style={{ width: '70%', marginBottom: '8px' }} />
                {/* Add more IonSkeletonText components as needed */}
            </>
        </IonList>
  )
}
 