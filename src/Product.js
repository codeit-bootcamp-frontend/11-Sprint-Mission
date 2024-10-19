import { useEffect, useState } from 'react';
import { getDetailItems } from './service/api.js';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import './css/style.css';

import profileIcon from './assets/profile.png';
import favoriteIcon from './assets/detailfavoriteIcon.png';
import noImage from './assets/noImage.jfif';
import editIcon from './assets/edit.png';

const ProductDiv = styled.div`
  max-width: 1200px;
  margin: 60px auto;
`;

const ProductImage = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 16px;
  float: left;
  margin-right: 36px;
`;

const ProductInfo = styled.div`
  height: 486px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductEdit = styled.div`
  display: flex;
  justify-content: space-between;

  & > img {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
  }
`;

const ProductFirstTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-800);
  margin: 0;
`;

const ProductPrice = styled.span`
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--gray-800);
  display: inline-block;
  margin: 1rem auto;
`;

const ProductLine = styled.div`
  width: 678px;
  float: right;
  border-bottom: 1px solid var(--gray-200);
`;

const ProductSecondTitle = styled.h2`
  font-weight: 600;
  color: var(--gray-600);
  margin: 1.5rem 0 1rem;
`;

const ProductDescription = styled.div`
  font-weight: 400;
  color: var(--gray-600);
  display: flex;
  width: 678px;
  overflow-wrap: break-word;
`;

const ProductTag = styled.span`
  font-weight: 400;
  color: var(--gray-800);
  background-color: var(--gray-100);
  border-radius: 26px;
  padding: 0.375rem 1rem;
  margin-right: 8px;
  display: inline-flex;
`;

const ProfileUserInfo = styled.div`
  font-size: 0.875rem;
  font-weight: 500;

  & > div {
    display: inline-block;
  }

  & > img {
    float: left;
    margin-right: 1rem;
  }

  & span {
    display: block;
  }

  & span:first-child {
    color: var(--gray-600);
    margin-bottom: 0.5rem;
  }
  & span:last-child {
    color: var(--gray-400);
  }
`;

const ProductFavorite = styled.div`
  font-weight: 500;
  color: var(--gray-500);
  width: fit-content;
  height: 2.5rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: 35px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const ProductUtils = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 678px;
`;

const SectionLine = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--gray-200);
  margin: 40px 0;
`;

function Product() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ko-KR', options);

    return formattedDate.endsWith('.')
      ? formattedDate.slice(0, -1)
      : formattedDate;
  };

  useEffect(() => {
    const contentLoad = async () => {
      try {
        setItem(await getDetailItems(id));
      } catch (error) {
        console.error('상품 목록 로드 중 오류 발생', error);
        throw new Error('상품 목록을 로드하는데 실패했습니다.');
      }
    };
    contentLoad();
  }, [id]);

  return (
    <div>
      {item && (
        <div>
          <ProductDiv>
            <ProductImage
              src={item.images.length > 0 ? item.images[0] : noImage}
              alt="상품 이미지"
            />
            <ProductInfo>
              <div>
                <ProductEdit>
                  <ProductFirstTitle>{item.name}</ProductFirstTitle>
                  <img src={editIcon} alt="글 수정" />
                </ProductEdit>
                <ProductPrice>{`${Number(
                  item.price
                ).toLocaleString()}원`}</ProductPrice>
                <ProductLine />
                <ProductSecondTitle>상품 소개</ProductSecondTitle>
                <ProductDescription>{item.description}</ProductDescription>
                <ProductSecondTitle>상품 태그</ProductSecondTitle>
                {item.tags.map((tag, index) => (
                  <ProductTag key={index}>#{tag}</ProductTag>
                ))}
              </div>
              <ProductUtils>
                <ProfileUserInfo>
                  <img src={profileIcon} alt="프로필" />
                  <div>
                    <span>{item.ownerNickname}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </ProfileUserInfo>
                <ProductFavorite>
                  <img src={favoriteIcon} alt="좋아요" />
                  <span>{item.favoriteCount}</span>
                </ProductFavorite>
              </ProductUtils>
            </ProductInfo>
            <SectionLine />
          </ProductDiv>
        </div>
      )}
      {!item && '상품을 로드하는 중입니다.'}
    </div>
  );
}

export default Product;
