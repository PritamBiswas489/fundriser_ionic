import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryDataActions } from "../store/redux/category-data-slice";
import { pageListingActions } from "../store/redux/page-listing-slice";
import "../pages/CatagorieListing.css";
import { Link } from "react-router-dom";
 

export default function CategoryFilterItem({text,category_id}) {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state["categoryData"].selectedCategory
  );
  function setSelectedCategory() {
    dispatch(
      categoryDataActions.setSelectedCategory({ selectedCategory: category_id })
    );
    dispatch(pageListingActions.refresh());
     
  }
  return (
    <div className="item">
    <div className="sortByBox">
      <Link
        to={"#"}
        onClick={() => setSelectedCategory()}
        className={`${selectedCategory === category_id && "active"}`}
      >
        {text}
      </Link>
    </div>
  </div>

  )
}
