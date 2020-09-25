import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";

import { Row, Button } from "antd";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCards from "../commons/GridCards";
import TvInfo from "./Sections/TvInfo";
import Tvfavirote from "../MovieDetail/Sections/Tvfavirote";

function TvPageDetail(props) {
  //MovieId를 가져온다
  let tvId = props.match.params.tvId;
  const [Tv, setTv] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ActorToggle, setActorToggle] = useState(false);

  // DOM이 로드가 되면 처음에 할 동작을 넣어준다.
  useEffect(() => {
    console.log(props.match);

    let endpointCast = `${API_URL}tv/${tvId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}tv/${tvId}?api_key=${API_KEY}&language=ko-KR`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTv(response);
      });

    fetch(endpointCast)
      .then((response) => response.json())
      .then((response) => {
        console.log("Crew", response.cast);
        setCasts(response.cast);
        setLoading(false);
      });
  }, []);

  const actorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* header */}
      {/* backdrop_path값을 가져오는데 시간이 걸리는데 그전에 값을 불러 드릴려고 하면 Undefined   */}
      {Tv.backdrop_path && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Tv.backdrop_path}`}
          title={Tv.name}
          text={Tv.overview}
        />
      )}

      {/* body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Tvfavirote
            tvInfo={Tv}
            tvId={tvId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>
        {/* Movie Info */}
        <TvInfo tv={Tv} />
        <br />
        {/* Actor Grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={actorView}>출연진 정보</Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {!Loading ? (
              Casts.map(
                (cast, index) =>
                  cast.profile_path && (
                    <GridCards
                      key={index}
                      image={`${IMAGE_BASE_URL}w400${cast.profile_path}`}
                      charName={cast.name}
                    />
                  )
              )
            ) : (
              <div>loading...</div>
            )}
          </Row>
        )}
      </div>
    </div>
  );
}

export default TvPageDetail;
