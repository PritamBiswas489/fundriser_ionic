import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from "./pages/Splash";
import Verification from "./pages/Verification";
import Landing from "./pages/Landing";
import Donate from "./pages/Donate";
import CategoryListing from "./pages/CategoryListing";
import Donation from "./pages/Donation";
import StripePayment from "./pages/StripePayment";

import AccountDashboard from "./pages/AccountDashboard";
import AccountYourDonation from "./pages/AccountYourDonation";
import AccountDonationList from "./pages/AccountDonationList";
import AccountPaymentList from "./pages/AccountPaymentList";
import AccountProfile from "./pages/AccountProfile";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
/* Custom css */
import "./assets/css/style.css";
import TestPayPalPayment from "./pages/TestPayPalPayment";
import PayPalPayment from "./pages/PayPalPayment";
import Menu from "./components/Menu";
import useLocalStorage from "./hook/useLocalStorage";
import { useState } from "react";
import { useHttpClient } from "./hook/http-hook";
import { API_BASE_URL } from "./config";
import { userDataActions } from "./store/redux/user-data-slice";
import { userAccountDataActions } from "./store/redux/user-account-data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import Logout from "./pages/Logout";
import AccountChangePassword from "./pages/AccountChangePassword";
import { settingDataActions } from "./store/redux/settings-data-slice";
import AccountRequestPayouts from "./pages/AccountRequestPayouts";
import AccountConnectBank from "./pages/AccountConnectBank";

<link
  href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
  rel="stylesheet"
/>;

setupIonicReact();

const App = () => {
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [userCheckFinished, setUserCheckFinished] = useState(false);
  const [settingCheckFinished, setSettingCheckFinished] = useState(false);
  const user_id = useSelector((state) => state["userData"].user_id);
  const settingData = useSelector(state=>state['settingData'].settings);  

  const [value, saveValueToLocalStorage, clearValueFromLocalStorage] =
    useLocalStorage("useLogin", {});
  const data = JSON.parse(value);

  const {
    isLoading: checkingLogin,
    error: checkingError,
    sendRequest: checkingFetch,
    clearError: checkingClearError,
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

  const checkinguser = async () => {
    if (data?.user_id) {
      dispatch(
        userDataActions.setData({ field: "user_id", data: data?.user_id })
      );
      dispatch(userDataActions.setData({ field: "token", data: data?.token }));
      //=========== verify user account =============================//
      const searchValue = { user_id: data?.user_id };
      const queryString = new URLSearchParams(searchValue).toString();
      const responseData = await checkingFetch(
        `${API_BASE_URL}checkingUser?${queryString}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json", // Adjust the content type if needed
          // Add any other headers you need
        }
      );
      if (responseData?.main?.id) {
        setUserCheckFinished(true);
        dispatch(
          userDataActions.setData({
            field: "user_id",
            data: responseData?.main?.id,
          })
        );
        dispatch(
          userDataActions.setData({ field: "token", data: data?.token })
        );
        updateState(responseData);
      } else if (
        typeof responseData !== "undefined" &&
        typeof responseData.success !== "undefined" &&
        responseData.success === false
      ) {
        clearValueFromLocalStorage();
        dispatch(userDataActions.setData({ field: "user_id", data: 0 }));
        dispatch(userDataActions.setData({ field: "token", data: "" }));
        dispatch(userAccountDataActions.resetState());
        setUserCheckFinished(true);
      }
    } else {
      setUserCheckFinished(true);
    }
  };
  const {
    isLoading: siteSettingsLoading,
    error: siteSettingsError,
    sendRequest: siteSettingsFetch,
    clearError: siteSettingsClearError,
  } = useHttpClient();

  const getSiteSettings = async () => {
    const responseData = await siteSettingsFetch(
      `${API_BASE_URL}get-site-settings`,
      "GET",
      null,
      {
        "Content-Type": "application/json", // Adjust the content type if needed
        // Add any other headers you need
      }
    );
    if (typeof responseData !== "undefined" && responseData?.STRIPE_PK) {
      dispatch(settingDataActions.setData({field:'settings',data:responseData}))
      setSettingCheckFinished(true);
    } else if (siteSettingsError) {
    }
  };

  useEffect(() => {
    if (userCheckFinished && settingCheckFinished) {
      setShowLoader(false);
    }
  }, [userCheckFinished, settingCheckFinished]);

  useEffect(() => {
    checkinguser();
    getSiteSettings();
  }, []);

  useEffect(() => {
    if (checkingError) {
      dispatch(userDataActions.setData({ field: "user_id", data: 0 }));
      dispatch(userDataActions.setData({ field: "token", data: "" }));
      dispatch(userAccountDataActions.resetState());
      checkingClearError();
    }
  }, [checkingError]);
  return (
    <IonApp color="light">
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/splash">
            <Splash />
          </Route>
          <Route exact path="/verification">
            <Verification />
          </Route>
          <Route exact path="/landing">
            <Landing />
          </Route>
          <Route exact path="/listing">
            <CategoryListing />
          </Route>
          <Route exact path="/donate/:id">
            <Donate />
          </Route>
          <Route exact path="/donation/:id">
            <Donation />
          </Route>
          <Route exact path="/payment-stripe/:id">
           {settingData?.STRIPE_PK && <StripePayment /> } 
          </Route>
          <Route exact path="/test-paypal">
            <TestPayPalPayment />
          </Route>
          <Route exact path="/paypal-payment/:id">
             {settingData?.PAYPAL_CLIENT_ID && <PayPalPayment /> } 
          </Route>
          <Route exact path="/account-dashboard">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountDashboard />
            )}
          </Route>
          <Route exact path="/account-your-donation">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountYourDonation />
            )}
          </Route>
          <Route exact path="/account-donation-list">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountDonationList />
            )}
          </Route>
          <Route exact path="/account-payment-list">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountPaymentList />
            )}
          </Route>
          <Route exact path="/account-profile">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountProfile />
            )}
          </Route>

          <Route exact path="/account-request-payout">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountRequestPayouts />
            )}
          </Route>

          <Route exact path="/account-connect-bank">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountConnectBank />
            )}
          </Route>


          <Route exact path="/change-password">
            {parseInt(user_id) === 0 ? (
              <Redirect to="/login" />
            ) : (
              <AccountChangePassword />
            )}
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <IonLoading isOpen={showLoader} message={"Processing..."} />
    </IonApp>
  );
};
export default App;
