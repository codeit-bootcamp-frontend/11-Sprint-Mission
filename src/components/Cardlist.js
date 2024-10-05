import React from "react";
import heart from "../images/heart.svg";
import { Link } from "react-router-dom";

const Cardlist = ({ productBestLists, width }) => {
  return (
    <>
      {productBestLists &&
        productBestLists.map((data) => (
          <Link key={data.id} className="card">
            <img
              src={data.images[0]}
              width={width}
              height={width}
              className="card-img"
              alt="대표사진"
            ></img>
            <div className="card-info">
              <div className="name">{data.name}</div>
              <div className="price">{data.price}</div>
              <div className="count">
                <img className="image-logo" src={heart} alt="즐겨찾기" />
                {data.favoriteCount}
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default Cardlist;
