import React, { ChangeEvent, useEffect, useState } from "react";
import { getProducts } from "../../api/api";
import { Link } from "react-router-dom";
import "./AllItem.css";
import SelectOrderBy from "./SelectOrderBy";
import Pagination from "../../util/Pagination";
import ProductCard from "./ProductCard";
import usePageSize from "../../hooks/usePageSize";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductResponse {
  list: Product[];
  totalCount: number;
}

const AllItem = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize = usePageSize();

  const totalPage = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result: ProductResponse = await getProducts({
          page: String(page),
          pageSize: String(pageSize),
          orderBy: orderBy,
          keyword: "",
        });
        setProducts(result.list);
        setTotalCount(result.totalCount);
      } catch (err) {
        setError((err as Error).message);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderBy, page, pageSize]);

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (selectedPage: number) => {
    setPage(selectedPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="all-product-box">
      <div className="product-head-box">
        <h2 className="page-head">전체 상품</h2>
        <div className="search-box">
          <input
            type="text"
            className="product-search"
            placeholder="검색할 상품을 입력해주세요"
          ></input>
          <Link to="/additem">
            <button className="add-button">상품 등록하기</button>
          </Link>
          <SelectOrderBy
            className="option-select"
            value={orderBy}
            onChange={handleOrderChange}
          />
        </div>
      </div>
      <ul className="all-product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
      <Pagination
        page={page}
        totalPage={totalPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
};

export default AllItem;
