import React from "react";
import { Link } from "react-router-dom";
import "../pages/Donation.css";
import { useSelector, useDispatch } from "react-redux";
import { donationAmtActions } from "../store/redux/donation-amt-slice";

export default function ChooseOtherAmtItem() {
  const dispatch = useDispatch();  
  const selectedOtherAmount = useSelector(
    (state) => state["donationAmt"].selectedOtherAmount
  );
  const otherChoosenAmount = useSelector(
    (state) => state["donationAmt"].otherChooseAmount
  );
  const selectOtherAmountItem = ()=>{
    dispatch(donationAmtActions.setSelectedOtherAmount(true));
    dispatch(donationAmtActions.setChoosenDonationAmount(0));
    dispatch(donationAmtActions.setOtherAmtModalShowStatus(true));
  }
  return (
    <div className="item">
      <div className="sortByBox">
        <Link
          to={"#"}
          onClick={(e) => {
            e.preventDefault();
            selectOtherAmountItem();
          }}
          className={`${selectedOtherAmount && "active"}`}
        >
          Other Amount{otherChoosenAmount > 0 && ` :$${otherChoosenAmount}`}
        </Link>
      </div>
    </div>
  );
}
