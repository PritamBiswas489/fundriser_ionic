import React, { useState, useEffect, useRef } from "react";
import "./AccountProfile.css";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonLoading,
  IonImg,
} from "@ionic/react";
import { chevronBackOutline, personCircle } from "ionicons/icons";
import Footer from "../components/Footer";
import { parsePhoneNumber } from "react-phone-number-input";
import { useSelector, useDispatch } from "react-redux";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";
import { useHttpClient } from "../hook/http-hook";
import SkeletonLoader from "../components/SkeletonLoader";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { userAccountDataActions } from "../store/redux/user-account-data";
import { countryDataActions } from "../store/redux/country-data-slice";
import { useIonToast } from "@ionic/react";
 

const AccountProfile = () => {
  const dispatch = useDispatch();
  const imageUploadRef = useRef();
  const [showProfilePicUploadLoader, setShowProfilePicUploadLoader] =
    useState(false);
  const [present] = useIonToast();
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
  const user_id = useSelector((state) => state["userData"].user_id);

  const isFetched = useSelector((state) => state["userAccountData"].isFetched);
  const firstName = useSelector((state) => state["userAccountData"].firstName);
  const lastName = useSelector((state) => state["userAccountData"].lastName);
  const phoneNumber = useSelector(
    (state) => state["userAccountData"].phoneNumber
  );
  const country = useSelector((state) => state["userAccountData"].country);
  const address = useSelector((state) => state["userAccountData"].address);
  const zip = useSelector((state) => state["userAccountData"].zip);

  const userData = useSelector((state) => state["userAccountData"].user);

  

  const [formInputData, setFormInputData] = useState({});
  const [profileImagePath, setProfileImagePath] = useState( 
    "../assets/images/profilePicUpload.png"
  );

  useEffect(()=>{
    if(userData?.profile_picture){
      setProfileImagePath(userData?.profile_picture);
    }

  },[userData]);

  const {
    isLoading: dataLoading,
    error: dataError,
    sendRequest: dataFetch,
    clearError,
  } = useHttpClient();

  const updateState = (d) => {
    const data = d?.user;
    const main = d?.main;

    dispatch(
      userAccountDataActions.setData({
        field: "firstName",
        data: data?.first_name,
      })
    );
    dispatch(
      userAccountDataActions.setData({
        field: "lastName",
        data: data?.last_name,
      })
    );
    dispatch(
      userAccountDataActions.setData({
        field: "phoneNumber",
        data: "+" + data?.phone_code + data?.phone_number,
      })
    );
    dispatch(
      userAccountDataActions.setData({
        field: "country",
        data: data?.country_id_fk,
      })
    );
    dispatch(
      userAccountDataActions.setData({
        field: "address",
        data: data?.address,
      })
    );
    dispatch(
      userAccountDataActions.setData({
        field: "zip",
        data: data?.zip,
      })
    );

    dispatch(
      userAccountDataActions.setData({
        field: "user",
        data: main,
      })
    );

    dispatch(
      userAccountDataActions.setData({ field: "isFetched", data: true })
    );
  };

  const getData = async () => {
    const searchValue = { user_id };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await dataFetch(
      `${API_BASE_URL}myprofile?${queryString}`
    );
    if (responseData?.user) {
      updateState(responseData);
    }
  };

  useEffect(() => {
    if (isFetched === false) {
      getData();
    }
  }, [isFetched]);

  useEffect(() => {
    setFormInputData({
      user_id,
      firstName,
      lastName,
      phoneNumber,
      country,
      address,
      zip,
    });
  }, [firstName, lastName, phoneNumber, country, address, zip]);
  //console.log({formInputData});

  const countries = useSelector((state) => state["countryData"].countries);
  const { sendRequest: fetchCountry } = useHttpClient();
  useEffect(() => {
    const fetchCountryProcess = async () => {
      const responseData = await fetchCountry(`${API_BASE_URL}countrylist`);
      if (responseData?.country) {
        dispatch(countryDataActions.setCountries(responseData.country));
      }
    };
    if (countries.length === 0) {
      fetchCountryProcess();
    }
  }, [countries]);

  const setPhoneNumber = (data) => {
    setData({ phoneNumber: data });
  };

  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  function objectToFormData(obj) {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }

  const {
    isLoading: accountDataSaveLoading,
    error: accountDataSaveError,
    sendRequest: accountDataFetch,
    clearError: accountDataError,
  } = useHttpClient();

  const processSaveProfileData = async () => {
    if (formInputData.firstName.trim() === "") {
      presentToast("middle", "First name required");
      return;
    }
    if (formInputData.lastName.trim() === "") {
      presentToast("middle", "Last name required");
      return;
    }

    if (
      formInputData.phoneNumber === "" ||
      typeof formInputData.phoneNumber === "undefined"
    ) {
      presentToast("middle", "Phone number required");
      return;
    }
    if (formInputData.address.trim() === "") {
      presentToast("middle", "Address required");
      return;
    }
    if (formInputData.zip.trim() === "") {
      presentToast("middle", "Zip required");
      return;
    }

    const parse = parsePhoneNumber(formInputData.phoneNumber);
    const { countryCallingCode, nationalNumber } = parse;
    formInputData.countryCallingCode = countryCallingCode;
    formInputData.nationalNumber = nationalNumber;
    const formData = objectToFormData(formInputData);
    const responseData = await accountDataFetch(
      `${API_BASE_URL}saveProfileData`,
      "POST",
      formData
    );

    if (typeof responseData !== "undefined" && responseData.success) {
      accountDataError();
      if (responseData.profile) {
        //console.log(responseData.profile);
        updateState(responseData);
      }
      presentToast("middle", "Profile update successfully done.");
    } else if (accountDataSaveError) {
      accountDataError();
      presentToast("middle", "Profile update failed.");
    }
  };
  const setData = (data) => {
    setFormInputData((prev) => {
      return { ...prev, ...data };
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileImagePath(URL.createObjectURL(file));
      setShowProfilePicUploadLoader(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("user_id", user_id);
      fetch(`${API_BASE_URL}uploadProfilePic`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if(data?.message){
            presentToast("middle", data?.message);
          }
          setShowProfilePicUploadLoader(false);
          
        })
        .catch((error) => {
             presentToast("middle", "Profile image upload failed");
             setShowProfilePicUploadLoader(false);
        });
    }else{
      presentToast("middle", "Profile image upload failed");
    }
  };
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} defaultHref="/" />
            </IonButtons>
            <IonTitle className="backTitle">Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {dataLoading && <SkeletonLoader />}
          {!dataLoading && (
            <div className="ion-padding">
              <div className="inputArea" style={{ marginTop: 5 }}>
                <img
                  id="image"
                  src={profileImagePath}
                  style={{
                    borderRadius: "50%",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    width: 150,
                    height: 150,
                  }}
                  onClick={() => {
                    if (imageUploadRef.current) {
                      imageUploadRef.current.click();
                    }
                  }}
                />
                
                <input
                  type="file"
                  accept="image/*"
                  ref={imageUploadRef}
                  id="myfile"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  First Name <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput
                  value={formInputData?.firstName}
                  onIonInput={(e) => {
                    setData({ firstName: e.detail.value });
                  }}
                />
              </div>
              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Last Name <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput
                  value={formInputData?.lastName}
                  onIonInput={(e) => {
                    setData({ lastName: e.detail.value });
                  }}
                />
              </div>
              <div className="inputArea">
                <IonLabel>Phone Number</IonLabel>
                <PhoneInput
                  defaultCountry="US"
                  style={{ height: 60, backgroundColor: "#fff" }}
                  placeholder="Enter phone number"
                  value={formInputData?.phoneNumber}
                  onChange={setPhoneNumber}
                />
              </div>
              {countries.length > 0 && (
                <div className="inputArea" style={{ marginTop: 5 }}>
                  <IonLabel>
                    Select Country <span style={{ color: "red" }}>*</span>
                  </IonLabel>
                  <IonSelect
                    interface="action-sheet"
                    cancelText="Cancel Choice"
                    value={formInputData?.country}
                    className="selectOption"
                    onIonChange={(e) => {
                      setData({ country: e.detail.value });
                    }}
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
                  Address <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonTextarea
                  value={formInputData?.address}
                  onIonInput={(e) => {
                    setData({ address: e.detail.value });
                  }}
                />
              </div>

              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Zip <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput
                  value={formInputData?.zip}
                  onIonInput={(e) => {
                    setData({ zip: e.detail.value });
                  }}
                />
              </div>

              <div
                className="inputArea"
                style={{ marginTop: 5, marginBottom: 40 }}
              >
                <IonButton
                  expand="full"
                  disabled={accountDataSaveLoading}
                  onClick={processSaveProfileData}
                >
                  {accountDataSaveLoading ? "Processing..." : "Save"}
                </IonButton>
              </div>
            </div>
          )}
          <IonLoading
            isOpen={showProfilePicUploadLoader}
            message={"Processing..."}
          />
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default AccountProfile;
