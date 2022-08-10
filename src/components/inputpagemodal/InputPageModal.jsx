import React, { useState } from "react";
import { APIkey } from "../../common/apis/movieAPiKey";
import movieApi from "../../common/apis/movieApi";

import { FaTimes } from "react-icons/fa";
import "./InputPageModal.scss";

const SearchForm = ({ moviePosting, setMoviePosting, setShow }) => {
  let [movieTitle, setMovieTitle] = useState("");

  let onChangeHandler2 = (e) => {
    const copy = e.target.value;
    setMovieTitle(copy);
  };

  let [searchMovie, setSearchMovie] = useState();

  let onChangeHandler = (movieId) => {
    const copy = searchMovie.find((movie) => movie.Poster == movieId);
    setMoviePosting({ ...moviePosting, img: copy.Poster });
    setShow(false);
  };

  let onSubmitHandler = (e) => {
    e.preventDefault();
    movieApi
      .get(`?apikey=${APIkey}&s=${movieTitle}&type=movie&page=1`)
      .then((data) => {
        let copy = data.data.Search;
        setSearchMovie(copy);
        // console.log(data);
      })
      .catch((err) => {
        console.log("Err :", err);
      });
  };

  return (
      <div className="modalBox">
        <FaTimes className="faArrowLeft" onClick={() => setShow(false)} />
        <form className="formBox" onSubmit={onSubmitHandler}>
          <input
            className="searchMovieInput"
            type="text"
            name="title"
            value={movieTitle}
            placeholder="제목을 입력하세요!"
            onChange={onChangeHandler2}
          />
        </form>
        <div className="imgBox2">
          {searchMovie !== undefined
            ? searchMovie.map((movie, index) =>
                movie.Poster !== "N/A" ? (
                  <img
                    className="imgCard"
                    onClick={() => {
                      onChangeHandler(movie.Poster);
                    }}
                    key={index}
                    src={movie.Poster}
                  />
                ) : (
                  ""
                )
              )
            : movieTitle === ""
            ? ""
            : "Not Found"}
        </div>
      </div>
  );
};

export default SearchForm;
