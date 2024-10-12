import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import useAsync from '../hooks/useAsync';
import Product from './Product';
import Loading from './Loading';

export default function BestProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, loadingError, getProductsAsync] = useAsync(getProducts);

  // 상품 가져오기
  const handleLoad = useCallback(
    async (options = {}) => {
      const result = await getProductsAsync(options);
      if (!result) return;

      setProducts(result.list);
    },
    [getProductsAsync]
  );

  useEffect(() => {
    // 좋아요순으로 4개 가져오기
    const options = {
      pageSize: 4,
      orderBy: 'favorite',
    };
    handleLoad(options);
  }, [handleLoad]);

  return (
    <div className="products">
      <h2 className="products-title my-4">베스트 상품</h2>
      <div className="best">
        <Loading visible={isLoading} />
        {products.map(({ id, images, name, price, favoriteCount }) => (
          <Product
            key={id}
            image={images[0]}
            name={name}
            price={price}
            favoriteCount={favoriteCount}
          />
        ))}

        {loadingError?.message && <p className="text-center font-bold">{loadingError.message}</p>}
      </div>
    </div>
  );
}
