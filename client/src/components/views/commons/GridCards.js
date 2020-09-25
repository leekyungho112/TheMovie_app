import React from "react";
import { Col } from "antd";
import { Chart } from "react-google-charts";

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px", borderRadius: "10px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
          <div style={{ display: "flex" }}>
            <Chart
              width={"70px"}
              height={"70px"}
              chartType="PieChart"
              loader={<div>Loading</div>}
              data={[
                ["영화", "평점"],
                ["점수", props.movieAverge],
                ["", 10 - props.movieAverge],
              ]}
              options={{
                pieHole: 0.7,

                pieSliceTextStyle: {
                  color: "black",
                },
                slices: {
                  0: {
                    color: "#21d07a",
                    textStyle: { fontSize: 10 },
                  },
                  1: {
                    color: "#193827",
                    textStyle: { fontSize: 0 },
                  },
                },

                legend: "none",
              }}
            />
            <span style={{ fontWeight: "500" }}>{props.movieName}</span>
          </div>
        </div>
      </Col>
    );
  } else if (props.TvPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/tv/${props.tvId}`}>
            <img
              style={{ width: "100%", height: "320px", borderRadius: "10px" }}
              src={props.image}
              alt={props.tvName}
            />
          </a>
          <span style={{ fontWeight: "500px" }}>{props.tvName}</span>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px", borderRadius: "10px" }}
            src={props.image}
            alt={props.charName}
          />
          <span style={{ fontWeight: "500" }}>{props.charName}</span>
        </div>
      </Col>
    );
  }
}
export default GridCards;
