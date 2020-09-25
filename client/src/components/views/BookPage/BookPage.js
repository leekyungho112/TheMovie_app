import React, { useEffect, useState } from "react";
import { API_BOOK_KEY, API_BOOK_URL } from "../../Config";
import { Row, Button, Input } from "antd";
import axios from "axios";
import GridCards from "../commons/GridCards";

function BookPage() {
  const [Books, setBooks] = useState([]);
  const [Value, setValue] = useState("");

  const onChangeSearch = (e) => {
    setValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  // const fetchBooks = (endpoint) => {
  //   fetch(endpoint, {
  //     headers: { Authorization: "KakaoAK 3e7efabcedfcf6843cc95027d7a48735" },
  //  })
  //    .then((res) => res.json())
  //   .then((res) => {
  //      console.log(res.documents);
  //      setBooks([...Books, ...res.documents]);
  //   });
  // };
  useEffect(() => {
    //  const endpoint = `https://dapi.kakao.com/v3/search/book?target=title&query=${variable}`;
    //  console.log(endpoint);
    //  fetchBooks(endpoint);
  }, []);

  const onClickSearch = (e) => {
    e.preventDefault();

    const variable = Value;

    const endpoint = `https://dapi.kakao.com/v3/search/book?target=title&query=${variable}`;
    fetch(endpoint, {
      headers: { Authorization: "KakaoAK 3e7efabcedfcf6843cc95027d7a48735" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(endpoint);
        console.log(res.documents);
        setBooks([...Books, ...res.documents]);
        setValue("");
      });
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* main Image */}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>검색 목록</h2>
        <form style={{ display: "flex" }} onSubmit={onClickSearch}>
          <Input type="text" value={Value} onChange={onChangeSearch} />
          <Button onClick={onClickSearch}>검색</Button>
        </form>
        <hr />
        {/* Movie grid card */}
        <Row gutter={[16, 16]}>
          {Books &&
            Books.map((book, index) => (
              <React.Fragment key={index}>
                <GridCards image={book.thumbnail} charName={book.title} />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>더 보기</Button>
      </div>
    </div>
  );
}

export default BookPage;
