import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import Product from './Product';

export default function BestProducts() {
  const [products, setProducts] = useState([]);

  const handleLoad = async (options) => {
    let result;
    try {
      result = await getProducts(options);
    } catch (error) {
      console.log('error', error.message);
    }
    setProducts(result.list);
  };

  useEffect(() => {
    const options = {
      pageSize: 4,
      orderBy: 'favorite',
    };
    handleLoad(options);
  }, [products]);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold my-4">베스트 상품</h2>
      <div className="flex gap-6">
        {products.map(({ id, images, name, price }) => (
          <Product key={id} image={images[0]} name={name} price={price} />
        ))}
      </div>
    </div>
  );
}
