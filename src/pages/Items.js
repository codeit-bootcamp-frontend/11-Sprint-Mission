import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/ProductAPI';
import BestProducts from '../components/BestProducts';
import AllProducts from '../components/AllProducts';
import SearchIcon from '../image/search-icon.png';
import '../styles/Items.css';

function Items() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.list || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="product-wrapped">
      <h2 class="products-header">베스트 상품</h2>
      <BestProducts products={products} />
      <div className="products-header">
        <h2>전체 상품</h2>
        <div className="sort-menu">
          <div class="input-container">
            <span class="input-icon">
              <img src={SearchIcon} alt="검색 아이콘" />
            </span>
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
          </div>
          <button onClick={() => navigate('/additem')}>상품 등록하기</button>
          <select>
            <option value="latest">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <AllProducts products={products} />
    </div>
  );
}

export default Items;
