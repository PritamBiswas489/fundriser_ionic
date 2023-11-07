import React, { useEffect, useState } from "react";
import "./HomeBanner.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeBanner = () => {
  const settingsData = useSelector((state) => state["settingData"]);
  const [landingPageImages, setLandingPageImages] = useState([]);
  const [homeLandingTextOne, setHomeLandingTextOne] = useState("Need to");
  const [homeLandingTextTwo, setHomeLandingTextTwo] = useState("HELP A LOVED ONE OR RAISE FUNDS FOR OTHER CAUSES");
  useEffect(() => {
    if (settingsData?.settings?.listHomeBanner) {
      settingsData?.settings?.listHomeBanner.forEach((dataValue, dataIndex) => {
        setLandingPageImages((prev) => [...prev, dataValue]);
      });
    }
    if (settingsData?.settings?.settings?.[10]?.meta_value) {
      setHomeLandingTextOne(settingsData?.settings?.settings?.[10]?.meta_value);
    }
    if (settingsData?.settings?.settings?.[11]?.meta_value) {
      setHomeLandingTextTwo(settingsData?.settings?.settings?.[11]?.meta_value);
    }
  }, [settingsData]);
  return (
    <>
      <div className="homeBannerArea">
        <h3>{homeLandingTextOne}</h3>
        <p>{homeLandingTextTwo}</p>
        {landingPageImages.length > 0 ? (
          <div className="homeBanner">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {landingPageImages.map((imageUrl, imageIndex) => {
                return (
                  <SwiperSlide key={imageIndex}>
                    <LazyLoadImage alt={""} effect="blur" src={imageUrl} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className="homeBanner">
            <LazyLoadImage
              alt={""}
              effect="blur"
              width={"100%"}
              height={"200px"}
              src={"../../assets/images/home-banner.jpg"}
            />
          </div>
        )}
        <div className="joinCommunity">
          <h6>Join the community</h6>
          <ul className="d-flex justify-content-between">
            <li>
              <span>50 Thousand +</span>This Year
            </li>
            <li>
              <span>2 Thousand +</span>Website Clicks
            </li>
            <li>
              <span>20 Thousand +</span>Amount Raised{" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
