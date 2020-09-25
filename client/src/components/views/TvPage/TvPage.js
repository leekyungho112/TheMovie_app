import React, { useEffect, useState } from "react";
import { Button, Row } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCards from "../commons/GridCards";

function TvPage() {
  const [Tv, setTv] = useState([]);
  const [MainTvImage, setMainTVImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    fetchTvs(endpoint);
  }, []);

  const fetchTvs = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.results);

        setTv([...Tv, ...response.results]);
        setMainTVImage(MainTvImage || response.results[0]);
        setCurrentPage(response.page);
        setLoading(false);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=ko-KR&page=${
      CurrentPage + 1
    }`;
    fetchTvs(endpoint);
    setLoading(true);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* main Image */}
      {MainTvImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainTvImage.backdrop_path}`}
          title={MainTvImage.original_title}
          text={MainTvImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>인기 Tv</h2>
        <hr />
        {/* Movie grid card */}
        <Row gutter={[16, 16]}>
          {Tv &&
            Tv.map((tv, index) => (
              <React.Fragment key={index}>
                <GridCards
                  TvPage
                  image={
                    tv.poster_path
                      ? `${IMAGE_BASE_URL}w400${tv.poster_path}`
                      : null
                  }
                  tvId={tv.id}
                  tvName={tv.name}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      {loading && <div>Loading...</div>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMoreItems}>더 보기</Button>
      </div>
    </div>
  );
}

export default TvPage;
