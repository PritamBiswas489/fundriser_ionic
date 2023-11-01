import React, { useState, useRef, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiRefund2Line } from "react-icons/ri";
import { IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import StartNewCampaignModal from "./StartNewCampaignModal";
import { useSelector, useDispatch } from "react-redux";
import { startCampignModalActions } from "../store/redux/start-campaign-modal-slice";
import { startCampignDataActions } from "../store/redux/start-campaign-data-slice";
import { useIonRouter } from "@ionic/react";

const Footer = () => {
    const user_id = useSelector((state) => state["userData"].user_id);
    const dispatch = useDispatch();
    const router = useIonRouter();
    const modalStatus = useSelector(state=>state['startCampignModal'].show);
    const openAddCampaignForm = () =>{
        if(parseInt(user_id)===0){
            router.push("/login", "forward", "push");
        }else{
            dispatch(startCampignModalActions.setData({field:'show',data:true}));
            dispatch(startCampignDataActions.setData({field:'campaignID',data:0}));
            dispatch(startCampignDataActions.resetState());

        }
        
    }
    return (
        <>
            <IonTabBar slot="bottom" className="footer">
                <IonTabButton tab="home" href="/landing">
                    <AiOutlineHome />
                </IonTabButton>
                <IonTabButton tab="restaurant" href={'#'} onClick={(e)=>{ 
                    e.preventDefault();   
                    openAddCampaignForm();
                    }} className="startFundraiser">
                    <IonLabel>
                        Start
                        <br />
                        Fundraiser
                    </IonLabel>
                </IonTabButton>
                <IonTabButton tab="cart" href="/listing">
                    <RiRefund2Line />
                </IonTabButton>
            </IonTabBar>
            <StartNewCampaignModal showModal={modalStatus}/>
        </>
    );
};

export default Footer;
