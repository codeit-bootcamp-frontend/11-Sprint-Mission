import React from "react";
import "../css/NavBar.css";

const NavBar = () => {
  return (
    <section className="Nav">
      <div className="Nav-first-section">
        <div className="Nav-logo-box"></div>
        <div className="Nav-menu-box">
          <p className="menu-free">자유게시판</p>
          <p className="menu-used">중고마켓</p>
        </div>
      </div>
      <div>
        <img src="/assets/size=large.png" alt="사용자 프로필 이미지" />
      </div>
    </section>
  );
};

export default NavBar;
