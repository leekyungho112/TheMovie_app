import React, { useEffect, useState } from "react";
import { Button, Row } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.results);

        setMovies([...Movies, ...response.results]);
        setMainMovieImage(MainMovieImage || response.results[0]);
        setCurrentPage(response.page);
        setLoading(false);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
    setLoading(true);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* main Image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>최신 영화</h2>
        <hr />
        {/* Movie grid card */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      {loading && <div>Loading...</div>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMoreItems} loading>
          더 보기
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
