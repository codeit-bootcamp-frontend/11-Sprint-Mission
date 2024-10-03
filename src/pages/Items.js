import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Product from "components/Product";
import { fetchProducts } from "utils/api";
import { getBreakpoint, updateProductsPerPage } from "utils/checkDevice";
import Paginations from "components/Paginations";

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

function Items() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [device, setDevice] = useState("pc");
  const [isOpen, setIsOpen] = useState(false);
  const [sortText, setSortText] = useState("최신순");

  useEffect(() => {
    fetchProducts({
      pageSize: 4,
      order: "favorite",
    }).then(({ list }) => setBestProducts(list));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentDevice = getBreakpoint(window.innerWidth);

      if (device !== currentDevice) {
        const perPage = updateProductsPerPage(currentDevice);
        setDevice(currentDevice);
        setProductsPerPage(perPage);

        fetchProducts({ pageSize: perPage, order }).then(
          ({ list, totalCount }) => {
            setProducts(list);
            setTotalPage(totalCount);
          }
        );
      }
    };

    const initialDevice = getBreakpoint(window.innerWidth);
    const initialPerPage = updateProductsPerPage(initialDevice);
    setDevice(initialDevice);
    setProductsPerPage(initialPerPage);

    fetchProducts({ pageSize: initialPerPage, order }).then(
      ({ list, totalCount }) => {
        setProducts(list);
        setTotalPage(totalCount);
      }
    );

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device, order]);

  useEffect(() => {
    fetchProducts({ pageSize: productsPerPage, order }).then(
      ({ list, totalCount }) => {
        setProducts(list);
        setTotalPage(totalCount);
      }
    );
  }, [order, productsPerPage]);
  return (
    <>
      <Header isLogin={true} />
      <main className="page-items">
        <section id="section_favorite">
          <h2 className="products-title">베스트 상품</h2>
          <ul className="products-wrap favorite">
            {bestProducts.map((product) => (
              <li key={product.id} className="product-item ">
                <Product product={product} />
              </li>
            ))}
          </ul>
        </section>
        <section id="section_all">
          <div className="top">
            <h2 className="products-title">전체 상품</h2>
            <div className="filter-area">
              <div className="input-area">
                <img
                  src="/images/icons/ic_search.svg"
                  alt="검색할 상품을 입력해주세요"
                />
                <input type="text" placeholder="검색할 상품을 입력해주세요" />
              </div>
              <button type="button" className="btn-register">
                상품 등록하기
              </button>
              <div className="sort-area">
                <button
                  type="button"
                  className="btn-sort"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <span className="mo-hidden">{sortText}</span>
                </button>
                <div className="options" open={isOpen}>
                  {sortOptions.map(({ text, value }) => (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setSortText(text);
                        setOrder(value);
                      }}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ul className="products-wrap all">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <Product product={product} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Items;
