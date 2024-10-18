import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetail, getProductDetailComment } from '../hooks/api';
import iconHeart from '../assets/ic_heart.svg';
import defaultImg from '../assets/img_default.svg';
import frame from '../assets/Frame.svg';
import '../styles/ProductDetail.css';
import ProductDetailComment from '../components/ProductDetail/ProductDetailComment';
import ProductDetailInput from '../components/ProductDetail/ProductDetailInput';

// 날짜 형식 변환 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 두 자릿수로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 두 자릿수로 포맷팅
  return `${year}.${month}.${day}`;
};

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); //상품상세정보

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
    <body>
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
                <p className="productDetailDescription">
                  {product.description}
                </p>
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
                <div className="pddddd">
                  <p className="productDetailNickname">
                    {product.ownerNickname}
                  </p>
                  <p className="productDetailUpdateAt">
                    {formatDate(product.updatedAt)} {/* 날짜 형식 변환 */}
                  </p>
                </div>
              </div>
              <p className="productDetailIsFavorite">
                <img src={iconHeart} />
                {product.favoriteCount}
              </p>
            </div>
          </div>
        </div>

        <ProductDetailInput productId={productId} />
        <ProductDetailComment productId={productId} />
      </div>
    </body>
  );
}

export default ProductDetail;
