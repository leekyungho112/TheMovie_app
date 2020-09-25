import React from "react";
import { Descriptions, Badge } from "antd";
import { IMAGE_BASE_URL } from "../../../Config";

function TvInfo(props) {
  const { tv } = props;

  return (
    <Descriptions title="Tv 정보" bordered>
      <Descriptions.Item label="제목">{tv.name}</Descriptions.Item>
      <Descriptions.Item label="방영일">{tv.first_air_date}</Descriptions.Item>
      <Descriptions.Item label="재생시간">
        {tv.episode_run_time}
      </Descriptions.Item>
      <Descriptions.Item label="에피소드">
        {tv.number_of_episodes}
      </Descriptions.Item>
      <Descriptions.Item label="시즌">{tv.number_of_seasons}</Descriptions.Item>
      <Descriptions.Item label="상태">{tv.status}</Descriptions.Item>
      <Descriptions.Item label="인기도">{tv.popularity}</Descriptions.Item>
      <Descriptions.Item label="장르">
        {" "}
        {tv.genres &&
          tv.genres.map((genre, index) => (
            <Descriptions.Item key={index}> {genre.name} </Descriptions.Item>
          ))}
      </Descriptions.Item>
      <Descriptions.Item label="방송사">
        {" "}
        {tv.networks &&
          tv.networks.map((networks, index) => (
            <Descriptions.Item key={index}>
              <img
                style={{
                  width: "27px",
                  height: "27px",
                  marginLeft: "20px",
                }}
                src={`${IMAGE_BASE_URL}w200${networks.logo_path}`}
              />
            </Descriptions.Item>
          ))}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default TvInfo;
