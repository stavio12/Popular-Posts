import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { NewsType } from "../../utils/reducers-state";
import { actionCreators } from "../../state/index";
import { bindActionCreators } from "redux";

function ViewPost() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.news);
  const { getNews, getAllNews } = bindActionCreators(actionCreators, dispatch);
  const { id } = useParams();
  const [viewPost, setViewPost] = useState<NewsType>();

  useEffect(() => {
    if (id && state.News.length > 1) {
      // eslint-disable-next-line array-callback-return
      state.News.filter((news: NewsType) => {
        if (news.id === Number(id)) {
          setViewPost(news);
        }
      });
    }
  }, [state.News, id, state.viewPost]);

  const fireEditDelete = (id: number, type: string) => {
    //check if type is edit or delete
    if (type === "edit") {
      //dispatch data
      // @ts-expect-error
      getNews(viewPost);
    } else {
      //remove object(news) from array
      const deletedNews: any[] = state.News.filter(
        (newsItem: NewsType) => newsItem.id !== id
      );

      //dispatch new data into state
      // @ts-expect-error
      getAllNews(deletedNews);

      //store in localStorage
      localStorage.setItem("news", JSON.stringify(deletedNews));

      //navigate to home page
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="col-8 text-center mx-auto">
        <h1 className="pt-3">{viewPost?.title}</h1>
        <p>{viewPost?.body}</p>
      </div>{" "}
    </>
  );
}

export default ViewPost;
