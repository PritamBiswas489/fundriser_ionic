import React from "react";
import "./Verification.css";
import { IonContent, IonPage, IonImg, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
import { CiMobile4 } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";

import { useIonRouter } from "@ionic/react";

interface ContainerProps {}

const Verification: React.FC<ContainerProps> = () => {
    // const router = useIonRouter();
    // function goToRegisterPage() {
    //     router.push("/Register", "forward", "push");
    // }
    return (
        <>
            <IonPage>
                <IonContent fullscreen={true}>
                    <div className="otpArea d-flex justify-content-center align-items-center">
                        <div className="otpInner">
                            <div className="otpIcon">
                                <IonImg src={("../assets/images/otp-img.png")} alt="" />
                            </div>
                            <div className="verificationText">
                                <h3>verification</h3>
                                <p>
                                    Enter OTP Code sent to your number<span>+91 1234567890</span>
                                </p>
                            </div>
                            <div className="otpInputArea">
                                <ul className="d-flex justify-content-between">
                                    <li>
                                        <IonInput class="otpInput" color="medium" placeholder="" type="number"></IonInput>
                                    </li>
                                    <li>
                                        <IonInput class="otpInput" color="medium" placeholder="" type="number"></IonInput>
                                    </li>
                                    <li>
                                        <IonInput class="otpInput" color="medium" placeholder="" type="number"></IonInput>
                                    </li>
                                    <li>
                                        <IonInput class="otpInput" color="medium" placeholder="" type="number"></IonInput>
                                    </li>
                                    <li>
                                        <IonInput class="otpInput" color="medium" placeholder="" type="number"></IonInput>
                                    </li>
                                    <li>
                                        <IonInput class="otpInput" color="medium" placeholder="" type="number"></IonInput>
                                    </li>
                                </ul>
                                <p>
                                    <Link to={"/"}>Resend OTP</Link>
                                </p>
                            </div>
                            <div className="inputArea mt-40">
                                <IonButton color="primary" expand="block">
                                    NEXT
                                </IonButton>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Verification;
