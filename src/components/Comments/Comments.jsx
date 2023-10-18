import React from "react";
import "./Comments.css";
import { IonList, IonButton } from "@ionic/react";

import CommentItem from "../CommentItem";
import { useHttpClient } from "../../hook/http-hook";
import { API_BASE_URL } from "../../config";
import { useEffect } from "react";
import { useState } from "react";
import SkeletonLoader from "../SkeletonLoader";

const Comments = ({ campaign_id }) => {
  const [page, setPage] = useState(1);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const {
    isLoading: listCommentLoading,
    error: listCommentError,
    sendRequest: listCommentFetch,
    addCommentClearError,
  } = useHttpClient();

  const getCommentsList = async (refresh = true) => {
    const searchValue = { campaign_id, page };
    const queryString = new URLSearchParams(searchValue).toString();
    const responseData = await listCommentFetch(
      `${API_BASE_URL}get-campaign-comment-list?${queryString}`
    );
    setHasLoadMore(responseData?.hasMore);
    if (refresh === true) {
      setCommentData([...responseData?.results]);
    } else {
      setCommentData([...commentData, ...responseData?.results]);
    }
  };
  useEffect(() => {
    if (page == 1) {
      getCommentsList(true);
    } else {
      getCommentsList(false);
    }
  }, [campaign_id, page]);

  function formatedDate(createdDate) {
    const dateString = createdDate;
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }

  return (
    <>
      <IonList>
        {listCommentLoading && <SkeletonLoader />}
        {!listCommentLoading && commentData.length === 0 && <CommentItem noItem={1} />}
        {commentData.length > 0 &&
          commentData.map((comment, commentIndex) => {
            return (
              <CommentItem
                key={commentIndex}
                name={comment.name}
                date={formatedDate(comment.created_at)}
                text={comment.comments}
              />
            );
          })}
        {hasLoadMore ? (
          <IonButton
            color="primary"
            onClick={() => setPage((prev) => prev + 1)}
            expand="block"
            size="small"
            disabled={listCommentLoading}
          >
            Load More
          </IonButton>
        ) : (
          ""
        )}
      </IonList>
    </>
  );
};

export default Comments;
