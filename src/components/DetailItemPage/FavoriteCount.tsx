import React from "react";
import heart from "../../assets/image/Icon (2).png";

interface FavoriteCountProps {
  count: number;
}

const FavoriteCount = ({ count }: FavoriteCountProps) => {
  return (
    <div className="favoriteCount-container">
      <div className="favoriteCount-box">
        <img
          className="favoriteCount-image"
          src={heart}
          alt="좋아요 하트 모양"
        />
        <p className="favoriteCount">{count}</p>
      </div>
    </div>
  );
};

export default FavoriteCount;
