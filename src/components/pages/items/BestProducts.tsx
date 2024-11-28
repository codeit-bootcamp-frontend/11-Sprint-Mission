import type { Product } from '@apptypes/product';
import ProductCard from './ProductCard';

interface BestProductsProps {
  bestProducts: Product[];
}

function BestProducts({ bestProducts }: BestProductsProps) {
  return (
    <section className='best-products'>
      <p className='products-caption'>베스트 상품</p>
      <div className='best-products-list'>
        {bestProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default BestProducts;
