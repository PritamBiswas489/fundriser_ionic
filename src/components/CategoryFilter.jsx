import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryDataActions } from "../store/redux/category-data-slice";
import { useHttpClient } from "../hook/http-hook";
import "../pages/CategoryListing.css";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { pageListingActions } from "../store/redux/page-listing-slice";

export default function CategoryFilter({}) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state["categoryData"].categories);
  const { sendRequest: categoryFetch } = useHttpClient();
  const categoryFetching = async () => {
    const responseData = await categoryFetch(
      `${API_BASE_URL}fundraisecategory`
    );
    if (responseData?.category) {
      dispatch(
        categoryDataActions.setCategories({ categories: responseData.category })
      );
    }
  };
  const selectedCategory = useSelector(
    (state) => state["categoryData"].selectedCategory
  );
  function setSelectedCategory(category_id) {
    dispatch(
      categoryDataActions.setSelectedCategory({ selectedCategory: category_id })
    );
    dispatch(pageListingActions.refresh());
  }

  useEffect(() => {
    if (categories.length === 0) {
      categoryFetching();
    }
  }, [categories]);

  return (
    <div className="sortByArea p-h-20">
      <Swiper
        spaceBetween={4}
        slidesPerView={3}
        centeredSlides={false}
        loop={false}
      >
        <SwiperSlide key="0">
          <div className="item">
            <div className="sortByBox">
              <Link
                to={"#"}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(0);
                }}
                className={`${selectedCategory === 0 && "active"}`}
              >
                All
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {categories.length > 0 && categories.map((catgoryDetails, CategoryIndex) => {
          return (
            <SwiperSlide key={CategoryIndex + 1}>
              <div className="item">
                <div className="sortByBox">
                  <Link
                    to={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(catgoryDetails.id);
                    }}
                    className={`${
                      selectedCategory === catgoryDetails.id && "active"
                    }`}
                  >
                    {catgoryDetails.cat_name}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
