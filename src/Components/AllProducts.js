import { useEffect, useRef, useState } from 'react';
import { getProducts } from '../api';
import Product from './Product';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const inSearchRef = useRef();

  const handleLoad = async (options = {}) => {
    let result;
    try {
      result = await getProducts(options);
    } catch (error) {
      console.log('error', error.message);
    }
    setProducts(result.list);
  };

  const handleOrder = (e) => {
    setOrderBy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputSearch = inSearchRef.current;
    setKeyword(inputSearch.value);
  };

  useEffect(() => {
    handleLoad({ keyword, orderBy });
  }, [keyword, orderBy]);

  return (
    <div className="products">
      <div className="flex items-center gap-3">
        <h2 className="products-title mr-auto">전체 상품</h2>
        <form onSubmit={handleSubmit}>
          <input className="in-search" type="text" ref={inSearchRef} placeholder="검색할 상품을 입력해 주세요" />
        </form>
        <a href="/additem" className="btn">
          상품 등록하기
        </a>
        <select className="in-order" onChange={handleOrder} value={orderBy}>
          <option value="recent" selected>
            최신순
          </option>
          <option value="favorite">좋아요 순</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {products.map(({ id, images, name, price }) => (
          <Product key={id} image={images[0]} name={name} price={price} />
        ))}
      </div>
    </div>
  );
}
