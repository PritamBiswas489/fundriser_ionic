import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  IonContent,
  IonPage,
  IonImg,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
import { BsLock } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { eye, eyeOff } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { useIonToast } from "@ionic/react";
import { useHttpClient } from "../hook/http-hook";
import { API_BASE_URL } from "../config";
import useLocalStorage from "../hook/useLocalStorage";
import { userDataActions } from "../store/redux/user-data-slice";
import { userAccountDataActions } from "../store/redux/user-account-data";
import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordPopup from "../components/ForgotPasswordPopup";

const Login = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const openForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(true);
  };
  const closeForgotPasswordPopup = () => {
    setIsForgotPasswordOpen(false);
  };


  const user_id = useSelector((state) => state["userData"].user_id);
  useEffect(()=>{
      if(parseInt(user_id) > 0){
        router.push("/landing", "forward", "refresh");
      }
  },[user_id])

  const [value, saveValueToLocalStorage, clearValueFromLocalStorage] =
    useLocalStorage("useLogin", {});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const {
    isLoading: loginLoading,
    error: loginError,
    sendRequest: loginProcessingFetch,
    clearError: clearLoginError,
  } = useHttpClient();

  const loginPorcessing = async () => {
    if(email.trim() ===''){
        presentToast('middle','Enter email address');
        return;
    }
    if (!isValidEmail(email)) {
        presentToast("middle", "Enter valid email address");
        return;
      }
    if(password ===''){
        presentToast('middle','Enter password');
        return;
    }
    const responseData = await loginProcessingFetch(
        `${API_BASE_URL}login`,
        'POST',
        JSON.stringify({email,password}),
        {
            "Content-Type": "application/json" 
        }
      );
      if(responseData.access_token){
          const r = {
              user_id : responseData.user.id,
              token : responseData.access_token
          };
         saveValueToLocalStorage(JSON.stringify(r));
         dispatch(userDataActions.setData({field:'user_id', data:responseData.user.id}));
         dispatch(userDataActions.setData({field:'token', data:responseData.access_token}));

         dispatch(
          userAccountDataActions.setData({
            field: "firstName",
            data: responseData?.profile?.first_name,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "lastName",
            data: responseData?.profile?.last_name,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "phoneNumber",
            data: '+'+responseData?.profile?.phone_code+responseData?.profile?.phone_number,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "country",
            data: responseData?.profile?.country_id_fk,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "address",
            data: responseData?.profile?.address,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "zip",
            data: responseData?.profile?.zip,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "user",
            data: responseData?.user,
          })
        );
        dispatch(
          userAccountDataActions.setData({ field: "isFetched", data: true })
        );

         router.push("/landing", "forward", "refresh");
      }
  };
  useEffect(()=>{
    if(loginError){
        clearLoginError();
        presentToast('middle','Login failed.');
    }
  },[loginError]);

   

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
              <h2>Log In</h2>
              <div className="inputArea">
                <span className="logIcon">
                  <BsEnvelope />
                </span>
                <IonInput
                  style={{ color: "black" }}
                  class="loginInput"
                  color="medium"
                  placeholder="Enter e-mail"
                  type="text"
                  onIonChange={(e) => setEmail(e.detail.value)}
                ></IonInput>
              </div>

              <div className="inputArea">
                <span className="logIcon">
                  <BsLock />
                </span>
                <IonInput
                  autocomplete="off"
                  style={{ color: "black" }}
                  class="loginInput"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value)}
                />

                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    color: "#60bc40",
                    bottom: 20,
                    zIndex: 9999999999,
                    cursor: "pointer",
                    fontSize: 21,
                  }}
                  onClick={togglePasswordVisibility}
                >
                  <IonIcon icon={showPassword ? eye : eyeOff} />
                </span>
                <Link to={"#"} onClick={openForgotPasswordPopup}>Forget password</Link>
              </div>
              

              <div className="inputArea">
                <IonButton
                  onClick={loginPorcessing}
                  color="primary"
                  expand="block"
                >
                {loginLoading ? 'Processing'  : 'Login'}  
                </IonButton>
              </div>
              <div className="or">Or</div>
              <div className="inputArea">
                <IonButton className="conFb" expand="block">
                  <span className="fbIcon">
                    <FaFacebookSquare />
                  </span>{" "}
                  Continue with facebook
                </IonButton>
              </div>
              <div className="anAccount">
                <p>
                  Don’t hav an Account? <Link to={"./Register"}>Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </IonContent>
        
      </IonPage>
      <ForgotPasswordPopup isOpen={isForgotPasswordOpen} onClose={closeForgotPasswordPopup} />
    </>
  );
};

export default Login;
