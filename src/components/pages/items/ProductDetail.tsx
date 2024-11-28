import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getProductById } from '@api/productsApi';
import {
  createComment,
  deleteCommentById,
  getCommentsByProductId,
} from '@api/commentsApi';
import Header from '@common/home/Header';
import AddItemTag from '../additem/AddItemTag';
import CommentBox from './CommentBox';
import './ProductDetail.css';

export interface Product {
  id: number;
  name: string;
  images?: string[];
  price?: number;
  favoriteCount: number;
  updatedAt: string;
  description?: string;
  tags?: string[];
  ownerNickname?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentInput, setNewCommentInput] = useState<string>('');

  const fetchComments = useCallback(async () => {
    try {
      const data = await getCommentsByProductId(Number(id));
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [id]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(Number(id));
        setProduct(data || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    }

    fetchProduct();
    fetchComments();
  }, [id, fetchComments]);

  const handleDelete = async (commentId: number) => {
    const success = await deleteCommentById(commentId);
    if (success) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } else {
      console.error('댓글 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <p>상품을 불러오는 중입니다...</p>;
  }

  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  const handleCreateComment = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await createComment(Number(id), newCommentInput);
      setNewCommentInput('');
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const getFormattedDate = (isoString: string): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}. ${month}. ${day}`;
  };

  return (
    <>
      <Header
        leftMenu={
          <>
            <Link to='/' className='menu-item free-board'>
              자유게시판
            </Link>
            <Link to='/items' className='menu-item secondhand-market'>
              중고마켓
            </Link>
          </>
        }
        rightMenu={
          <Link to='/mypage'>
            <img
              id='mypage'
              src='/images/icons/ic_mypage.svg'
              alt='마이페이지 아이콘'
            />
          </Link>
        }
      />
      <main className='product-detail-container'>
        <div className='product-detail-content'>
          <img
            className='product-detail-image'
            src={product.images?.[0] || '/images/default.png'}
            alt={product.name}
          />
          <div className='product-detail-info-wrapper'>
            <div className='product-detail-info'>
              <div className='product-detail-info-title'>
                <h1 className='product-detail-info-name'>{product.name}</h1>
                <p className='product-detail-info-price'>
                  {product.price
                    ? product.price.toLocaleString() + '원'
                    : '가격 정보 없음'}
                </p>
                <img
                  className='product-detail-info-kebab'
                  src='/images/icons/ic_kebab.svg'
                  alt='상품 게시글 추가 기능 아이콘'
                />
              </div>
              <div className='product-detail-info-description-wrapper'>
                <div className='product-detail-info-description'>
                  <p className='product-detail-info-caption'>상품 소개</p>
                  <p className='product-detail-info-description-text'>
                    {product.description || '상품 설명이 없습니다.'}
                  </p>
                </div>
                <div className='product-detail-info-tag'>
                  <p className='product-detail-info-caption'>상품 태그</p>
                  <AddItemTag tags={product.tags || []} />
                </div>
              </div>
              <div className='product-detail-seller'>
                <div className='seller-info'>
                  <img
                    className='seller-image'
                    src='/images/icons/ic_mypage.svg'
                    alt='판매자 이미지'
                  />
                  <div className='seller-wrapper'>
                    <p className='seller-nickname'>
                      {product.ownerNickname || '닉네임 없음'}
                    </p>
                    <p className='seller-updatedat'>
                      {getFormattedDate(product.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className='seller-favorite-wrapper'>
                  <img
                    className='seller-favorite-image'
                    src='/images/icons/ic_heart.svg'
                    alt='좋아요 이미지'
                  />
                  <p className='seller-favorite-count'>
                    {product.favoriteCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='product-detail-comments-container'>
          <div className='create-question'>
            <form className='create-question-form' action=''>
              <label className='create-question-label' htmlFor='question'>
                문의하기
              </label>
              <textarea
                className='create-question-textarea'
                placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
              />
              <button
                className='create-question-btn'
                disabled={!newCommentInput}
                onClick={handleCreateComment}
              >
                등록
              </button>
            </form>
          </div>
          <div className='product-detail-comments'>
            {comments.map((comment) => (
              <CommentBox
                key={comment.id}
                comment={comment}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <Link className='back-btn' to='/items'>
          목록으로 돌아가기
          <img
            className='back-btn-image'
            src='/images/icons/ic_back.svg'
            alt='목록 돌아가기 버튼'
          />
        </Link>
      </main>
    </>
  );
}

export default ProductDetail;
