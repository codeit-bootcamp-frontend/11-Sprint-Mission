import React from "react";
import heart from "../images/icon/heart.svg";
import { Link } from "react-router-dom";
import "./css/Cardlist.css";

const Cardlist = ({ productLists, width }) => {
  return (
    <>
      {productLists &&
        productLists.map((data) => (
          <div key={data.id} className="product-card">
            <Link className="card" to={`${data.id}`}>
              <img
                src={data.images[0]}
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
          </div>
        ))}
    </>
  );
};

export default Cardlist;
