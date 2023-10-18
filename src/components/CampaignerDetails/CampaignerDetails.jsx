import React from "react";
import "./CampaignerDetails.css";
import { BsEnvelope } from "react-icons/bs";
import { HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IonImg } from "@ionic/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CampaignerDetails = ({ profile, campaign_company }) => {
  return (
    <>
      <div className="d-flex align-items-center campaignerDetails">
        <div className="campDtlsLeft">
          <span>
            <LazyLoadImage
              alt={profile?.first_name}
              effect="blur"
              src={"../../assets/images/campaigner-img.jpg"}
            />
          </span>
        </div>
        <div className="campDtlsRight">
          <h5>
            {profile?.first_name} {profile?.last_name}
          </h5>
          <ul>
            <li>{profile?.countryname}</li>
            <li>
              <span>
                <BsEnvelope />
              </span>{" "}
              <a href={`mailto:${campaign_company?.email_address}`}>
                {" "}
                {campaign_company?.email_address}
              </a>
            </li>
            <li>
              <span>
                <HiOutlinePhone />
              </span>{" "}
              <a href={`tel:${campaign_company?.contact_number}`}>
                {" "}
                {campaign_company?.contact_number}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="companyDetails">
        <h3>Company details</h3>
        <ul>
          <li>
            <span>Company Name :</span> {campaign_company?.company_name}
          </li>
          <li>
            <span>Company mailing address :</span>{" "}
            {campaign_company?.mailing_address}
          </li>
          <li>
            <span>City:</span> {campaign_company?.city}
          </li>
          <li>
            <span>Zip:</span> {campaign_company?.zip}
          </li>
          <li>
            <span>Country:</span> {profile?.countryname}
          </li>
          <li>
            <span>Contact number:</span>{" "}
            <a href={`tel:${campaign_company?.contact_number}`}>
              {" "}
              {campaign_company?.contact_number}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CampaignerDetails;
