import React from "react";
import OwlCarousel from "react-owl-carousel";
import "../pages/Donation.css";
import ChooseDonationAmtItem from "./ChooseDonationAmtItem";
import ChooseOtherAmtItem from "./ChooseOtherAmtItem";

const sortBy = {
  autoplay: false,
  smartSpeed: 2000,
  autoWidth: true,
  margin: 8,
  nav: false,
  dots: false,
  navElement: "div",
  responsive: {
    0: {
      items: 3.8,
    },
    600: {
      items: 5.5,
    },
  },
};

export default function ChooseDonationAmtPanel({ details }) {
  return (
    <div className="sortByArea p-h-20">
      <OwlCarousel className="owl-theme" {...sortBy}>
        {details?.campaign_amount &&
          details?.campaign_amount?.pledge_amount_one && (
            <ChooseDonationAmtItem
              amount={details.campaign_amount.pledge_amount_one}
            />
          )}
        {details?.campaign_amount &&
          details?.campaign_amount?.pledge_amount_two && (
            <ChooseDonationAmtItem
              amount={details.campaign_amount.pledge_amount_two}
            />
          )}
        {details?.campaign_amount &&
          details?.campaign_amount?.pledge_amount_three && (
            <ChooseDonationAmtItem
              amount={details.campaign_amount.pledge_amount_three}
            />
          )}

        <ChooseOtherAmtItem />
      </OwlCarousel>
    </div>
  );
}
