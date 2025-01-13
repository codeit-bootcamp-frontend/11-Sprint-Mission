import { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import DropDown from "./DropDown";
import Search from "./Search";
import Paginations from "./Paginations";
import { fetchProducts } from "@/pages/api/productApi";
import PrimaryButton from "../common/PrimaryButton";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import { ProductInterface } from "@/types/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const sortOptions = [
  {
    text: "최신순",
    value: "recent",
  },
  {
    text: "좋아요순",
    value: "favorite",
  },
];

function ProductList() {
  const { page } = useWindowSize();
  const [productsPerPage, setProductsPerPage] = useState<number | null>(null); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [order, setOrder] = useState(sortOptions[0].value); // 데이터 정렬을 위한 queryParam [orderBy]
  const [currentPage, setCurrentPage] = useState(1); // 데이터 호출을 위한 queryParam [page]
  const [keyword, setKeyword] = useState("");

  /**
   * React Query를 사용한 데이터 로딩
   */
  const { data } = useQuery({
    queryKey: ["products", currentPage, productsPerPage, order, keyword],
    queryFn: () =>
      fetchProducts({
        page: currentPage.toString(),
        pageSize: productsPerPage?.toString() || "10",
        orderBy: order,
        keyword: keyword,
      }),
    placeholderData: keepPreviousData,
  });

  /**
   * pagination 핸들러
   * @param {*} page active 페이지
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    setProductsPerPage(page);
  }, [page]);

  useEffect(() => {
    setCurrentPage(1);
  }, [order, keyword]);

  return (
    <section id='section_all'>
      <div className='top'>
        <h2 className='products-title'>전체 상품</h2>
        <div className='filter-area'>
          <Search setKeyword={setKeyword} />
          <PrimaryButton name='btn-register'>
            <Link href='/addItem'>상품 등록하기</Link>
          </PrimaryButton>
          <DropDown order={sortOptions} setOrder={setOrder} />
        </div>
      </div>
      {data?.list.length > 0 ? (
        <>
          <ul className='products-wrap all'>
            {data?.list.map((product: ProductInterface) => (
              <li key={product.id} className='product-item'>
                <Product product={product} />
              </li>
            ))}
          </ul>
          <Paginations
            totalPage={Math.ceil(data?.totalCount / (productsPerPage || 10))}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <div className='no-result'>검색 내용이 없습니다...</div>
      )}
    </section>
  );
}

export default ProductList;
