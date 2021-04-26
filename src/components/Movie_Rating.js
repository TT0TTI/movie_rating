import React, { useCallback, useEffect, useState } from "react";
import { Form, FormGroup, Input, Button, Label, Row, Col } from "reactstrap";
import StarRating from "react-rating-stars-component";

function MovieRating() {
  const [input, setInput] = useState({
    writer: "",
    title: "",
    main: "",
    rating: 0,
  });
  const [movieList, setMovieList] = useState(
    () => JSON.parse(localStorage.getItem("Movies")) || []
  );
  const { writer, title, main, rating } = input;
  const onWrite = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value,
      });
    },
    [input]
  );

  const ratingChange = useCallback(
    (rating) => {
      setInput({
        ...input,
        rating,
      });
    },
    [input]
  );

  const onSubmit = useCallback(
    (e) => {
      if (writer !== "" && title !== "" && main !== "" && rating !== 0) {
        e.preventDefault();
        setMovieList(movieList.concat(input));
        setInput({ writer: "", title: "", main: "", rating: 0 });
      } else {
        e.preventDefault();
      }
    },
    [writer, title, main, rating, movieList, input]
  );

  const onRemove = useCallback(
    (writer) => {
      const newList = movieList.filter((movie) => movie.writer !== writer);
      return setMovieList(newList);
    },
    [movieList]
  );

  useEffect(() => {
    localStorage.setItem("Movies", JSON.stringify(movieList));
  }, [movieList]);

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>글쓴이</Label>
          <Input
            onChange={onWrite}
            name="writer"
            type="text"
            value={input.writer}
          />
          <Label>영화 이름</Label>
          <Input
            onChange={onWrite}
            name="title"
            type="text"
            value={input.title}
          />
          <Label>평가</Label>
          <Input
            onChange={onWrite}
            name="main"
            type="text"
            value={input.main}
          />
          <StarRating
            size={30}
            onChange={ratingChange}
            value={input.rating}
            isHalf="true"
          />
          <Button color="primary" outline>
            제출
          </Button>
        </FormGroup>
      </Form>

      <ul className="list-group">
        {movieList.map((value, index) => {
          return (
            <li className="list-group-item" key={index}>
              <Row>
                <Col xs="2">{value.writer}</Col>
                <Col xs="2">{value.title}</Col>
                <Col xs="3">{value.main.slice(0, 7)}</Col>
                <Col xs="3">
                  <StarRating
                    size={20}
                    value={value.rating}
                    edit={false}
                    isHalf={true}
                  />
                </Col>
                <Col>
                  <Button onClick={() => onRemove(value.writer)} color="danger">
                    삭제
                  </Button>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovieRating;
