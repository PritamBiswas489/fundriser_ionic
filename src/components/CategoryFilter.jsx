import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryDataActions } from "../store/redux/category-data-slice";
import OwlCarousel from "react-owl-carousel";
import { useHttpClient } from "../hook/http-hook";
import "../pages/CatagorieListing.css";
import { API_BASE_URL } from "../config";
import CategoryFilterItem from "./CategoryFilterItem";

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

  useEffect(() => {
    if (categories.length === 0) {
      categoryFetching();
    }
  }, [categories]);

  const sortBy = {
    autoplay: false,
    // rtl: true,
    // autoplayTimeout: 5000,
    smartSpeed: 2000,
    // animateOut: 'fadeOut',
    // loop: true,
    autoWidth: true,
    margin: 6,
    nav: false,
    dots: false,
    navElement: "div",
    // navText: ["<i class='fas fa-arrow-alt-circle-left'></i>", "<i class='fas fa-arrow-alt-circle-right'></i>"],
    responsive: {
      0: {
        items: 3.8,
      },
      600: {
        items: 5.5,
      },
    },
  };

  return (
    <div className="sortByArea p-h-20">
      <OwlCarousel className="owl-theme" {...sortBy}>
       <CategoryFilterItem key="0" text="All" category_id={0}/>

        {categories.map((catgoryDetails, CategoryIndex) => {
          return (
            <CategoryFilterItem  key={CategoryIndex} text={catgoryDetails.cat_name} category_id={catgoryDetails.id}/>

             
          );
        })}
      </OwlCarousel>
    </div>
  );
}
