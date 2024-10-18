import styled from "styled-components";
import loveIcon from "../images/itemIcon/love_Icon.png";
import myPageIcon from "../images/head/myPageIcon.png";
function OwnerFlexBox({ itemDetail }) {
  return (
    <OwnerFlexbox>
      <OwenerId key={itemDetail.ownerId}>
        <img src={myPageIcon} alt="마이페이지아이콘" />
        <div>
          <OwnerNickname>{itemDetail.ownerNickname}</OwnerNickname>
          <CreatedAt>
            {new Date(itemDetail.createdAt).toLocaleString()}
          </CreatedAt>
        </div>
      </OwenerId>
      <OwenerLine></OwenerLine>
      <ItemLoveBox>
        <LoveImgWrap>
          <LoveImg src={loveIcon} alt="좋아요아이콘"></LoveImg>
        </LoveImgWrap>
        <FavoriteCount>{itemDetail.favoriteCount}</FavoriteCount>
      </ItemLoveBox>
    </OwnerFlexbox>
  );
}
const OwnerFlexbox = styled.div`
  display: flex;
`;
const OwenerId = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;
const OwnerNickname = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray600);
`;
const CreatedAt = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--gray400);
`;
const OwenerLine = styled.div`
  width: 1px;
  background-color: var(--gray200);
  margin-right: 24px;
`;
const ItemLoveBox = styled.div`
  width: 87px;
  height: 40px;
  background-color: var(--white);
  border: 1px solid var(--gray200);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const FavoriteCount = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: var(--gray500);
`;
const LoveImg = styled.img`
  width: 100%;
  transform: translateY(2px);
`;
const LoveImgWrap = styled.div`
  max-width: 28px;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
`;
export default OwnerFlexBox;
