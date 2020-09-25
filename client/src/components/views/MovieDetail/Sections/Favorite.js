import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((res) => {
      console.log("favoriteNumber :", res.data);
      if (res.data.success) {
        setFavoriteNumber(res.data.favoriteNumer);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((res) => {
      console.log("favorited :", res.data);
      if (res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      axios.post("/api/favorite/removeFromFavorite", variables).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("리스트에서 지우는걸 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("리스트에서 추가하는걸 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {!Favorited ? "즐겨찾기추가" : " Not Favorite"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
