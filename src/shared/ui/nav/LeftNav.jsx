import React from "react";
import logo from "../../assets/logo.svg";
import logoText from "../../assets/logoText.svg";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="flex flex-row gap-x-2 p-2 md:gap-6">
      <div className="flex flex-row items-center gap-x-2">
        <Link to="/">
          <img className="hidden sm:block" src={logo} alt="로고 이미지" />
          <img src={logoText} alt="판다마켓"></img>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-x-1 sm:gap-x-3 ">
        <div>자유게시판</div>
        <Link to="/items">
          <div>중고마켓</div>
        </Link>
      </div>
    </div>
  );
};

export default LeftNav;
