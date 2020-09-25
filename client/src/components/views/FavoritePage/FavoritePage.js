import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import { Popover, Button } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  const [TvFavorites, setTvFavorites] = useState([]);
  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoredMovie();
    fetchFavoredTv();
  }, []);

  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setFavorites(res.data.favorites);
      } else {
        alert("영화정보를 가져오는데 실패했습니다.");
      }
    });
  };

  const fetchFavoredTv = () => {
    Axios.post("/api/favorite/getFavoredTv", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setTvFavorites(res.data.favorite);
      } else {
        alert("Tv정보를 가져오는데 실패했습니다.");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post("/api/favorite/removeFromFavorite", variables).then((res) => {
      if (res.data.success) {
        fetchFavoredMovie();
      } else {
        alert("리스트에서 제거하는데 실패했습니다.");
      }
    });
  };

  const onClickDeleted = (tvId, userFrom) => {
    const variable = {
      tvId,
      userFrom,
    };
    Axios.post("/api/favorite/removeFromFavorited", variable).then((res) => {
      if (res.data.success) {
        fetchFavoredTv();
      } else {
        alert("리스트에서 제거하는데 실패했습니다.");
      }
    });
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "no Image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>

        <td>
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            제거
          </Button>
        </td>
      </tr>
    );
  });

  const renderCard = TvFavorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.tvPost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.tvPost}`} />
        ) : (
          "no Image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.tvTitle}`}>
          <td>{favorite.tvTitle}</td>
        </Popover>
        <td>{favorite.tvRunTime} mins</td>

        <td>
          <Button
            onClick={() => onClickDeleted(favorite.tvId, favorite.userFrom)}
          >
            제거
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>저장 목록 콘텐츠</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>재생시간</th>
            <td>목록에서제거</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>

        <thead>
          <tr>
            <th>제목</th>
            <th>재생시간</th>
            <td>목록에서제거</td>
          </tr>
        </thead>
        <tbody>{renderCard}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
