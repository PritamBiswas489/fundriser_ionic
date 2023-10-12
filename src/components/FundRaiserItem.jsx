import React from "react";
import "../pages/CatagorieListing.css";
import { Link } from "react-router-dom";
import { BiDonateHeart } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import {
    IonImg,
    IonProgressBar
  } from "@ionic/react";

export default function FundRaiserItem({itemValue}) {
  return (
    <div className="d-flex catListBox">
      <div className="catListImg">
        <span>
          <IonImg src={"../assets/images/result-1.jpg"} alt="" />
        </span>
      </div>
      <div className="catListDtls">
        <ul className="d-flex donateShare">
          <li>
            <Link to={"/"} className="donateIcon">
              <BiDonateHeart />
            </Link>
          </li>
          <li>
            <Link to={"/"} className="shareIcon">
              <FaShareAlt />
            </Link>
          </li>
        </ul>
        <h3>
          <a href={`/donate/${itemValue.id}`}>
            {itemValue.id} -- {itemValue.title}
          </a>
        </h3>
        <p>By save 1 soul</p>
        <div className="progressArea">
          <h5>$550 raised of $ 200,000</h5>
          <IonProgressBar value={0.5} buffer={0.6}></IonProgressBar>
          <ul className="d-flex justify-content-between progressBtm">
            <li>Raised: $332</li>
            <li>Goal: $1,000,000</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
