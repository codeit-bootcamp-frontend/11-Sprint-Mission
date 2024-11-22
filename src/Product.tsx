import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { getDetailItems, getItemComment } from '@/service/api';
import { useParams, Link } from 'react-router-dom';
import styles from '@/css/product.module.css';

import '@/css/style.css';

import profileIcon from '@/assets/profile.png';
import favoriteIcon from '@/assets/detailfavoriteIcon.png';
import noImage from '@/assets/noImage.jfif';
import editIcon from '@/assets/edit.png';
import backArrow from '@/assets/backArrow.png';
import emptyImage from '@/assets/Img_inquiry_empty.png';

interface Comment {
  content: string;
  writer: {
    image?: string;
    nickname: string;
  };
  createdAt: string;
}

interface Item {
  name: string;
  price: number;
  description: string;
  tags: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
  images: string[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime(); // 시간 차이 (밀리초 단위)

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

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = date.toLocaleDateString('ko-KR', options);
  return formattedDate.endsWith('.')
    ? formattedDate.slice(0, -1)
    : formattedDate;
};

function Product() {
  const [item, setItem] = useState<Item | null>(null);
  const [comment, setComment] = useState<Comment[] | null>(null);
  const { id } = useParams<{ id: string }>();
  const [commentValue, setCommentValue] = useState<string>('');
  const [isDropdownView, setIsDropdownView] = useState<{
    product: HTMLElement | null;
    comments: (HTMLElement | null)[];
  }>({
    product: null,
    comments: [],
  });
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null
  );
  const [editingCommentValue, setEditingCommentValue] = useState<string>('');

