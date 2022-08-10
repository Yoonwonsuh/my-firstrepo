import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";
import { getMoviesThunk } from "../../redux/modules/movieSlice";

const MovieCard = ({ movies }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);

  return (
    <>
      {movies.map((movies) => {
        return (
          <div
            className="card-inner"
            onClick={() => {
              navigate(`/detail/${movies.id}`);
            }}
            key={movies.id}
          >
            <div className="card-top">
              <img src={movies.img} alt={movies.title} />
            </div>
            <div className="card-bottom">
              <div className="card-info">
                <h4>{movies.title}</h4>
                <p>{movies.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieCard;
