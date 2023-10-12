import React from "react";
import "./CampaignerDetails.css";
import { BsEnvelope } from "react-icons/bs";
import { HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IonImg } from "@ionic/react";

const CampaignerDetails = () => {
    return (
        <>
            <div className="d-flex align-items-center campaignerDetails">
                <div className="campDtlsLeft">
                    <span>
                        <IonImg src={("../../assets/images/campaigner-img.jpg")} alt="" />
                    </span>
                </div>
                <div className="campDtlsRight">
                    <h5>Save1 Soul</h5>
                    <ul>
                        <li>
                            <span>
                                <IonImg src={("../../assets/images/usa-flag.png")} alt="" />
                            </span>{" "}
                            United States Of America
                        </li>
                        <li>
                            <span>
                                <BsEnvelope />
                            </span>{" "}
                            <Link to={"/"}> save1soulnow@yahoo.com</Link>
                        </li>
                        <li>
                            <span>
                                <HiOutlinePhone />
                            </span>{" "}
                            <Link to={"/"}> 3128684422</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="companyDetails">
                <h3>Company details</h3>
                <ul>
                    <li>
                        <span>Company Name :</span> Save 1 Soul Non-Profit Corporation
                    </li>
                    <li>
                        <span>Company mailing address :</span> 2727 Second Avenue
                    </li>
                    <li>
                        <span>City:</span> Detroit
                    </li>
                    <li>
                        <span>Zip:</span> 48201
                    </li>
                    <li>
                        <span>Country:</span> United States Of America
                    </li>
                    <li>
                        <span>Contact number:</span> 3128684422
                    </li>
                </ul>
            </div>
        </>
    );
};

export default CampaignerDetails;
