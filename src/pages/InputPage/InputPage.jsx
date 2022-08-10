import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import InputPageModal from "../../components/inputpagemodal/InputPageModal";
import { addMoviesThunk } from "../../redux/modules/movieSlice";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import shortId from "shortid";
import "./inputPage.scss";

const InputPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const shortid = shortId.generate();
  const initialState = {
    userid: "",
    title: "",
    body: "",
    img: "",
  };

  const [moviePosting, setMoviePosting] = useState(initialState);

  let onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMoviePosting({ ...moviePosting, [name]: value, id: shortid });
  };

  let onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      moviePosting.userid === "" ||
      moviePosting.title === "" ||
      moviePosting.body === "" ||
      moviePosting.img === ""
    ) {
      alert("내용을 모두 채워주세요!!");
    } else {
      dispatch(addMoviesThunk(moviePosting));
      setMoviePosting(initialState);
      alert("정상적으로 등록 되었습니다.");
      navigate("/");
    }
  };
  //   console.log(search);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="inputWrap">
      <div className="inputcontainer">
        <FaTimes className="faArrowLeft" onClick={() => navigate("/")} />
        <div className="inputbox">
          <div className="imgcontainer">
            <div className="imgbox">
              {/* 유효성 검사/*/}
              {moviePosting.img === undefined || moviePosting.img === "" ? (
                <div className="noneimg" onClick={handleShow}>
                  +
                </div>
              ) : (
                <img
                  id="simg"
                  onClick={handleShow}
                  className="imgtool"
                  src={moviePosting.img}
                />
              )}
            </div>
            <span className="searchBox">
              {show ? (
                <Modal show={show} onHide={handleClose} className="searchModal">
                  <InputPageModal
                    moviePosting={moviePosting}
                    setShow={setShow}
                    setMoviePosting={setMoviePosting}
                    handleClose={handleClose}
                    onChangeHandler={onChangeHandler}
                  />
                </Modal>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="formbox">
            <input
              type="text"
              name="userid"
              value={moviePosting.userid}
              placeholder="사용자ID"
              onChange={onChangeHandler}
            />

            <input
              type="text"
              name="title"
              value={moviePosting.title}
              placeholder="제목"
              onChange={onChangeHandler}
            />

            <textarea
              type="text"
              name="body"
              value={moviePosting.body}
              placeholder="내용"
              onChange={onChangeHandler}
              className="inputBody"
            ></textarea>
            <button className="addButton" onClick={onSubmitHandler}>
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
