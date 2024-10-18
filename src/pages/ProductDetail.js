import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetail, getProductDetailComment } from '../hooks/api';
import iconHeart from '../assets/ic_heart.svg';
import defaultImg from '../assets/img_default.svg';
import frame from '../assets/Frame.svg';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); //상품상세정보
  const [comments, setComments] = useState([]); //상품댓글

  //상품상세정보불러오기
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await getProductDetail(productId);
        setProduct(productDetail);
      } catch (error) {
        console.error('상품 상세 정보를 불러오는 중 오류 발생:', error.message);
      }
    };
    fetchProductDetail();
  }, [productId]);

  //상품댓글불러오기
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const productComment = await getProductDetailComment(productId);
        setComments(productComment);
      } catch (error) {
        console.error('댓글 정보를 불러오는 중 오류 발생', error.message);
      }
    };
    fetchComment();
  }, [productId]);

  //비동기로product가null일때발생하는오류방지
  if (!product) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  //이미지가없을경우대체이미지설정
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : defaultImg;

  return (
    <div className="productDetail">
      <div className="productDetailContent">
        <img src={imageSrc} alt={product.name} className="PDProductImg" />
        <div className="productDetailtext">
          <div>
            <p className="productDetailName">{product.name}</p>
            <p className="productDetailPrice">{product.price}원</p>
          </div>
          <div className="dddddd">
            <div>
              <p className="pdSubTitle">상품 소개</p>
              <p className="productDetailDescription">{product.description}</p>
            </div>
            <div>
              <p className="pdSubTitle">상품 태그</p>
              <div className="productDetailTags">
                {product.tags.map((tag, index) => (
                  <p key={index} className="tagItem">
                    #{tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="bbbbbb">
            <div className="pdSubfooter">
              <img src={frame} className="frameImg" />
              <div>
                <p className="productDetailNickname">{product.ownerNickname}</p>
                <p className="productDetailUpdateAt">{product.updatedAt}</p>
              </div>
            </div>
            <p className="productDetailIsFavorite">
              <img src={iconHeart} />
              {product.favoriteCount}
            </p>
          </div>
        </div>
      </div>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>작성자: {comment.nickname}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
}

export default ProductDetail;
