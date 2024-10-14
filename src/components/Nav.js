import React from "react";
import { Link } from "react-router-dom";
import myprofile from "../images/icon/myprofile.svg";
import "./Nav.css";

const Nav = () => {
  return (
    <header>
      <div className="main-header">
        <div className="main-header-left">
          <Link to="">
            <img
              className="image-logo"
              src={require("../images/logo_image.png")}
              alt="판다마켓로고"
            />
          </Link>
          <div className="main-nav">
            <nav>
              <ul>
                <li className="main-nav-li">
                  <Link className="nav-li" to="/items">
                    자유게시판
                  </Link>
                </li>
                <li className="main-nav-li">
                  <Link className="nav-li" to="/items">
                    중고마켓
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <img alt="" src={myprofile} width={"40px"} height={"40px"} />
      </div>
    </header>
  );
};

export default Nav;
