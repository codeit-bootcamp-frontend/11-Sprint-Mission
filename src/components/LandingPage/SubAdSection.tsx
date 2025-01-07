import React from "react";
import "./SubAdSection.css";
import bottomAd from "../../assets/image/Img_home_bottom.png";

function SubAdSection() {
  return (
    <section className="sub-ad">
      <div className="sub-ad-box">
        <div className="sub-ad-content">
          <h2 className="sub-ad-head">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
        </div>
        <div className="sub-ad-image">
          <img src={bottomAd} alt="메인 광고-2" />
        </div>
      </div>
    </section>
  );
}

export default SubAdSection;
