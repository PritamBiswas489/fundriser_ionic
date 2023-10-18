import React from "react";
import { IonLabel, IonRadioGroup, IonRadio } from "@ionic/react";
import { startCampignDataActions } from "../../store/redux/start-campaign-data-slice";
import { useDispatch, useSelector } from "react-redux";
import CompanyDetails from "./CompanyDetails";

export default function FundriseType({countries}) {
  const dispatch = useDispatch();
  const fundriseAs = useSelector(
    (state) => state["startCampignData"].fundriseAs
  );
  const setfundriseAs = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "fundriseAs", data: value })
    );

  const handleRadioChange = (e) => {
    setfundriseAs(e.detail.value);
  };
   
  return (
    <>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonRadioGroup value={fundriseAs} onIonChange={handleRadioChange}>
          <IonLabel>Fundraise as:</IonLabel>
          <br />
          <IonRadio value="1" />
          <IonLabel>
            An Individual I am the sole organizer. <strong>Note:</strong> Team
            fundraising can be turned on later{" "}
          </IonLabel>
          <br />
          <IonRadio value="2" />
          <IonLabel>
            An Individual I am the sole organizer. <strong>Note:</strong> Team
            fundraising can be turned on later{" "}
          </IonLabel>
        </IonRadioGroup>
      </div>
      {parseInt(fundriseAs) === 2 && <CompanyDetails countries={countries} />}
    </>
  );
}
