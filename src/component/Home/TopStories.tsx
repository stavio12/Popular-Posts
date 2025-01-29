import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NewsType } from "utils/reducers-state";
import Loader from "component/Loader/Loader";

import TopPost from "./TopPost";

function TopStories() {
  const state = useSelector((state: any) => state.news);
  const [allNews, setAllNews] = useState([]);
  const [newPosts, setNewPosts] = useState<number>(12);

  useEffect(() => {
    if (state.News.length >= 1) {
      setAllNews(state.News.slice(0, 12));
    }
  }, [state.News, state.loader]);

  useEffect(() => {
    if (state.News.length >= 1) {
      setAllNews(
        state.News.slice(newPosts === 12 ? 0 : newPosts - 12, newPosts)
      );
    }
  }, [newPosts]);

  return (
    <>
      <h1 className="text-start pb-3">Top Posts</h1>

      {state.loader && <Loader />}
      {!state.loader && (
        <div className="row mx-auto text-center">
          <div className="row pt-5">
            {allNews.map((news: NewsType) => (
              <TopPost topPost={news} key={news.id} />
            ))}
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {" "}
              <li
                className="page-item"
                onClick={() => {
                  if (newPosts <= 12) {
                    return;
                  }
                  setNewPosts((prev) => prev - 12);
                }}
              >
                <p className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </p>
              </li>
              <li
                className="page-item"
                onClick={() => {
                  if (newPosts >= 100) {
                    return;
                  }
                  setNewPosts((prev) => prev + 12);
                }}
              >
                <p className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default TopStories;
