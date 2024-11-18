import React from "react";
import "../css/Banner.css";
import { Link } from "react-router-dom";

const Banner = ({ title, buttonText, buttonLink, imageUrl }) => {
  const backgroundImage = `url(${imageUrl})`;
  const titleLines = title.split("\\n");

  console.log(titleLines);
  return (
    <div className="banner">
      <div className="banner-container">
        <div className="banner-content">
          <h2>
            {titleLines.map((line, index) => (
              <span key={index}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          {buttonLink && (
            <Link to={buttonLink} className="btn btn-primary-round">
              {buttonText}
            </Link>
          )}
        </div>
        {imageUrl && (
          <div className="banner-image" style={{ backgroundImage }}></div>
        )}
      </div>
    </div>
  );
};

export default Banner;
