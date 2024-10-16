import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getBestProducts } from '../api/ProductAPI';
import BestProducts from '../components/BestProducts';
import AllProducts from '../components/AllProducts';
import SearchIcon from '../image/search-icon.png';
import '../styles/Items.css';

function Items() {
  const [allProducts, setAllProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data.list || []);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchBestProducts = async () => {
      try {
        const data = await getBestProducts();
        if (data && data.list) {
          setBestProducts(data.list);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllProducts();
    fetchBestProducts();
  }, []);

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="product-wrapped">
      <h2 className="products-header">베스트 상품</h2>
      <BestProducts products={bestProducts} />
      <div className="products-header">
        <h2>전체 상품</h2>
        <div className="sort-menu">
          <div className="input-container">
            <span className="input-icon">
              <img src={SearchIcon} alt="검색 아이콘" />
            </span>
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
          </div>
          <button onClick={() => navigate('/additem')}>상품 등록하기</button>
          <select id="dropdown-content">
            <option value="latest">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <AllProducts products={allProducts} />
    </div>
  );
}

export default Items;
