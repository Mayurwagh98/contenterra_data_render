import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataRender.css";

const DataRender = () => {
  let [data, seatData] = useState([]);

  let fetchData = async () => {
    try {
      let {
        data: {
          data: { children },
        },
      } = await axios.get(`https://www.reddit.com/r/reactjs.json`);

      console.log(children);

      seatData(children);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main_div">
      {data.map((item) => {
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
              <p>{item.data.selftext_html ? item.data.selftext_html : "NA"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataRender;
