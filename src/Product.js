import { useEffect, useState } from 'react';
import { getDetailItems, getItemCommit } from './service/api.js';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import './css/style.css';

import profileIcon from './assets/profile.png';
import favoriteIcon from './assets/detailfavoriteIcon.png';
import noImage from './assets/noImage.jfif';
import editIcon from './assets/edit.png';
import backArrow from './assets/backArrow.png';

const Container = styled.div`
  text-align: center;
  margin-top: 60px;
`;

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
  border: 1px solid #ddd;
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

const Comments = styled.textarea`
  width: 100%;
  height: 6.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 400;
  color: var(--gray-400);
  padding: 1rem 1.5rem;
  margin: 0;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentButton = styled.button`
  width: 4.625rem;
  height: 2.625rem;
  background-color: var(--blue);
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    background-color: var(--gray-400);
    cursor: auto;
  }
`;

const CommentEdit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  & > img {
    width: 1.8rem;
    height: 1.8rem;
    cursor: pointer;
  }
`;

const CommentContent = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--gray-800);
  margin-bottom: 1.5rem;
`;

const CommentWriter = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;

  & img {
    width: 32px;
    height: 32px;
  }
`;

const CommentUserName = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--gray-600);
  display: block;
`;

const CommentCreatedAt = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--gray-400);
  margin-top: 0.4rem;
  display: block;
`;

const PrevPageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevPageButton = styled(Link)`
  font-size: 1.125rem;
  font-weight: 600;
  width: 15rem;
  height: 3rem;
  background-color: var(--blue);
  color: var(--gray-100);
  border: none;
  border-radius: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 4rem;

  & img {
    position: relative;
    top: 2px;
  }
`;

function Product() {
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState(null);
  const { id } = useParams();
  const [commentValue, setCommentValue] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = now - date; // 시간 차이 (밀리초 단위)

    const secondsDiff = Math.floor(timeDiff / 1000); // 초 단위 차이
    const minutesDiff = Math.floor(secondsDiff / 60); // 분 단위 차이
    const hoursDiff = Math.floor(minutesDiff / 60); // 시간 단위 차이
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 일수 차이

    if (dayDiff < 1) {
      if (hoursDiff < 1) {
        return `${minutesDiff}분 전`; // 1시간 안이면 ~분 전으로 리턴
      }
      return `${hoursDiff}시간 전`; // 24시간 안이면 ~시간 전으로 리턴
    } else if (dayDiff < 7) {
      return `${dayDiff}일 전`; // 일주일 안이면 ~일 전으로 리턴
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('ko-KR', options);
    return formattedDate.endsWith('.')
      ? formattedDate.slice(0, -1)
      : formattedDate;
  };

  const handleInputValue = (e) => {
    setCommentValue(e.target.value.trim());
  };

  useEffect(() => {
    const contentLoad = async () => {
      try {
        setItem(await getDetailItems(id));
      } catch (error) {
        console.error('상품 목록 로드 중 오류 발생', error);
        throw new Error('상품 목록을 로드하는데 실패했습니다.');
      }
      try {
        const { list } = await getItemCommit(id);
        setComment(list);
      } catch (error) {
        console.error('댓글 목록 로드 중 오류 발생', error);
        throw new Error('댓글 목록을 로드하는데 실패했습니다.');
      }
    };
    contentLoad();
  }, [id]);

  return (
    <div>
      {item && (
        <ProductDiv>
          <ProductImage
            src={
              item.images.length > 0 &&
              !item.images[0].startsWith('https://example.com/...')
                ? item.images[0]
                : noImage
            }
            alt="상품 이미지"
          />
          <ProductInfo>
            <div>
              <ProductEdit>
                <ProductFirstTitle>{item.name}</ProductFirstTitle>
                <img src={editIcon} alt="게시글 수정" />
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
                <img src={profileIcon} alt="게시글 작성자 프로필" />
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
        </ProductDiv>
      )}
      {!item && <Container>상품을 로드하는 중입니다.</Container>}
      {comment && (
        <ProductDiv>
          <SectionLine />
          <ProductSecondTitle>문의하기</ProductSecondTitle>
          <CommentsContainer>
            <Comments
              onChange={handleInputValue}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            />
            <CommentButton type="submit" disabled={!commentValue}>
              등록
            </CommentButton>
          </CommentsContainer>
          {comment.map((com, index) => (
            <div key={index}>
              <CommentEdit>
                <CommentContent>{com.content}</CommentContent>
                <img src={editIcon} alt="댓글 수정" />
              </CommentEdit>
              <CommentWriter>
                <img
                  src={com.writer.image ? com.writer.image : profileIcon}
                  alt="댓글 작성자 프로필"
                />
                <div>
                  <CommentUserName>{com.writer.nickname}</CommentUserName>
                  <CommentCreatedAt>
                    {formatDate(com.createdAt)}
                  </CommentCreatedAt>
                </div>
              </CommentWriter>
              <SectionLine style={{ margin: 0 }} />
            </div>
          ))}
          <PrevPageDiv>
            <PrevPageButton to="/Items">
              목록으로 돌아가기
              <img src={backArrow} alt="목록으로 돌아가기" />
            </PrevPageButton>
          </PrevPageDiv>
        </ProductDiv>
      )}
      {!comment && <Container>댓글이 없습니다.</Container>}
    </div>
  );
}

export default Product;
