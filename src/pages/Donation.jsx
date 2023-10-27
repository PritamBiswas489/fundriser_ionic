import React, { useState, useEffect } from "react";
import "./Donation.css";
import {
  IonContent,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonInput,
  IonItem,
  IonCheckbox,
} from "@ionic/react";

import { chevronBackOutline, personAdd, personCircle } from "ionicons/icons";
import Footer from "../components/Footer";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useParams } from "react-router";
import SkeletonLoader from "../components/SkeletonLoader";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL } from "../config";
import { useIonAlert } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { countryDataActions } from "../store/redux/country-data-slice";
import { stateDataActions } from "../store/redux/state-data-slice";
import { useIonToast } from "@ionic/react";
import { parsePhoneNumber } from "react-phone-number-input";
import useLocalStorage from "../hook/useLocalStorage";
import ChooseDonationAmtPanel from "../components/ChooseDonationAmtPanel";
import { donationAmtActions } from "../store/redux/donation-amt-slice";
import ChooseDonationOtherAmtModal from "../components/ChooseDonationOtherAmtModal";
import DonationGratuityPanel from "../components/DonationGratuityPanel";
import DonationGratuityOtherAmtModal from "../components/DonationGratuityOtherAmtModal";
import Menu from "../components/Menu";

const Donation = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const campaign_id = params["id"];
  const [value, saveValueToLocalStorage, clearValueFromLocalStorage] =
    useLocalStorage("donationFormData", {});

  let saveLocalData = {};
  if (value != "") {
    saveLocalData = JSON.parse(value);
  }
  //console.log(saveLocalData);
  const [details, setDetails] = useState({});

  const [personName, setPersonName] = useState(saveLocalData?.personName || "");
  const [personEmail, setPersonEmail] = useState(
    saveLocalData?.personEmail || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    saveLocalData?.countryCallingCode
      ? "+" + saveLocalData?.countryCallingCode + saveLocalData?.nationalNumber
      : ""
  );
  const [personAddr, setPersonAddr] = useState(saveLocalData?.personAddr || "");
  const [isAno, setIsAno] = useState(saveLocalData?.isAno || false);
  const [selectCountry, setSelectedCountry] = useState(
    saveLocalData?.selectCountry || 231
  );
  const [selectCountryCode, setSelectedCountryCode] = useState(
    saveLocalData?.selectCountryCode || "us"
  );
  const [selectRegion, setselectRegion] = useState(
    saveLocalData?.selectRegion || 0
  );
  const [zipCode, setZipCode] = useState(saveLocalData?.zipCode || "");

  const choosenDonationAmount = useSelector(
    (state) => state["donationAmt"].choosenDonationAmount
  );

  const otherChooseAmount = useSelector(
    (state) => state["donationAmt"].otherChooseAmount
  );
  const setChoosenDonationAmount = (amount) => {
    dispatch(donationAmtActions.setChoosenDonationAmount(amount));
  };
  const totalDonationAmount = useSelector(
    (state) => state["donationAmt"].totalDonationAmount
  );
  const setTotalDonationAmount = (amount) => {
    dispatch(donationAmtActions.setTotalDonationAmount(amount));
  };
 
  const setTipAmount = (amount) => {
    dispatch(donationAmtActions.setGratuityCalculatedAmount(amount));
  };

  const selectedGratuity = useSelector(
    (state) => state["donationAmt"].selectedGratuity
  );
  const selectedOtherGratuityOption = useSelector(
    (state) => state["donationAmt"].selectedOtherGratuityOption
  );
  const otherGratuityAmount = useSelector(
    (state) => state["donationAmt"].otherGratuityAmount
  );

  const gratuityCalculatedAmount = useSelector(
    (state) => state["donationAmt"].gratuityCalculatedAmount
  );

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
  const states = useSelector((state) => state["stateData"].regions);
  // console.log({states:states});
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

  const { sendRequest: fetchStates } = useHttpClient();

  useEffect(() => {
    const fetchStateProcess = async () => {
      const responseData = await fetchStates(
        `${API_BASE_URL}statelist?countryId=${selectCountry}`
      );
      if (responseData?.states) {
        //console.log(responseData?.states);
        const t = { ...states };
        t[selectCountry] = responseData.states;
        dispatch(stateDataActions.setRegions(t));
      }
    };
    if (!states?.[selectCountry]) {
      fetchStateProcess();
    }
  }, [selectCountry]);

  const {
    isLoading: fundRaiserLoading,
    error: fundRaiserError,
    sendRequest: fundRaiserFetch,
    clearError,
  } = useHttpClient();

  const generateCampaignDetails = async () => {
    const searchValue = { fundraiserid: campaign_id };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await fundRaiserFetch(
      `${API_BASE_URL}fundraisersdetails?${queryString}`
    );
    if (
      responseData?.fundraisersdetails &&
      responseData?.fundraisersdetails?.id
    ) {
      setDetails(responseData.fundraisersdetails);
    }
  };
  useEffect(() => {
    generateCampaignDetails();
  }, [campaign_id]);

  useEffect(() => {
    let initAmmount = 0;
    if (
      details?.campaign_amount &&
      details?.campaign_amount?.pledge_amount_one &&
      initAmmount === 0
    ) {
      initAmmount = details.campaign_amount.pledge_amount_one;
    }
    if (
      details?.campaign_amount &&
      details?.campaign_amount?.pledge_amount_two &&
      initAmmount === 0
    ) {
      initAmmount = details.campaign_amount.pledge_amount_two;
    }
    if (
      details?.campaign_amount &&
      details?.campaign_amount?.pledge_amount_three &&
      initAmmount === 0
    ) {
      initAmmount = details.campaign_amount.pledge_amount_three;
    }
    setChoosenDonationAmount(parseFloat(initAmmount));
    dispatch(donationAmtActions.setSelectedOtherAmount(false));
    dispatch(donationAmtActions.setOtherChooseAmount(0));
  }, [details]);

  useEffect(() => {
    let total = 0;
    let tipAmt = 0;
    const donationAmt = total + parseFloat(choosenDonationAmount) + parseFloat(otherChooseAmount);
    //== Calculating tips amount ====//
    if(selectedOtherGratuityOption === true){
        tipAmt = parseFloat(otherGratuityAmount);
    }else{
        tipAmt = ((parseFloat(selectedGratuity) * parseFloat(donationAmt))/100);
    }
    total= total + donationAmt+tipAmt;
    setTipAmount(tipAmt);
    setTotalDonationAmount(total);
  }, [selectedGratuity,selectedOtherGratuityOption,otherGratuityAmount,choosenDonationAmount,otherChooseAmount]);


 

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const processPayment = (gateway) => {
    if (personName.trim() === "" || personName.length < 3) {
      presentToast("middle", "Enter name minimum 3 digits");
      return;
    }
    if (personEmail.trim() === "") {
      presentToast("middle", "Enter valid email address");
      return;
    }
    if (!isValidEmail(personEmail)) {
      presentToast("middle", "Enter valid email address");
      return;
    }
    if (phoneNumber.trim() === "" || typeof phoneNumber ==='undefined') {
      presentToast("middle", "Enter valid phone number");
      return;
    }
    if (personAddr.trim() === "" || personAddr.length < 3) {
      presentToast("middle", "Enter address minimum 3 digits");
      return;
    }
    if (selectCountry === 0) {
      presentToast("middle", "Select Country");
      return;
    }
    if (states?.[selectCountry]) {
      if (selectRegion === 0) {
        presentToast("middle", "Select Region");
        return;
      }
    }
    if (zipCode.trim() === "") {
      presentToast("middle", "Enter zipcode");
      return;
    }

    const parse = parsePhoneNumber(phoneNumber);
    const { countryCallingCode, nationalNumber } = parse;
    clearValueFromLocalStorage();
    saveValueToLocalStorage(
      JSON.stringify({
        personName,
        personEmail,
        personAddr,
        selectCountry,
        selectCountryCode,
        selectRegion,
        zipCode,
        countryCallingCode,
        nationalNumber,
        isAno,
        total_payment:totalDonationAmount,
        tips:gratuityCalculatedAmount,
        payment:choosenDonationAmount
      })
    );
    if (gateway === "stripe") {
      router.push(`/payment-stripe/${campaign_id}`, "forward", "push");
    }
    if (gateway === "paypal") {
      router.push(`/paypal-payment/${campaign_id}`, "forward", "push");
    }
  };
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }
  return (
    <>
    
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                defaultHref={`/donate/${campaign_id}`}
              />
            </IonButtons>
            <IonTitle className="backTitle">Make Donation</IonTitle>
            <IonButtons slot="end">
            <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          {fundRaiserLoading && <SkeletonLoader />}
          {details?.id && (
            <div className="catagorieListing">
              <div className="donationTop">
                <h3>Choose Donation Amount</h3>
                <p>Most Donors donate approx. ${details?.campaign_amount?.recomnd_amount} to this Fundraiser</p>
              </div>

              <ChooseDonationAmtPanel details={details} />

              <div className="gratuitySelect">
                <h4>{details?.title}</h4>
                <DonationGratuityPanel/>
              </div>
              <div className="catInput">
                <div className="inputArea">
                  <IonLabel>Name</IonLabel>
                  <IonInput
                    class="commentInput"
                    value={personName}
                    onIonInput={(e) => setPersonName(e.detail.value)}
                    color="medium"
                    placeholder="Enter Name"
                    type="text"
                  ></IonInput>
                </div>
                <div className="inputArea">
                  <IonLabel>E-mail Address</IonLabel>
                  <IonInput
                    class="commentInput"
                    value={personEmail}
                    onIonInput={(e) => setPersonEmail(e.detail.value)}
                    color="medium"
                    placeholder="email@email.com"
                    type="text"
                  ></IonInput>
                </div>
                <div className="inputArea">
                  <IonLabel>Phone Number</IonLabel>
                  <PhoneInput
                    defaultCountry="US"
                    style={{ height: 60, backgroundColor:'#fff' }}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </div>
                <div className="inputArea">
                  <IonLabel>Address</IonLabel>
                  <div className="">
                    <IonInput
                      class="commentInput"
                      value={personAddr}
                      onIonInput={(e) => setPersonAddr(e.detail.value)}
                      color="medium"
                      placeholder="Address line 1"
                      type="text"
                    ></IonInput>
                  </div>
                </div>
                {countries.length > 0 && (
                  <div className="inputArea">
                    <IonLabel>Country</IonLabel>
                    <IonSelect
                      onIonChange={(e) => {
                        setSelectedCountryCode(
                          e.target
                            .querySelector(
                              `ion-select-option[value="${e.detail.value}"]`
                            )
                            .getAttribute("iso")
                        );
                        setSelectedCountry(e.detail.value);
                      }}
                      value={selectCountry}
                      placeholder="Select Country"
                      className="selectOption"
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
                {states?.[selectCountry] && (
                  <div className="inputArea">
                    <IonLabel>Region</IonLabel>
                    <IonSelect
                      onIonChange={(e) => setselectRegion(e.detail.value)}
                      value={selectRegion}
                      placeholder="Select Regions"
                      className="selectOption"
                    >
                      {states[selectCountry].map((stateDet, stateIndex) => {
                        return (
                          <IonSelectOption key={stateIndex} value={stateDet.id}>
                            {stateDet.name}
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </div>
                )}

                <div className="inputArea">
                  <IonLabel>Zipcode</IonLabel>
                  <IonInput
                    class="commentInput"
                    value={zipCode}
                    onIonInput={(e) => setZipCode(e.detail.value)}
                    color="medium"
                    placeholder="zipcode"
                    type="text"
                  ></IonInput>
                </div>
                <div className="inputArea">
                  <IonItem>
                    <IonCheckbox
                      checked={isAno}
                      onIonChange={() => setIsAno((prev) => !prev)}
                      slot="start"
                    ></IonCheckbox>
                    <IonLabel> Donate as Anonymous?</IonLabel>
                  </IonItem>
                </div>
                <div className="inputArea">
                  <IonButton
                    disabled={parseFloat(totalDonationAmount) === 0}
                    onClick={() => processPayment("stripe")}
                    className="payWithCard"
                    expand="block"
                  >
                    pay with credit card / debit card{" "}
                    {totalDonationAmount > 0 && ` $${totalDonationAmount}`}
                  </IonButton>
                </div>
                <div className="inputArea">
                  <IonButton
                    disabled={parseFloat(totalDonationAmount) === 0}
                    onClick={() => processPayment("paypal")}
                    className="payWithPapal"
                    expand="block"
                  >
                    pay with PayPal{" "}
                    {totalDonationAmount > 0 && ` $${totalDonationAmount}`}
                  </IonButton>
                </div>
              </div>
            </div>
          )}
          <ChooseDonationOtherAmtModal/>
          <DonationGratuityOtherAmtModal/>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default Donation;
