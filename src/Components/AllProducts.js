import { useEffect, useRef, useState } from 'react';
import { getProducts } from '../api';
import Product from './Product';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

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

  const handleKeywordSubmit = (e) => {
    e.preventDefault();
    const inputSearch = inSearchRef.current;
    setKeyword(inputSearch.value);
  };
  const handleKeywordReset = (e) => {
    setKeyword('');
  };

  useEffect(() => {
    handleLoad({ keyword, orderBy });
  }, [keyword, orderBy]);

  return (
    <div className="products">
      <div className="flex items-center gap-3">
        <h2 className="products-title mr-auto">전체 상품</h2>

        <form className="flex gap-1" onSubmit={handleKeywordSubmit}>
          <input className="in-search" type="text" ref={inSearchRef} placeholder="검색할 상품을 입력해 주세요" />
          <button className="btn-reset" type="reset" title="초기화" onClick={handleKeywordReset}>
            <ArrowPathIcon className="size-4 mx-auto" />
          </button>
        </form>

        <a href="/additem" className="btn">
          상품 등록하기
        </a>

        <select className="in-order" onChange={handleOrder} value={orderBy}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요 순</option>
        </select>
      </div>

      <div className="all">
        {products.map(({ id, images, name, price, favoriteCount }) => (
          <Product key={id} image={images[0]} name={name} price={price} favoriteCount={favoriteCount} />
        ))}
      </div>
    </div>
  );
}
