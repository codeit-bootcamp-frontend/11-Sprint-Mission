import React from "react";
import "../css/CardInfo.css";

const CardInfo = ({ children, imgSrc, altText, reverse }) => {
  return (
    <section className="card-section">
      <div className={`card-section__container ${reverse ? "reverse" : ""}`}>
        <div className="img">
          <img src={imgSrc} className="img-area" alt={altText} />
        </div>
        <div className="desc">{children}</div>
      </div>
    </section>
  );
};

export default CardInfo;
