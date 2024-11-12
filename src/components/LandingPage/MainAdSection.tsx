import React from "react";
import { Link } from "react-router-dom";
import "./MainAdSection.css";
import mainAd from "../../assets/image/Img_home_top.png";

function MainAdSection() {
  return (
    <section className="main-ad">
      <div className="main-ad-box">
        <div className="main-ad-content">
          <h1 className="main-ad-head">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>
          <Link to="/items" className="main-link">
            <button className="main-ad-link button main-ad-button">
              구경하러 가기
            </button>
          </Link>
        </div>
        <div className="main-ad-image">
          <img src={mainAd} alt="메인 광고-1" />
        </div>
      </div>
    </section>
  );
}

export default MainAdSection;
