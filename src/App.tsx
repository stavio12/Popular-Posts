import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

import "./App.css";

import Nav from "./Nav";
import Home from "component/Home";
import ViewNews from "component/Posts/ViewPost";

import { actionCreators } from "./state/index";
import { NewsType } from "utils/reducers-state";

const App: React.FC = () => {
  const state = useSelector((state: any) => state.news);

  const dispatch = useDispatch();

  const { getAllNews, loader } = bindActionCreators(actionCreators, dispatch);

  const [id, setID] = useState(1);

  useEffect(() => {
    //check if localStorage has data
    if (localStorage.getItem("news")) {
      // @ts-expect-error
      const data: any = JSON.parse(localStorage.getItem("news"));

      loader(false);

      //set data into state
      getAllNews(data);
    } else {
      getNewsData(state.queryID);
    }

    //if state id is not equal to current id call news api function
    if (state.queryID !== id) {
      getNewsData(state.queryID);
      setID(state.queryID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.queryID, id]);

  const getNewsData = (id: number) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then(async (response) => {
        const news = await response.data;
        let newNewsData: NewsType[] = [];

        news.map((newsData: any) => {
          return newNewsData.push({
            title: newsData.title,
            id: newsData.id,
            body: newsData.body,
            userId: newsData.userId,
          });
        });
        loader(false);

        //Set data into local storage
        localStorage.setItem("news", JSON.stringify(newNewsData));

        //set data into state
        dispatch({ type: "ALL-NEWS", payload: newNewsData });
      });
  };

  return (
    <>
      <Nav />
      <div className="container position-relative pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id/" element={<ViewNews />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
