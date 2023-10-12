import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from "./pages/Splash";
import Verification from "./pages/Verification";
import Landing from "./pages/Landing";
import Donate from "./pages/Donate";
import CatagorieListing from "./pages/CatagorieListing";
import Donation from "./pages/Donation";
import StripePayment from "./pages/StripePayment"
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

<link
    href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
/>;

setupIonicReact();

const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/home">
                    {/* <Donation /> */}
                    <CatagorieListing/>
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
                <Route exact path="/donate/:id">
                    <Donate />
                </Route>
                <Route exact path="/listing">
                    <CatagorieListing />
                </Route>
                <Route exact path="/donation/:id">
                    <Donation />
                </Route>
                <Route exact path="/payment-stripe/:id/:amount">
                    <StripePayment/>
                </Route>
                <Route exact path="/test-paypal">
                    <TestPayPalPayment/>
                </Route>
                <Route exact path="/paypal-payment/:id/:amount">
                    <PayPalPayment/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
