import React from "react";
import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";

const IconSection = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${({ $fillColor }) => $fillColor || "white"};
    width: ${({ $size }) => ($size ? `${$size}px` : "auto")};
    height: ${({ $size }) => ($size ? `${$size}px` : "auto")};
  }
  svg path {
    stroke: ${({ $fillColor, $outlineColor }) => $fillColor === "white" ? "#6B7280" : $outlineColor || "currentColor"};
    stroke-width: ${({ $fillColor }) => ($fillColor === "white" ? "1.8px" : "0")};
  }
`;

// iconComponent: IconComponent 이름을 강제로 바꿈. 왜냐하면, 이름의 통일성을 주기 위해서
const Icon = ({ iconComponent: IconComponent, size, fillColor, outlineColor }) => (
  <IconSection $size={size} $fillColor={fillColor} $outlineColor={outlineColor}>
    <IconComponent />
  </IconSection>
);

// 좋아요 버튼 스타일
const HeartBtn = styled.button`
  color: #6B7280;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 2px solid #E5E7EB;
  &:hover svg path {
    fill: red;
    stroke: red;
  }
`;

const BtnSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
  gap: 4px;
`;

function LikeButton({ productId, isFavorite, favoriteCount }) {
  return (
    <HeartBtn>
      <BtnSection>
        <Icon
          iconComponent={HeartIcon}
          size={24}
          fillColor={isFavorite ? "red" : "white"}
        />
        {favoriteCount.toLocaleString()}
      </BtnSection>
    </HeartBtn>
  );
}

export default LikeButton;