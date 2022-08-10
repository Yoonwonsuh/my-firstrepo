import React, { useState, useRef, useEffect } from "react";
import logo from "../../images/logo.png";
import { FaBars, FaGithub, FaBook } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const el = useRef();
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="header">
      <FaBars
        onClick={() => {
          setShow((show) => !show);
        }}
        className="headerbar"
      />
      <img
        className="logo"
        onClick={() => navigate("/")}
        src={logo}
        alt="logo"
      />
      <div className="headerModal">
        <Modal show={show} onHide={handleClose}>
          <div className="headerlistvarbox">
            <FaBars
              onClick={() => {
                setShow((show) => !show);
              }}
              className="headerbar"
            />
            <a
              className="aboutus"
              href="https://www.notion.so/eun-ng/1-9efa2b71a86146eb9835af44785fce13"
            >
              <FaBook className="FaBook" />
              &nbsp;&nbsp;Notion 바로가기
            </a>
            <a
              className="postingus"
              href="https://github.com/GinaEunK/React_team_project_b1"
            >
              <FaGithub className="FaGithub" />
              &nbsp;&nbsp;Github 바로가기
            </a>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
