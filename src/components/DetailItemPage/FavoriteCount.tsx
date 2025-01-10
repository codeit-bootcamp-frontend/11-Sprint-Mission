import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import heartIcon from "../../assets/images/heartIcon.svg";
import heartIconRed from "../../assets/images/heartIconRed.svg";
import { deleteFavorite, postFavorite } from "../../api/posts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface FavoriteCountProps {
  count: number;
}

const FavoriteCount = ({ count }: FavoriteCountProps) => {
  const [currentCount, setCurrentCount] = useState(count);
  const productDetail = useSelector((state: RootState) => state.productInfo);
  const [clickFavorite, setClickFavorite] = useState(productDetail.isFavorite);

  const postMutation = useMutation({
    mutationFn: () => postFavorite(productDetail.id),
    onSuccess: () => {
      toast.success("상품 좋아요가 완료되었습니다.");
      setClickFavorite(true);
      setCurrentCount((prev) => prev + 1);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("상품 좋아요가 실패했습니다. 다시 시도해주세요");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteFavorite(productDetail.id),
    onSuccess: () => {
      toast.success("상품 좋아요를 취소했습니다.");
      setClickFavorite(false);
      setCurrentCount((prev) => prev - 1);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("상품 좋아요 취소에 실패했습니다. 다시 시도해주세요");
      }
    },
  });

  const handleFavoriteToggle = () => {
    if (clickFavorite) {
      deleteMutation.mutate();
    } else {
      postMutation.mutate();
    }
  };

  return (
    <div className="favoriteCount-container">
      <div className="favoriteCount-box" onClick={handleFavoriteToggle}>
        <img
          className="favoriteCount-image"
          src={clickFavorite ? heartIconRed : heartIcon}
          alt="좋아요 하트 모양"
        />
        <p className="favoriteCount">{currentCount}</p>
      </div>
    </div>
  );
};

export default FavoriteCount;
