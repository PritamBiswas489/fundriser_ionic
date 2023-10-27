import React, { useState, useEffect, useCallback } from "react";

import "./CategoryListing.css";
import {
  IonContent,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonIcon,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonMenu
} from "@ionic/react";

import { chevronBackOutline, personCircle } from "ionicons/icons";
import { useHttpClient } from "../hook/http-hook";
import Footer from "../components/Footer";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API_BASE_URL, DATA_PER_PAGE } from "../config";

import CategoryFilter from "../components/CategoryFilter";
import FundRaiserItem from "../components/FundRaiserItem";
import { useSelector, useDispatch } from "react-redux";
import { fundriserListingActions } from "../store/redux/fundriser-listing-slice";
import { pageListingActions } from "../store/redux/page-listing-slice";
import SkeletonLoader from "../components/SkeletonLoader";
import { homeSearchFieldActions } from "../store/redux/home-search-field-slice";
import Menu from "../components/Menu";

const CategoryListing = () => {
  const dispatch = useDispatch();

  const searchText = useSelector(
    (state) => state["homeSearchField"].searchValue
  );
  const setSearchText = (value) => {
    dispatch(homeSearchFieldActions.setValue(value));
  };
  const selectedCategory = useSelector(
    (state) => state["categoryData"].selectedCategory
  );
  const items = useSelector((state) => state["fundriserListing"].data);
  const totalItems = useSelector(
    (state) => state["fundriserListing"].totalData
  );
  const page = useSelector((state) => state["pageListing"].page);
  function setPage(page) {
    dispatch(pageListingActions.setPage(page));
  }

  const noMoreData = useSelector((state) => state["pageListing"].noMoreData);
  function setNoMore(b) {
    dispatch(pageListingActions.setNoMore(b));
  }

  const {
    isLoading: fundRaiserLoading,
    error: fundRaiserError,
    sendRequest: fundRaiserFetch,
    clearError,
  } = useHttpClient();

  const generateItems = async (refreshData = true) => {
    const searchValue = {
      page: page,
      limit: DATA_PER_PAGE,
      cat_id: selectedCategory,
      s: searchText,
    };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await fundRaiserFetch(
      `${API_BASE_URL}fundraisers?${queryString}`
    );
    dispatch(fundriserListingActions.setTotalData(responseData.total));
    if (responseData.data.length === 0) {
      setNoMore(true);
      if (refreshData === true) {
        dispatch(fundriserListingActions.setData([...responseData.data]));
      }
      setPage(1);
    } else {
      console.log(refreshData);
      if (refreshData === true) {
        dispatch(fundriserListingActions.setData([...responseData.data]));
      } else {
        dispatch(
          fundriserListingActions.setData([...items, ...responseData.data])
        );
      }
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      //append should done
      generateItems(false);
    } else {
      //no append
      generateItems(true);
    }
  }, [selectedCategory, searchText]);

  const handleSearchChange = (e) => {
    const newValue = e.detail.value;
    dispatch(pageListingActions.refresh());
    setSearchText(newValue);
  };
  async function openFirstMenu() {
    const menu = document.querySelector("ion-menu");
    menu.toggle();
  }

  return (
    <>  
      <Menu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/landing" icon={chevronBackOutline} />
            </IonButtons>
            <IonTitle className="backTitle">Browse Fundraisers</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={openFirstMenu}>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <div className="catagorieListing">
            <div className="innerSrc d-flex align-items-center">
              <IonSearchbar
                value={searchText}
                placeholder="Search by name"
                className="innerSrcInput"
                onIonInput={handleSearchChange}
              ></IonSearchbar>
            </div>
            <CategoryFilter />

            <div className="searchResult">
              <div className="searchResultTop w-100">
                <ul className="d-flex justify-content-between align-items-center">
                  <li className="srLeft">Search Result</li>
                  <li className="srRight">
                    <span>{totalItems}</span> Founds
                  </li>
                </ul>
              </div>
            </div>

            {items &&
              items.map((itemValue, itemIndex) => {
                return <FundRaiserItem key={itemIndex} itemValue={itemValue} />;
              })}
            {fundRaiserLoading && <SkeletonLoader />}
          </div>
          {!noMoreData && (
            <IonInfiniteScroll
              threshold="100px" // Distance from the bottom to trigger the load
              onIonInfinite={(ev) => {
                generateItems(false);
                setTimeout(() => ev.target.complete(), 500);
              }}
            >
              <IonInfiniteScrollContent
                loadingText="Loading more items..."
                loadingSpinner="bubbles"
              />
            </IonInfiniteScroll>
          )}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default CategoryListing;
