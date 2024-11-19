import { useEffect, useState } from "react";
import Product from "./Product";
import { fetchProducts } from "utils/api";
import { ProductInterface } from "./ProductList";

function BestProductList() {
  const [bestProducts, setBestProducts] = useState<ProductInterface[]>([]); // 서버에서 받아올 BestProudcts를 할당할 state

  // bestProducts는 데이터 후 가공이 필요 없어 마운트 될 때만 실행
  useEffect(() => {
    fetchProducts({
      pageSize: "4",
      orderBy: "favorite",
    }).then(({ list }) => setBestProducts(list));
  }, []);

  return (
    <section id='section_favorite'>
      <h2 className='products-title'>베스트 상품</h2>
      <ul className='products-wrap favorite'>
        {bestProducts.map((product) => (
          <li key={product.id} className='product-item '>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestProductList;
