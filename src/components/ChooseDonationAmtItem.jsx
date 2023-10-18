import React from "react";
import { Link } from "react-router-dom";
import "../pages/Donation.css";
import { useSelector, useDispatch } from "react-redux";
import { donationAmtActions } from "../store/redux/donation-amt-slice";
export default function ChooseDonationAmtItem({ amount }) {
    const dispatch = useDispatch();  
  const choosenDonationAmount = useSelector(
    (state) => state["donationAmt"].choosenDonationAmount
  );
  const selectAmountItem = ()=> {
    dispatch(donationAmtActions.setSelectedOtherAmount(false));
    dispatch(donationAmtActions.setChoosenDonationAmount(parseFloat(amount)));
    dispatch(donationAmtActions.setOtherChooseAmount(0));
  }
  return (
    <div className="item">
      <div className="sortByBox">
        <Link
          to={"#"}
          onClick={(e) => {
            e.preventDefault();
            selectAmountItem();
          }}
          className={`${
            parseFloat(choosenDonationAmount) === parseFloat(amount) && "active"
          }`}
        >
          ${amount}
        </Link>
      </div>
    </div>
  );
}
