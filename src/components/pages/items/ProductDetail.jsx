import { useParams } from 'react-router-dom';
import Header from '../../common/home/Header';
import { useEffect, useState } from 'react';
import { getProductById } from '../../../api/items/productsApi';
import { Link } from 'react-router-dom';

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
      <div className="product-detail">
        <img src={product.images[0]} alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.price.toLocaleString()}원</p>
        <p>좋아요 수: {product.favoriteCount}</p>
      </div>
    </>
  );
}

export default ProductDetail;
