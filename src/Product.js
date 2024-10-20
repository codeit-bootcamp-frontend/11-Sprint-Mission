import { useEffect, useState, useRef } from 'react';
import { getDetailItems, getItemCommit } from './service/api.js';
import { useParams, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import './css/style.css';

import profileIcon from './assets/profile.png';
import favoriteIcon from './assets/detailfavoriteIcon.png';
import noImage from './assets/noImage.jfif';
import editIcon from './assets/edit.png';
import backArrow from './assets/backArrow.png';
import emptyImage from './assets/Img_inquiry_empty.png';

const DetailPage = createGlobalStyle`
  html {
    font-size: 16px;

    @media (max-width: 1200px) {
      font-size: 14px;
    }
  }
`;

const Container = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const ProductDiv = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    margin: 40px auto;
    max-width: 340px;
  }
`;

const ProductImage = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 16px;
  float: left;
  margin-right: 36px;
  border: 1px solid #ddd;

  @media (max-width: 1200px) {
    width: 340px;
    height: 340px;
  }

  @media (max-width: 768px) {
    float: none;
  }
`;

const ProductInfo = styled.div`
  height: 486px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1200px) {
    height: 340px;
  }

  @media (max-width: 768px) {
    height: 360px;
    margin-top: 2rem;
  }
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

  @media (max-width: 1200px) {
    width: 100%;
  }
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
  margin-bottom: 8px;
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

const ProductFavoriteDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductFavoriteLine = styled.div`
  height: 30px;
  border-left: 1px solid var(--gray-200);
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
  width: inherit;
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
  font-size: 1rem;
  font-weight: 600;
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

const CommentEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 196px;
    height: 196px;
  }
`;

const DropdownDiv = styled.div`
  position: absolute;
  right: 0;
`;

const DropdownUl = styled.ul`
  width: 8.75rem;
  height: 5.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  padding: 0;
`;

const DropdownLi = styled.li`
  width: inherit;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    border-bottom: 1px solid var(--gray-300);
  }
`;

function Product() {
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState(null);
  const { id } = useParams();
  const [commentValue, setCommentValue] = useState('');
  const [isDropdownView, setIsDropdownView] = useState({
    product: null,
    comments: [],
  });
  const dropdownRef = useRef();
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentValue, setEditingCommentValue] = useState('');

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

  function Dropdown({ onSelect }) {
    const handleSelect = (option) => {
      onSelect(option);
    };

    return (
      <DropdownUl ref={dropdownRef}>
        <DropdownLi onClick={() => handleSelect('수정하기')}>
          수정하기
        </DropdownLi>
        <DropdownLi onClick={() => handleSelect('삭제하기')}>
          삭제하기
        </DropdownLi>
      </DropdownUl>
    );
  }

  const handleDropdownView = (e, type, index = null) => {
    if (type === 'product') {
      setIsDropdownView({ ...isDropdownView, product: e.target });
    } else if (type === 'comment') {
      const newDropdownView = [...isDropdownView.comments];
      newDropdownView[index] = e.target;
      setIsDropdownView({ ...isDropdownView, comments: newDropdownView });
    }
  };

  const handleSelectMenu = (option, index) => {
    if (option === '수정하기') {
      setEditingCommentIndex(index);
      setEditingCommentValue(comment[index].content);
      setIsDropdownView({ ...isDropdownView, comments: [] });
    } else if (option === '삭제하기') {
      const updatedComments = comment.filter((_, i) => i !== index);
      setComment(updatedComments);
    }
    setIsDropdownView((prev) => ({
      ...prev,
      comments: prev.comments.map(() => null),
    }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownView({
        product: null,
        comments: [],
      });
    }
  };

  const handleClickButton = () => {
    const updatedComments = [...comment];
    updatedComments[editingCommentIndex] = {
      ...updatedComments[editingCommentIndex],
      content: editingCommentValue,
    };
    setComment(updatedComments);
    setEditingCommentIndex(null);
    setEditingCommentValue('');
  };

  const handleClickCancelButton = () => {
    setEditingCommentIndex(null);
    setEditingCommentValue('');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownView]);

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
      <DetailPage />
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
                <div>
                  <img
                    src={editIcon}
                    alt="게시글 수정"
                    onClick={(e) => handleDropdownView(e, 'product')}
                  />
                  <DropdownDiv>
                    {isDropdownView.product && (
                      <Dropdown
                        onSelect={() =>
                          console.log(
                            '게시글 수정 / 삭제 -> 로그인 기능 구현 후 작업'
                          )
                        }
                      />
                    )}
                  </DropdownDiv>
                </div>
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
              <ProductFavoriteDiv>
                <ProductFavoriteLine />
                <ProductFavorite>
                  <img src={favoriteIcon} alt="좋아요" />
                  <span>{item.favoriteCount}</span>
                </ProductFavorite>
              </ProductFavoriteDiv>
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
            <CommentButton
              type="submit"
              onClick={() =>
                console.log('댓글 등록 -> 로그인 기능 구현 후 작업')
              }
              disabled={!commentValue}
            >
              등록
            </CommentButton>
          </CommentsContainer>
          {comment.map((com, index) => (
            <div key={index}>
              {editingCommentIndex === index ? (
                <>
                  <Comments
                    value={editingCommentValue}
                    onChange={(e) => setEditingCommentValue(e.target.value)}
                    style={{ marginTop: '1.5rem' }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: '1rem 0 1.5rem',
                    }}
                  >
                    <CommentWriter style={{ margin: 0 }}>
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
                    <div>
                      <CommentButton
                        style={{
                          backgroundColor: '#fff',
                          color: 'var(--gray-500)',
                          margin: '0 1rem',
                        }}
                        onClick={handleClickCancelButton}
                      >
                        취소
                      </CommentButton>
                      <CommentButton
                        style={{ width: '106px', margin: 0 }}
                        type="button"
                        onClick={handleClickButton}
                      >
                        수정 완료
                      </CommentButton>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <CommentEdit>
                    <CommentContent>{com.content}</CommentContent>
                    <img
                      src={editIcon}
                      alt="댓글 수정"
                      onClick={(e) => handleDropdownView(e, 'comment', index)}
                    />
                    <DropdownDiv style={{ marginTop: '1.5rem' }}>
                      {isDropdownView.comments[index] && (
                        <Dropdown
                          onSelect={(option) => handleSelectMenu(option, index)}
                        />
                      )}
                    </DropdownDiv>
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
                </>
              )}
              <SectionLine style={{ margin: 0 }} />
            </div>
          ))}

          {comment && comment.length === 0 && (
            <CommentEmpty>
              <img src={emptyImage} alt="문의없음" /> 아직 문의가 없어요.
            </CommentEmpty>
          )}
          <PrevPageDiv>
            <PrevPageButton to="/Items">
              목록으로 돌아가기
              <img src={backArrow} alt="목록으로 돌아가기" />
            </PrevPageButton>
          </PrevPageDiv>
        </ProductDiv>
      )}
      {!comment && <Container>댓글 로드 중입니다.</Container>}
    </div>
  );
}

export default Product;
