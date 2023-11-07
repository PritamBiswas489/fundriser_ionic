import React from "react";
import {
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { eye, eyeOff } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { useIonToast } from "@ionic/react";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { countryDataActions } from "../store/redux/country-data-slice";
import { parsePhoneNumber } from "react-phone-number-input";
import useContentModal from "../hook/useContentModal";
import { IonRouterLink } from "@ionic/react";

const Register = () => {
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {openModal:TcOpenModal, closeModal:TcCloseModal, ContentModal:TcContentModal} = useContentModal();
  const {openModal:PvOpenModal, closeModal:PvCloseModal, ContentModal:PvContentModal} = useContentModal();

  const settingData = useSelector(state=>state['settingData'].settings);  


  const [formInputData, setFormInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: 231,
    phoneNumber: "",
    address: "",
    zip: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.detail.checked);
  };
  const setData = (data) => {
    setFormInputData((prev) => {
      return { ...prev, ...data };
    });
  };
  const user_id = useSelector((state) => state["userData"].user_id);
  useEffect(() => {
    if (parseInt(user_id) > 0) {
      router.push("/landing", "forward", "refresh");
    }
  }, [user_id]);
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
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
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

  const signupProcess = async () => {
    if (formInputData.firstName.trim() === "") {
      presentToast("middle", "First name required");
      return;
    }
    if (formInputData.lastName.trim() === "") {
      presentToast("middle", "Last name required");
      return;
    }
    if (formInputData.email.trim() === "") {
      presentToast("middle", "Email required");
      return;
    }
    if (!isValidEmail(formInputData.email)) {
      presentToast("middle", "Enter valid email address");
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
      presentToast("middle", "Address required");
      return;
    }
    if (formInputData.password === "") {
      presentToast("middle", "Enter new password");
      return;
    }
    if (formInputData.password.length < 6) {
      presentToast("middle", "New password length equal or greater than 6");
      return;
    }
    if (isChecked === false) {
      presentToast("middle", "Checked terms and conditions");
      return;
    }

    const parse = parsePhoneNumber(formInputData.phoneNumber);
    const { countryCallingCode, nationalNumber } = parse;
    formInputData.countryCallingCode = countryCallingCode;
    formInputData.nationalNumber = nationalNumber;
    const formData = objectToFormData(formInputData);
    //console.log(formData);
    const responseData = await accountDataFetch(
      `${API_BASE_URL}register`,
      "POST",
      formData
    );

    if (typeof responseData !== "undefined" && responseData?.success) {
      presentToast("middle", responseData.message);
      setFormInputData({
        firstName: "",
        lastName: "",
        email: "",
        country: 231,
        phoneNumber: "",
        address: "",
      });
      setIsChecked(false);
      router.push("/login", "forward", "push");
    } else if (accountDataSaveError) {
      if (responseData?.message) {
        presentToast("middle", responseData.message);
      } else {
        presentToast("middle", "Register update failed.");
      }
    }
  };
  return (
    <>
      <IonPage>
        <IonContent fullscreen={true}>
          <div className="loginArea">
            <div className="loginLogo">
              <span>
                <IonImg src={"../assets/images/logo.png"} alt="" />
              </span>
            </div>
            <div className="loginInner">
              <h2>Sign Up</h2>
              <div className="inputArea">
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
              <div className="inputArea">
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
                <IonLabel>
                  Email <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput
                  value={formInputData?.email}
                  onIonInput={(e) => {
                    setData({ email: e.detail.value });
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

              <div className="inputArea">
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

              <div className="inputArea" style={{ marginTop: 5 }}>
                <IonLabel>
                  Password <span style={{ color: "red" }}>*</span>
                </IonLabel>
                <IonInput
                  type={showPassword ? "text" : "password"}
                  value={formInputData?.password}
                  onIonInput={(e) => {
                    setData({ password: e.detail.value });
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    color: "#60bc40",
                    bottom: 4,
                    zIndex: 9999999999,
                    cursor: "pointer",
                    fontSize: 21,
                  }}
                  onClick={togglePasswordVisibility}
                >
                  <IonIcon icon={showPassword ? eye : eyeOff} />
                </span>
              </div>

              <div className="inputArea">
                <IonItem>
                  <IonCheckbox
                    checked={isChecked}
                    onIonChange={handleCheckboxChange}
                    slot="start"
                  ></IonCheckbox>
                  <IonLabel>
                    I read and agree to <Link to={"#"} onClick={TcOpenModal}>Term & Conditions</Link>{" "}
                    <br />
                    and <Link to={"#"} onClick={PvOpenModal}>Privacy Policy</Link>
                  </IonLabel>
                </IonItem>
              </div>
              <div className="inputArea">
                <IonButton
                  disabled={accountDataSaveLoading}
                  onClick={signupProcess}
                  color="primary"
                  expand="block"
                >
                  {accountDataSaveLoading ? "Processing..." : "Sign Up"}
                </IonButton>
              </div>
            </div>
            <div className="anAccount">
              <p>
                Alleady hav an Account? <IonRouterLink routerLink="/login">
                  Login
                </IonRouterLink>
              </p>
            </div>
            <div className="anAccount" style={{marginTop:20}}>
                <IonRouterLink routerLink="/landing">
                  Go to Home
                </IonRouterLink>
              </div>
          </div>
        </IonContent>
      </IonPage>
      <TcContentModal content={settingData?.termsandconditions?.content} title={settingData?.termsandconditions?.title}></TcContentModal>
      <PvContentModal content={settingData?.privacypolicy?.content} title={settingData?.privacypolicy?.title}></PvContentModal>
    </>
  );
};

export default Register;