  const handleInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value.trim());
  };

  function Dropdown({ onSelect }: { onSelect: (option: string) => void }) {
    const handleSelect = (option: string) => {
      onSelect(option);
    };

    return (
      <ul className={styles.dropdown__ul} ref={dropdownRef}>
        <li
          className={styles.dropdown__li}
          onClick={() => handleSelect('수정하기')}
        >
          수정하기
        </li>
        <li
          className={styles.dropdown__li}
          onClick={() => handleSelect('삭제하기')}
        >
          삭제하기
        </li>
      </ul>
    );
  }

  const handleDropdownView = (
    e: React.MouseEvent<HTMLElement>,
    type: 'product' | 'comment',
    index: number | null = null
  ) => {
    if (type === 'product') {
      setIsDropdownView({
        ...isDropdownView,
        product: e.target as HTMLElement,
      });
    } else if (type === 'comment') {
      const newDropdownView = [...isDropdownView.comments];
      if (index !== null) {
        newDropdownView[index] = e.target as HTMLElement;
      }
      setIsDropdownView({ ...isDropdownView, comments: newDropdownView });
    }
  };

  const handleSelectMenu = (option: string, index: number) => {
    if (option === '수정하기') {
      setEditingCommentIndex(index);
      setEditingCommentValue(comment![index].content);
      setIsDropdownView({ ...isDropdownView, comments: [] });
    } else if (option === '삭제하기') {
      const updatedComments = comment!.filter((_, i) => i !== index);
      setComment(updatedComments);
    }
    setIsDropdownView((prev) => ({
      ...prev,
      comments: prev.comments.map(() => null),
    }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownView({
        product: null,
        comments: [],
      });
    }
  };

  const handleClickEditButton = () => {
    const updatedComments = [...comment!];
    updatedComments[editingCommentIndex!] = {
      ...updatedComments[editingCommentIndex!],
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
    const loadContent = async () => {
      try {
        setItem(await getDetailItems(id));
      } catch (error) {
        console.error('상품 목록 로드 중 오류 발생', error);
        throw new Error('상품 목록을 로드하는데 실패했습니다.');
      }
      try {
        const { list } = await getItemComment(id);
        setComment(list);
      } catch (error) {
        console.error('댓글 목록 로드 중 오류 발생', error);
        throw new Error('댓글 목록을 로드하는데 실패했습니다.');
      }
    };
    loadContent();
  }, [id]);

  return (
    <div>
      {item && (
        <div className={styles.product}>
          <img
            className={styles.product__image}
            src={
              item.images.length > 0 &&
              !item.images[0].startsWith('https://example.com/...')
                ? item.images[0]
                : noImage
            }
            alt="상품 이미지"
          />
          <div className={styles.product__info}>
            <div>
              <div className={styles.product__info__edit}>
                <h1>{item.name}</h1>
                <div>
                  <img
                    src={editIcon}
                    alt="게시글 수정"
                    onClick={(e) => handleDropdownView(e, 'product')}
                  />
                  <div className={styles.dropdown}>
                    {isDropdownView.product && (
                      <Dropdown
                        onSelect={() =>
                          console.log(
                            '게시글 수정 / 삭제 -> 로그인 기능 구현 후 작업'
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <span className={styles.product__info__price}>{`${Number(
                item.price
              ).toLocaleString()}원`}</span>
              <div className={styles.product__info__line} />
              <h2>상품 소개</h2>
              <div className={styles.product__info__description}>
                {item.description}
              </div>
              <h2>상품 태그</h2>
              {item.tags.map((tag, index) => (
                <span className={styles.product__info__tag} key={index}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className={styles.product__utils}>
              <div className={styles.product__utils__userinfo}>
                <img src={profileIcon} alt="게시글 작성자 프로필" />
                <div>
                  <span>{item.ownerNickname}</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
              <div className={styles.product__utils__favorite}>
                <div className={styles.product__utils__line} />
                <div className={styles.product__utils__favorite__count}>
                  <img src={favoriteIcon} alt="좋아요" />
                  <span>{item.favoriteCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!item && <div className={styles.empty}>상품을 로드하는 중입니다.</div>}
      {comment && (
        <div className={styles.product}>
          <div className={styles.product__line} />
          <h2>문의하기</h2>
          <div className={styles.comment}>
            <textarea
              className={styles.comment__content}
              onChange={handleInputValue}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            />
            <button
              className={styles.comment__button}
              type="submit"
              onClick={() =>
                console.log('댓글 등록 -> 로그인 기능 구현 후 작업')
              }
              disabled={!commentValue}
            >
              등록
            </button>
          </div>
          {comment.map((com, index) => (
            <div key={index}>
              {editingCommentIndex === index ? (
                <>
                  <textarea
                    className={styles.comment__content}
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
                    <div
                      className={styles.comment__writer}
                      style={{ margin: 0 }}
                    >
                      <img
                        src={com.writer.image ? com.writer.image : profileIcon}
                        alt="댓글 작성자 프로필"
                      />
                      <div>
                        <span className={styles.comment__writer__username}>
                          {com.writer.nickname}
                        </span>
                        <span className={styles.comment__writer__createdAt}>
                          {formatDate(com.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={styles.comment__button}
                        style={{
                          backgroundColor: '#fff',
                          color: 'var(--gray-500)',
                          margin: '0 1rem',
                        }}
                        onClick={handleClickCancelButton}
                      >
                        취소
                      </button>
                      <button
                        className={styles.comment__button}
                        style={{ width: '106px', margin: 0 }}
                        type="button"
                        onClick={handleClickEditButton}
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.comment__edit}>
                    <p className={styles.comment__edit__content}>
                      {com.content}
                    </p>
                    <img
                      src={editIcon}
                      alt="댓글 수정"
                      onClick={(e) => handleDropdownView(e, 'comment', index)}
                    />
                    <div
                      className={styles.dropdown}
                      style={{ marginTop: '1.5rem' }}
                    >
                      {isDropdownView.comments[index] && (
                        <Dropdown
                          onSelect={(option) => handleSelectMenu(option, index)}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.comment__writer}>
                    <img
                      src={com.writer.image ? com.writer.image : profileIcon}
                      alt="댓글 작성자 프로필"
                    />
                    <div>
                      <span className={styles.comment__writer__username}>
                        {com.writer.nickname}
                      </span>
                      <span className={styles.comment__writer__createdAt}>
                        {formatDate(com.createdAt)}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className={styles.product__line} style={{ margin: 0 }} />
            </div>
          ))}

          {comment.length === 0 && (
            <div className={styles.comment__empty}>
              <img src={emptyImage} alt="문의없음" /> 아직 문의가 없어요.
            </div>
          )}
          <div className={styles.prevPage}>
            <Link className={styles.prevPage__button} to="/Items">
              목록으로 돌아가기
              <img src={backArrow} alt="목록으로 돌아가기" />
            </Link>
          </div>
        </div>
      )}
      {!comment && <div className={styles.empty}>댓글 로드 중입니다.</div>}
    </div>
  );
}

export default Product;
