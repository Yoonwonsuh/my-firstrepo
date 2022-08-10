import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./detail.scss";
import DetailPageModal from "../../components/detailPageModal/DetailPageModal";
import { delMoviesThunk } from "../../redux/modules/movieSlice";
import { getMovieThunk, editMovieThunk } from "../../redux/modules/targetMovieSlice";
import shortid from "shortid";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [modalOn, setModalOn] = useState(false);

  useEffect(()=>{
    dispatch(getMovieThunk(id));
  },[dispatch, id]);

  const movie = useSelector((state) => state.movie.movie);
  console.log(movie)





  return (
    <div>
      <div className="detailWrap">
        <div className="detailBox">
          <div className="imgBox">
            <img src={movie.img} />
          </div>
          <div className="contentBox">
            <h2>{movie.title}</h2>
            <h5>{movie.userid}</h5>
            <p>{movie.body}</p>
            <div className="btn_set">
              <button className="btn_edit" onClick={() => setModalOn(true)}>
                수정하기
              </button>
              <button
                className="btn_dele"
                onClick={() => {
                  dispatch(delMoviesThunk(movie.id));
                  navigate("/");
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <DetailPageModal show={modalOn} id={id} setShow={setModalOn} onHide={() => setModalOn(false)}>
        {" "}
      </DetailPageModal>
    </div>
  );
};

export default Detail;
