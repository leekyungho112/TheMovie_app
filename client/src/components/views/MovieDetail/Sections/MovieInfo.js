import React from "react";
import { Descriptions, Badge } from "antd";

function MovieInfo(props) {
  const { movie } = props;

  return (
    <Descriptions title="영화 정보" bordered>
      <Descriptions.Item label="제목">{movie.title}</Descriptions.Item>
      <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="수익">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="상영시간">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="평점평균" span={2}>
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="평점카운트">
        {movie.vote_count}
      </Descriptions.Item>
      <Descriptions.Item label="상태">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="인기도">{movie.popularity}</Descriptions.Item>
      <Descriptions.Item label="장르">
        {" "}
        {movie.genres &&
          movie.genres.map((genre, index) => (
            <Descriptions.Item key={index}> {genre.name} </Descriptions.Item>
          ))}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
