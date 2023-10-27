import React from "react";
import { useEffect } from "react";
import {
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
  } from "@ionic/react";

  import { startCampignDataActions } from '../../store/redux/start-campaign-data-slice';
  import { useDispatch, useSelector } from "react-redux";

export default function CompanyDetails({countries}) {
  const dispatch = useDispatch();
  const ShowDefaultData = useSelector(state=>state['startCampignData'].ShowDefaultData);  
  const companyName = useSelector(
    (state) => state["startCampignData"].companyName
  );
  const setcompanyName = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "companyName", data: value })
    );

  const companyMailingAddress = useSelector(
    (state) => state["startCampignData"].companyMailingAddress
  );
  const setCompanyMailingAddress = (value) =>
    dispatch(
      startCampignDataActions.setData({
        field: "companyMailingAddress",
        data: value,
      })
    );

  const companyCity = useSelector(
    (state) => state["startCampignData"].companyCity
  );
  const setCompanyCity = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "companyCity", data: value })
    );

  const companyZip = useSelector(
    (state) => state["startCampignData"].companyZip
  );
  const setCompanyZip = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "companyZip", data: value })
    );

  const companyCountry = useSelector(
    (state) => state["startCampignData"].companyCountry
  );
  const setCompanyCountry = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "companyCountry", data: value })
    );

  const companyContactNumber = useSelector(
    (state) => state["startCampignData"].companyContactNumber
  );
  const setCompanyContactNumber = (value) =>
    dispatch(
      startCampignDataActions.setData({
        field: "companyContactNumber",
        data: value,
      })
    );

  const companyEmailAddress = useSelector(
    (state) => state["startCampignData"].companyEmailAddress
  );
  const setCompanyEmailAddress = (value) =>
    dispatch(
      startCampignDataActions.setData({
        field: "companyEmailAddress",
        data: value,
      })
    );

  const companyWebsite = useSelector(
    (state) => state["startCampignData"].companyWebsite
  );
  const setCompanyWebsite = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "companyWebsite", data: value })
    );


    useEffect(()=>{
        if(ShowDefaultData === true){
            setcompanyName("demo company name");
            setCompanyMailingAddress("demo address");
            setCompanyCity( "demo city" );
            setCompanyZip("60629");
            setCompanyContactNumber('123456789');
            setCompanyEmailAddress("a@gmail.com");
            setCompanyWebsite("https://google.com")
        }
        setCompanyCountry(231);

    
      },[]);

  return (
    <>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Company name <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput
          value={companyName}
          onIonInput={(e) => setcompanyName(e.detail.value)}
        />
      </div>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Company mailing address <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput
          value={companyMailingAddress}
          onIonInput={(e) => setCompanyMailingAddress(e.detail.value)}
        />
      </div>

      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Company City <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput
          value={companyCity}
          onIonInput={(e) => setCompanyCity(e.detail.value)}
        />
      </div>

      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Company Zip <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput
          value={companyZip}
          onIonInput={(e) => setCompanyZip(e.detail.value)}
        />
      </div>
      {countries.length > 0 && (
        <div className="inputArea" style={{ marginTop: 5 }}>
          <IonLabel>
            Company Country <span style={{ color: "red" }}>*</span>
          </IonLabel>
          <IonSelect
            interface="action-sheet"
            cancelText="Cancel Choice"
            value={parseInt(companyCountry) !== 0 ? companyCountry : 231}
            className="selectOption"
            onIonChange={(e) => setCompanyCountry(e.detail.value)}
          >
            {countries.map((countryDet, countryIndex) => {
              return (
                <IonSelectOption
                  iso={countryDet.iso}
                  key={countryIndex}
                  value={countryDet.id}
                >
                  {countryDet.name}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </div>
      )}
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Company Contact number <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput
          value={companyContactNumber}
          onIonInput={(e) => setCompanyContactNumber(e.detail.value)}
        />
      </div>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Company Email Address <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput
          value={companyEmailAddress}
          onIonInput={(e) => setCompanyEmailAddress(e.detail.value)}
        />
      </div>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>Company Website</IonLabel>
        <IonInput
          value={companyWebsite || ''}
          onIonInput={(e) => setCompanyWebsite(e.detail.value)}
        />
      </div>
    </>
  );
}
