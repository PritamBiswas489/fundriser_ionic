import React from "react";
import "./Login.css";
import { IonContent, IonPage, IonImg, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
import { CiMobile4 } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";

import { useIonRouter } from "@ionic/react";

interface ContainerProps {}

const Login: React.FC<ContainerProps> = () => {
    const router = useIonRouter();
    function goToRegisterPage() {
        router.push("/Register", "forward", "push");
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
                            <h2>Log In</h2>
                            <div className="inputArea">
                                <span className="logIcon">
                                    <BsEnvelope />
                                </span>
                                <IonInput class="loginInput" color="medium" placeholder="Enter e-mail" type="text"></IonInput>
                            </div>
                            <div className="inputArea">
                                <span className="logIcon">
                                    <CiMobile4 />
                                </span>
                                <IonInput class="loginInput" color="medium" placeholder="Enter Mobile number" type="text"></IonInput>
                                {/* <Link to={'/'} className='forgetPassword'>Forget Password?</Link> */}
                            </div>

                            <div className="inputArea">
                                <IonButton color="primary" expand="block">
                                    Get OTP
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
                                    {/* <IonButton fill="clear" onClick={goToRegisterPage}> Sign Up</IonButton>*/}
                                </p>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Login;
