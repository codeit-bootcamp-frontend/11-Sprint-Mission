import React, { useState } from "react";
import { ReactComponent as Heart } from "../../../image/ic_heart.svg";

interface LikeButtonProps {
  productId: string;
  isFavorite: boolean;
  favoriteCount: number;
}

function LikeButton({ productId, isFavorite, favoriteCount }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [count, setCount] = useState(favoriteCount);

  const handleClick = () => {
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);
  };

  return (
    <button
      className={`heartButton ${isLiked ? "liked" : ""}`}
      onClick={handleClick}
    >
      <div className="buttonContent">
        <Heart
          className="heartIcon"
          width="24"
          height="24"
          stroke={isLiked ? "red" : "black"}
          strokeWidth="2"
          //fill="none" // 하트를 채우지 않음
        />
        <span className="favoriteCount">{count.toLocaleString()}</span>
      </div>
    </button>
  );
}

export default LikeButton;
