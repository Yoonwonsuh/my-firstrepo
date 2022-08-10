import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { editMovieThunk } from "../../redux/modules/targetMovieSlice";
import "./DetailPageModal.scss";

const DetailPageModal = ({ show, onHide, setShow, id }) => {
  const dispatch = useDispatch();
  const initialState = {
    id: 0,
    body: "",
  };

  let [edit_Body, setEditBody] = useState(initialState);

  let inputeditBody = (e) => {
    const { name, value } = e.target;
    setEditBody({ ...edit_Body, [name]: value, id: id });
  };

  let onSubmitHandler = (event) => {
    if (edit_Body.body === "") {
      event.preventDefault();
      alert("내용을 모두 채워주세요!!");
    } else {
      event.preventDefault();
      dispatch(editMovieThunk(edit_Body));
      console.log(edit_Body);
      setEditBody(initialState);
      alert("정상적으로 등록 되었습니다.");
      setShow(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modalBox">
        <FaTimes className="faArrowLeft" onClick={onHide} />
        <div className="editWrap">
          <input
            className="editBody"
            name="body"
            value={edit_Body.body}
            type="text"
            placeholder="내용을 입력해주세요"
            onChange={inputeditBody}
          ></input>
          <button onClick={onSubmitHandler} className="edit_done_btn">
            수정완료
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailPageModal;
