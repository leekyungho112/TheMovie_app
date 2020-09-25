import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";

function Tvfavirote(props) {
  const tvId = props.tvId;
  const userFrom = props.userFrom;
  const tvTitle = props.tvInfo.name;
  const tvPost = props.tvInfo.backdrop_path;
  const tvRunTime = props.tvInfo.episode_run_time;

  const [FavoriteNumber, setTvFavoriteNumber] = useState(0);
  const [Favorited, setTvFavorited] = useState(false);

  let variable = {
    userFrom: userFrom,
    tvId: tvId,
    tvTitle: tvTitle,
    tvPost: tvPost,
    tvRunTime: tvRunTime,
  };

  useEffect(() => {
    axios.post("/api/favorite/tvfavoriteNumber", variable).then((res) => {
      console.log("favoriteNumber :", res.data);
      if (res.data.success) {
        setTvFavoriteNumber(res.data.favoriteNumer);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    axios.post("/api/favorite/tvfavorited", variable).then((res) => {
      console.log("favorited :", res.data);
      if (res.data.success) {
        setTvFavorited(res.data.favorited);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const onClickFavorited = () => {
    if (Favorited) {
      axios.post("/api/favorite/tvremoveFromFavorite", variable).then((res) => {
        if (res.data.success) {
          setTvFavoriteNumber(FavoriteNumber - 1);
          setTvFavorited(!Favorited);
        } else {
          alert("리스트에서 지우는걸 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/favorite/tvaddToFavorite", variable).then((res) => {
        if (res.data.success) {
          setTvFavoriteNumber(FavoriteNumber + 1);
          setTvFavorited(!Favorited);
        } else {
          alert("리스트에서 추가하는걸 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorited}>
        {Favorited ? " Not Favorite" : "즐겨찾기추가"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Tvfavirote;
