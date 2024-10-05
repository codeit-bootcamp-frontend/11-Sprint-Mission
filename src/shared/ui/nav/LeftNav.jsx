import React from "react";
import logo from "../../assets/logo.svg";
import logoText from "../../assets/logoText.svg";

const LeftNav = () => {
  return (
    <div className="flex flex-row gap-x-2 p-2 md:gap-6">
      <div className="flex flex-row items-center gap-x-2">
        <img src={logo} alt="로고 이미지" />
        <img src={logoText} alt="판다마켓" className="hidden md:block"></img>
      </div>
      <div className="flex flex-row items-center gap-x-3 ">
        <div>자유게시판</div>
        <div>중고마켓</div>
      </div>
    </div>
  );
};

export default LeftNav;
