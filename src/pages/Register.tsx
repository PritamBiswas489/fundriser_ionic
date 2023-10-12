import React from "react";
import { IonContent, IonPage, IonImg, IonItem, IonLabel, IonInput, IonButton, IonCheckbox } from "@ionic/react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { CiMobile4 } from "react-icons/ci";
import { BsEnvelope } from "react-icons/bs";

import { useIonRouter } from "@ionic/react";

interface ContainerProps {}

const Register: React.FC<ContainerProps> = () => {
    const router = useIonRouter();
    function goToRegisterPage() {
        router.push("/Login", "forward", "push");
    }
    return (
        <>
            <IonPage>
                <IonContent fullscreen={true}>
                    <div className="loginArea">
                        <div className="loginLogo">
                            <span>
                                <IonImg src={("../assets/images/logo.png")} alt="" />
                            </span>
                        </div>
                        <div className="loginInner">
                            <h2>Sign Up</h2>
                            <div className="inputArea">
                                <span className="logIcon">
                                    <HiOutlineUser />
                                </span>
                                <IonInput class="loginInput" color="medium" placeholder="Enter Name"></IonInput>
                            </div>
                            <div className="inputArea">
                                <span className="logIcon">
                                    <BsEnvelope />
                                </span>
                                <IonInput class="loginInput" color="medium" placeholder="Enter e-mail*"></IonInput>
                            </div>
                            <div className="inputArea mb-10">
                                <span className="logIcon">
                                    <CiMobile4 />
                                </span>
                                <IonInput class="loginInput" color="medium" placeholder="Enter Phone number" type="number"></IonInput>
                            </div>
                            <div className="inputArea">
                                <IonItem>
                                    <IonCheckbox slot="start"></IonCheckbox>
                                    <IonLabel>
                                        I read and agree to <Link to={"/"}>Term & Conditions</Link> <br />
                                        and <Link to={"/"}>Privacy Policy</Link>
                                    </IonLabel>
                                </IonItem>
                            </div>
                            <div className="inputArea">
                                <IonButton color="primary" expand="block">
                                    Sign Up
                                </IonButton>
                            </div>

                            {/* <div className="inputArea">
                                <IonButton color="primary" expand="block">
                                    Get OTP
                                </IonButton>
                            </div> */}
                        </div>
                        <div className="anAccount">
                            <p>
                                Alleady hav an Account? <Link to={"./Login"}>Log In</Link>
                            </p>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Register;
