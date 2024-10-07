import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import Product from './Product';

export default function BestProducts() {
  const [products, setProducts] = useState([]);

  // 상품 가져오기
  const handleLoad = async (options = {}) => {
    let result;
    try {
      result = await getProducts(options);
    } catch (error) {
      console.log('error', error.message);
    }
    setProducts(result.list);
  };

  useEffect(() => {
    // 좋아요순으로 4개 가져오기
    const options = {
      pageSize: 4,
      orderBy: 'favorite',
    };
    handleLoad(options);
  }, []);

  return (
    <div className="products">
      <h2 className="products-title my-4">베스트 상품</h2>
      <div className="best">
        {products.map(({ id, images, name, price, favoriteCount }) => (
          <Product key={id} image={images[0]} name={name} price={price} favoriteCount={favoriteCount} />
        ))}
      </div>
    </div>
  );
}
