import "./PostList.scss";
import React, { useEffect } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import movieSlice, { getMoviesThunk } from "../../redux/modules/movieSlice";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";

const PostList = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesThunk());
  }, [dispatch]);

  let {movies} = useSelector((state) => state.movies);
  console.log(movies);

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div className="goposting">
          <FaFeatherAlt
            className="gotoposting"
            onClick={() => navigate("/posting")}
          />
          <div className="gotoposting" onClick={() => navigate("/posting")}>
            &nbsp;&nbsp;포스팅 하러가기
          </div>
        </div>
        <div className="movie-container">
          {movies.length === 0 ? (
            ""
          ) : (
            <MovieCard  movies={movies} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
