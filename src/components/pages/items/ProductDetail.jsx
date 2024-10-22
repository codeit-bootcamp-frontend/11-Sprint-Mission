import { useParams, Link } from 'react-router-dom';
import Header from '../../common/home/Header';
import { useEffect, useState } from 'react';
import { getProductById } from '../../../api/items/productsApi';
import './ProductDetail.css';
import AddItemTag from '../additem/AddItemTag';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // 없으면 아래에서 null값을 참조하게 되어 바로 Error 발생
  if (loading) {
    return <p>상품을 불러오는 중입니다...</p>;
  }

  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

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
            <Link className="menu-item free-board">자유게시판</Link>
            <Link className="menu-item secondhand-market">중고마켓</Link>
          </>
        }
        rightMenu={
          <Link to="/mypage">
            <img
              id="mypage"
              src="/images/icons/ic_mypage.svg"
              alt="마이페이지 아이콘"
            />
          </Link>
        }
      />
      <main className="product-detail-container">
        <div className="product-detail-content">
          <img
            className="product-detail-image"
            src={product.images[0]}
            alt={product.name}
          />
          <div className="product-detail-info-wrapper">
            <div className="product-detail-info">
              <div className="product-detail-info-title">
                <h1 className="product-detail-info-name">{product.name}</h1>
                <p className="product-detail-info-price">
                  {product.price.toLocaleString()}원
                </p>
                <img className='product-detail-info-kebab' src="/images/icons/ic_kebab.svg" alt="상품 게시글 추가 기능 아이콘" />
              </div>
              <div className="product-detail-info-description-wrapper">
                <div className="product-detail-info-description">
                  <p className="product-detail-info-caption">상품 소개</p>
                  <p className="product-detail-info-description-text">
                    {product.description}
                  </p>
                </div>
                <div className="product-detail-info-tag">
                  <p className="product-detail-info-caption">상품 태그</p>
                  <AddItemTag tags={product.tags} />
                </div>
              </div>
              <div className="product-detail-seller">
                <div className="seller-info">
                  <img
                    className="seller-image"
                    src="/images/icons/ic_mypage.svg"
                    alt="판매자 이미지"
                  />
                  <div className="seller-wrapper">
                    <p className="seller-nickname">{product.ownerNickname}</p>
                    <p className="seller-updatedat">
                      {getFormattedDate(product.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="seller-favorite-wrapper">
                  <img className='seller-favorite-image' src="/images/icons/ic_heart.svg" alt="좋아요 이미지" />
                  <p className='seller-favorite-count'>{product.favoriteCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
