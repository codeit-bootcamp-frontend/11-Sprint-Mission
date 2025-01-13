import Product from "./Product";
import { fetchProducts } from "@/pages/api/productApi";
import { ProductInterface } from "@/types/product";
import useWindowSize from "@/hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";

function BestProductList() {
  const { pageBestProduct } = useWindowSize();

  /**
   * React Query를 사용한 데이터 로딩
   */
  const { data } = useQuery({
    queryKey: ["bestProducts", pageBestProduct],
    queryFn: async () => {
      if (pageBestProduct === null) return { list: [] };
      return fetchProducts({
        pageSize: pageBestProduct.toString(),
        orderBy: "favorite",
      });
    },
  });

  return (
    <section id='section_favorite'>
      <h2 className='products-title'>베스트 상품</h2>
      <ul className='products-wrap favorite'>
        {data?.list.map((product: ProductInterface) => (
          <li key={product.id} className='product-item '>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BestProductList;
