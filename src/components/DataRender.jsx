import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataRender.css";
import Loader from "./Loader";
import ReactPaginate from "react-paginate";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import ErrorComponent from "./ErrorComponent";

const DataRender = () => {
  let [data, seatData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  let [errorhandler, setErrorHandler] = useState(false);

  let fetchData = async () => {
    setLoading(true);
    try {
      let {
        data: {
          data: { children },
        },
      } = await axios.get(`https://www.reddit.com/r/reactjs.json`);

      seatData(children);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorHandler(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ------------------- Pagination -------------------
  const perpage = 4;
  let handleFetch = ({ selected: selectedPage }) => {
    setCurrPage(selectedPage);
    window.scrollTo(0, 0);
  };
  //setting here data.length because we want to show the pages as per the data available
  const pageCount = Math.ceil(data.length / perpage);
  const offset = currPage * perpage; //offset = 0, 10, 20......

  if (errorhandler)
    return <ErrorComponent message={"Error While Fetching the Data"} />;

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="main_div">
        {data.slice(offset, offset + perpage).map((item) => {
          return (
            <div key={item.data.id}>
              <div className="title_div">
                <h1>Title:-</h1>
                <p>{item.data.title}</p>
              </div>

              <div className="url_div">
                <h1>URL:-</h1>
                <p>
                  <a href={item.data.url} target="blank">
                    {item.data.url}
                  </a>
                </p>
              </div>

              <div className="score_div">
                <h1>Score:- </h1>
                <p>{item.data.score}</p>
              </div>

              <div className="selftext_html_div">
                <h1>SelfText_HTML:-</h1>
                <p>
                  {item.data.selftext_html ? item.data.selftext_html : "NA"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={<LeftOutlined />}
        nextLabel={<RightOutlined />}
        pageCount={pageCount}
        onPageChange={handleFetch}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination_link_disabled"}
        activeClassName={"pagination_link_active"}
      />
    </>
  );
};

export default DataRender;
