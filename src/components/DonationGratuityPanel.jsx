import React from 'react'
import "../pages/Donation.css";
import {
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useSelector, useDispatch } from 'react-redux';
import { donationAmtActions } from '../store/redux/donation-amt-slice';
 

export default function DonationGratuityPanel() {
  const dispatch = useDispatch();  
  const selectedGratuity = useSelector(state=>state['donationAmt'].selectedGratuity);
  const otherGratuityAmount = useSelector(state=>state['donationAmt'].otherGratuityAmount);
  const selectedOtherGratuityOption = useSelector(state=>state['donationAmt'].selectedOtherGratuityOption);
  let selectedValue = '';
  if(selectedOtherGratuityOption === false){
    selectedValue = selectedGratuity.toString();
  }else{
    selectedValue = 'other';
  }
  console.log({selectedValue});
  const setField = (e) =>{
     if(e.detail.value==='other'){
       dispatch(donationAmtActions.setSelectedOtherGratuityOption(true));   
       dispatch(donationAmtActions.setOtherGratuityAmtModalShowStatus(true)); 
     }else{
        dispatch(donationAmtActions.setSelectedOtherGratuityOption(false)); 
        dispatch(donationAmtActions.setSelectedGratuity(e.detail.value)); 
        dispatch(donationAmtActions.setOtherGratuityAmount(0)); 
        
     }
  }
  
  return (
    <>
    <ul className="d-flex align-items-center">
    <li>
      <strong>Gratuity</strong>
    </li>
    <li>
      <IonSelect onIonChange={setField} value={selectedValue}  placeholder={otherGratuityAmount} className="selectOption">
        <IonSelectOption value="10">10% of total charge</IonSelectOption>
        <IonSelectOption value="15">15% of total charge</IonSelectOption>
        <IonSelectOption value="20">20% of total charge</IonSelectOption>
        <IonSelectOption value="other">Other {parseFloat(otherGratuityAmount) > 0 && `:$${otherGratuityAmount}`}</IonSelectOption>
      </IonSelect>
    </li>
    
  </ul>
   
  </>
  )
}
