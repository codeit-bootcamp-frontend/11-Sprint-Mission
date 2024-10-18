import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailProducts } from "../api/api";
import styled from "styled-components";
import DetailTop from "../components/DetailTop";
import OwnerFlexBox from "../components/OwnerFlexBox";
import DetailContact from "../components/DetailContact";
import { Helmet } from "react-helmet";

function DetailItem() {
  const { productId } = useParams();
  const [itemDetail, setItemDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailProducts(productId);
        setItemDetail(data);
      } catch (error) {
        console.error("상품 상세 데이터 로딩 실패:", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!itemDetail) {
    return <div>로딩 중...</div>;
  }
  return (
    <>
      <Helmet>
        <title>상품 상세 페이지</title>
      </Helmet>
      <DetailCon>
        <DetailFlexAll>
          <DetailImgWrap>
            <DetailImg
              src={itemDetail.images[0]}
              alt={itemDetail.name}
            ></DetailImg>
          </DetailImgWrap>
          <DetailTxtWrap>
            <DetailTop itemDetail={itemDetail} />
            <DetailPrice>{itemDetail.price.toLocaleString()}원</DetailPrice>
            <DetailTxtLine></DetailTxtLine>
            <DetailSubTxt>상품 소개</DetailSubTxt>
            <ItemsDescript>{itemDetail.description}</ItemsDescript>
            <DetailSubTxt>상품 태그</DetailSubTxt>
            <ItemsTags>
              {itemDetail.tags.map((tag, index) => (
                <TagObject key={index}>#{tag}</TagObject>
              ))}
            </ItemsTags>
            <OwnerFlexBox itemDetail={itemDetail} />
          </DetailTxtWrap>
        </DetailFlexAll>
        <DetailBottomLine></DetailBottomLine>
        <DetailContact />
      </DetailCon>
    </>
  );
}
const DetailFlexAll = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  gap: 20px;
`;
const DetailCon = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
const DetailImgWrap = styled.div`
  max-width: 486px;
  width: 100%;
`;

const DetailImg = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
  border-radius: 16px;
`;
const DetailTxtWrap = styled.div`
  display: block;
  width: 100%;
`;
const DetailPrice = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--gray800);
  margin-top: 16px;
  margin-bottom: 16px;
`;
const DetailTxtLine = styled.div`
  width: 100%;
  border: 1px solid var(--gray200);
`;
const DetailSubTxt = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray600);
  margin-top: 24px;
  margin-bottom: 16px;
`;
const ItemsDescript = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray600);
`;
const ItemsTags = styled.p`
  display: flex;
  gap: 8px;
  margin-bottom: 62px;
`;
const TagObject = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray800);
  padding: 5px 16px;
  border-radius: 26px;
  background-color: var(--gray100);
`;
const DetailBottomLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray200);
  margin-top: 40px;
  margin-bottom: 40px;
`;

export default DetailItem;
