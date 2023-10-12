import React, { useState, useRef, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiRefund2Line } from "react-icons/ri";
import { IonTabBar, IonTabButton, IonLabel } from "@ionic/react";

const Footer = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <IonTabBar slot="bottom" className="footer">
                <IonTabButton tab="home" href="/landing">
                    <AiOutlineHome />
                    {/* <IonLabel>Home</IonLabel> */}
                </IonTabButton>

                <IonTabButton tab="restaurant" href={'#'} className="startFundraiser">
                    <IonLabel>
                        Start
                        <br />
                        Fundraiser
                    </IonLabel>
                </IonTabButton>

                {/* <IonTabButton tab="book-table" href="#">
                    <MdOutlineTableRestaurant />
                    <IonLabel>Book table</IonLabel>
                </IonTabButton> */}

                <IonTabButton tab="cart" href="/catagorie-listing">
                    <RiRefund2Line />
                    {/* <IonLabel>Cart</IonLabel> */}
                </IonTabButton>
            </IonTabBar>
        </>
    );
};

export default Footer;
