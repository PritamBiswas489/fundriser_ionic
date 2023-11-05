import React from "react";
import "../pages/CategoryListing.css";
import { Link } from "react-router-dom";
import { BiDonateHeart } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { useIonRouter } from "@ionic/react";
import { IonImg, IonProgressBar } from "@ionic/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Share } from '@capacitor/share';
import { useIonToast } from "@ionic/react";
import { SITE_URL } from "../config";

export default function FundRaiserItem({ itemValue }) {
  const router = useIonRouter();
  const [present] = useIonToast();
  const presentToast = (position, message) => {
    present({
      message: message,
      duration: 3000,
      position: position,
      cssClass: "custom-toast",

      buttons: [
        {
          text: "Dismiss",
          role: "cancel",
        },
      ],
    });
  };

  const toDetailsPage = (campaign_id) => {
    router.push(`/donate/${campaign_id}`, "forward", "push");
  };
  function formatAmount(amt) {
    return amt.toLocaleString();
  }
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  const shareContent = async (e)=>{
    e.preventDefault();
    const shareOptions = {
      title: itemValue.title,
      text: truncateText(itemValue?.fundraising_for, 100),
      url: SITE_URL+'donation/'+itemValue.slug,
      dialogTitle: 'Share with friends',
    };
    try {
      await Share.share(shareOptions);
      presentToast('middle','Shared successfully');
    } catch (error) {
      presentToast('middle','Shared failed');
    }

  }
  let percentage = 0;
  const totalRaise = parseFloat(itemValue?.raised || 0);
  percentage = (parseFloat(totalRaise) * 100) / (itemValue?.goal || 0);
  return (
    <div className="d-flex catListBox">
      <div className="catListImg">
        <span>
          <LazyLoadImage
            alt={itemValue.title}
            effect="blur"
            src={itemValue.image}
          />
        </span>
      </div>
      <div className="catListDtls">
        <ul className="d-flex donateShare">
          {/* <li>
            <Link to={"/"} className="donateIcon">
              <BiDonateHeart />
            </Link>
          </li> */}
          <li>
            <Link to={"/"} onClick={shareContent} className="shareIcon">
              <FaShareAlt />
            </Link>
          </li>
        </ul>
        <h3>
          <a
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              toDetailsPage(itemValue.id);
            }}
          >
            {/* {itemValue.id} -- */}
            {itemValue.title}
          </a>
        </h3>
        <p>By {itemValue.uploaderName}</p>
        <div className="progressArea">
          <h5>
            ${formatAmount(itemValue?.raised || 0)} raised of $
            {formatAmount(itemValue?.goal || 0)}
          </h5>
          <IonProgressBar
            value={percentage / 100}
            buffer={0.1}
          ></IonProgressBar>
          <ul className="d-flex justify-content-between progressBtm">
            <li>Raised: ${formatAmount(itemValue?.raised || 0)}</li>
            <li>Goal: ${formatAmount(itemValue?.goal || 0)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
