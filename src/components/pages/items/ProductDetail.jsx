import { useParams, Link } from 'react-router-dom';
import Header from '../../common/home/Header';
import { useEffect, useState, useCallback } from 'react';
import { getProductById } from '../../../api/productsApi';
import './ProductDetail.css';
import AddItemTag from '../additem/AddItemTag';
import {
  createComment,
  deleteCommentById,
  getCommentsByProductId,
} from '../../../api/commentsApi';
import CommentBox from './CommentBox';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newCommentInput, setNewCommentInput] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const data = await getCommentsByProductId(id);
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [id]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    }

    fetchProduct();
    fetchComments();
  }, [id, fetchComments]);

  const handleDelete = async (commentId) => {
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

  const handleCreateComment = () => {
    try {
      createComment(id, newCommentInput);
    } catch (error) {
      console.log(error.massage);
    }
  };

  const getFormattedDate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}. ${month}. ${day}`;

    return formattedDate;
  };

  return (
    <>
      <Header
        leftMenu={
          <>
            <Link className='menu-item free-board'>자유게시판</Link>
            <Link className='menu-item secondhand-market'>중고마켓</Link>
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
            src={product.images[0]}
            alt={product.name}
          />
          <div className='product-detail-info-wrapper'>
            <div className='product-detail-info'>
              <div className='product-detail-info-title'>
                <h1 className='product-detail-info-name'>{product.name}</h1>
                <p className='product-detail-info-price'>
                  {product.price.toLocaleString()}원
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
                    {product.description}
                  </p>
                </div>
                <div className='product-detail-info-tag'>
                  <p className='product-detail-info-caption'>상품 태그</p>
                  <AddItemTag tags={product.tags} />
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
                    <p className='seller-nickname'>{product.ownerNickname}</p>
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
                type='text'
                placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
              />
              <button
                className='create-question-btn'
                disabled={newCommentInput ? false : true}
                onClick={handleCreateComment}
              >
                등록
              </button>
            </form>
          </div>
          <div className='product-detial-comments'>
            {comments.map((comment) => {
              return (
                <CommentBox
                  key={comment.id}
                  comment={comment}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
        <Link className='back-btn' to='/items'>
          목록으로 돌아가기
          <img className='back-btn-image' src='/images/icons/ic_back.svg' alt='목록 돌아가기 버튼' />
        </Link>
      </main>
    </>
  );
}

export default ProductDetail;
